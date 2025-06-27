import { TEST_CONFIG, SAMPLE_USERS, SAMPLE_TEAMS } from './config';
import { AdminApi } from '../client-services/admin/api/admin-api';
import { AdminTeamsApi } from '../client-services/admin/api/admin-teams-api';
import { AuthApi } from '../client-services/admin/api/auth-api';
import { Configuration } from '../client-services/admin/configuration';
import { AuthApi as UserAuthApi } from '../client-services/user/api/auth-api';
import { TeamsApi } from '../client-services/user/api/teams-api';
import { UsersApi } from '../client-services/user/api/users-api';
import { VtonApi } from '../client-services/user/api/vton-api';
import { Configuration as UserConfiguration } from '../client-services/user/configuration';
import {
  CreateVtonProcessDtoVisibilityEnum,
  CreateVtonProcessDtoGarmentTypeEnum,
} from '../client-services/user/models/create-vton-process-dto';

import { FileUtils } from './utils/file-utils';

interface CreatedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
}

interface CreatedTeam {
  id: string;
  name: string;
  leaderId: string;
  leaderEmail: string;
}

class DatabaseSeeder {
  private adminConfiguration: Configuration;
  private userConfiguration: UserConfiguration;
  private adminAuthApi: AuthApi;
  private adminApi: AdminApi;
  private adminTeamsApi: AdminTeamsApi;
  private userAuthApi: UserAuthApi;
  private teamsApi: TeamsApi;
  private usersApi: UsersApi;
  private vtonApi: VtonApi;

  private createdUsers: CreatedUser[] = [];
  private createdTeams: CreatedTeam[] = [];
  private adminUserId: string = '';

  constructor() {
    this.adminConfiguration = new Configuration({
      basePath: TEST_CONFIG.API_BASE_URL,
    });

    this.userConfiguration = new UserConfiguration({
      basePath: TEST_CONFIG.API_BASE_URL,
    });

    this.adminAuthApi = new AuthApi(this.adminConfiguration);
    this.adminApi = new AdminApi(this.adminConfiguration);
    this.adminTeamsApi = new AdminTeamsApi(this.adminConfiguration);
    this.userAuthApi = new UserAuthApi(this.userConfiguration);
    this.teamsApi = new TeamsApi(this.userConfiguration);
    this.usersApi = new UsersApi(this.userConfiguration);
    this.vtonApi = new VtonApi(this.userConfiguration);
  }

  /**
   * Admin olarak giriş yapar
   */
  private async loginAsAdmin(): Promise<void> {
    try {
      console.log('🔐 Admin olarak giriş yapılıyor...');

      const loginResponse = await this.adminAuthApi.login({
        email: TEST_CONFIG.ADMIN_EMAIL,
        password: TEST_CONFIG.ADMIN_PASSWORD,
      });

      if (loginResponse.data.message && loginResponse.data.user) {
        this.adminUserId = loginResponse.data.user.id;
        console.log('✅ Admin girişi başarılı');
      } else {
        throw new Error('Admin girişi başarısız');
      }
    } catch (error) {
      console.error('❌ Admin girişi hatası:', error);
      throw error;
    }
  }

  /**
   * 10 kullanıcı register eder
   */
  private async registerUsers(): Promise<void> {
    console.log('👥 Test kullanıcıları kaydediliyor...');

    for (const userData of SAMPLE_USERS) {
      try {
        // Rastgele profil fotoğrafı seç
        const profilePhoto = FileUtils.getRandomProfile();

        const registerResponse = await this.adminAuthApi.register({
          email: userData.email,
          password: userData.password,
          firstName: userData.firstName,
          lastName: userData.lastName,
        });

        if (registerResponse.data.message && registerResponse.data.user) {
          const user = registerResponse.data.user;

          this.createdUsers.push({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: userData.gender,
          });

          // Profil fotoğrafı varsa güncelle
          if (profilePhoto) {
            try {
              // User olarak giriş yap ve profil fotoğrafını güncelle
              await this.userAuthApi.login({
                email: userData.email,
                password: userData.password,
              });

              await this.usersApi.updateProfile({
                profilePhoto: profilePhoto,
              });

              console.log(
                `✅ Kullanıcı kaydedildi: ${userData.firstName} ${userData.lastName} (profil fotoğrafı ile)`,
              );
            } catch (photoError) {
              console.log(
                `✅ Kullanıcı kaydedildi: ${userData.firstName} ${userData.lastName} (profil fotoğrafı olmadan)`,
              );
            }
          } else {
            console.log(
              `✅ Kullanıcı kaydedildi: ${userData.firstName} ${userData.lastName}`,
            );
          }
        }
      } catch (error) {
        console.error(`❌ Kullanıcı kayıt hatası (${userData.email}):`, error);
      }
    }

    console.log(`✅ Toplam ${this.createdUsers.length} kullanıcı kaydedildi`);
  }

  /**
   * Admin 2 takım yaratır ve 2 kullanıcıyı lead yapar
   */
  private async createTeamsWithLeads(): Promise<void> {
    console.log('🏢 Admin takımları oluşturuyor ve leadleri atıyor...');

    // Admin olarak tekrar giriş yap
    await this.loginAsAdmin();

    for (let i = 0; i < TEST_CONFIG.TEST_TEAM_COUNT; i++) {
      try {
        const teamData = SAMPLE_TEAMS[i];
        const leadUser = this.createdUsers[i]; // İlk 2 kullanıcı lead olacak

        const createTeamResponse = await this.adminTeamsApi.createTeam({
          name: teamData.name,
          leaderId: leadUser.id,
          totalCredits: TEST_CONFIG.TEAM_CREDITS,
        });

        if (createTeamResponse.data.message && createTeamResponse.data.team) {
          const team = createTeamResponse.data.team;

          this.createdTeams.push({
            id: team.id,
            name: team.name,
            leaderId: leadUser.id,
            leaderEmail: leadUser.email,
          });

          console.log(
            `✅ Takım oluşturuldu: ${teamData.name} (Lead: ${leadUser.firstName} ${leadUser.lastName})`,
          );
        }
      } catch (error) {
        console.error(`❌ Takım oluşturma hatası:`, error);
      }
    }

    console.log(`✅ Toplam ${this.createdTeams.length} takım oluşturuldu`);
  }

  /**
   * Lead'ler takımlarına 5'er kişi ekler ve 3'üne kredi limiti uygular
   */
  private async addMembersToTeams(): Promise<void> {
    console.log('👥 Leadler takımlarına üye ekliyorlar...');

    for (const team of this.createdTeams) {
      try {
        // Lead olarak giriş yap
        const leadUser = this.createdUsers.find((u) => u.id === team.leaderId);
        if (!leadUser) continue;

        await this.userAuthApi.login({
          email: leadUser.email,
          password: 'Test123!',
        });

        // Lead'in kendisi hariç kalan kullanıcılardan 5 tanesini seç
        const availableUsers = this.createdUsers.filter(
          (u) => u.id !== team.leaderId,
        );
        const teamMembers = availableUsers.slice(0, 5);

        for (let i = 0; i < teamMembers.length; i++) {
          const member = teamMembers[i];
          try {
            // İlk 3 üyeye kredi limiti uygula
            const maxCredit = i < 3 ? TEST_CONFIG.MEMBER_CREDITS : 0;

            await this.teamsApi.addMember(team.id, {
              email: member.email,
              maxCredit: maxCredit,
            });

            const creditText =
              maxCredit > 0 ? ` (${maxCredit} kredi limiti)` : '';
            console.log(
              `  ✅ ${member.firstName} ${member.lastName} takıma eklendi${creditText}`,
            );
          } catch (error) {
            console.error(`  ❌ Üye ekleme hatası (${member.email}):`, error);
          }
        }

        console.log(
          `✅ ${team.name} takımına ${teamMembers.length} üye eklendi`,
        );
      } catch (error) {
        console.error(`❌ Takım üye ekleme hatası (${team.name}):`, error);
      }
    }
  }

  /**
   * Rastgele 5 kullanıcı VTON işlemleri yaratır
   */
  private async createVtonProcesses(): Promise<void> {
    console.log('🎨 VTON işlemleri oluşturuluyor...');

    // Asset kontrolü yap
    FileUtils.checkAssetDirectories();

    // Rastgele 5 kullanıcı seç
    const shuffledUsers = [...this.createdUsers].sort(
      () => Math.random() - 0.5,
    );
    const selectedUsers = shuffledUsers.slice(
      0,
      TEST_CONFIG.VTON_PROCESS_COUNT,
    );

    for (const user of selectedUsers) {
      try {
        // Kullanıcı olarak giriş yap
        await this.userAuthApi.login({
          email: user.email,
          password: 'Test123!',
        });

        // Kullanıcının takımlarını al
        const teamsResponse = await this.teamsApi.getMyTeams();
        if (
          !teamsResponse.data.teams ||
          teamsResponse.data.teams.length === 0
        ) {
          console.warn(
            `⚠️ ${user.firstName} ${user.lastName} hiçbir takımda değil, VTON işlemi atlanıyor`,
          );
          continue;
        }

        // İlk takımı seç
        const userTeam = teamsResponse.data.teams[0];

        // Rastgele mannequin ve garment seç
        const mannequinImage = FileUtils.getRandomMannequin(
          user.gender as 'male' | 'female',
        );

        // Rastgele garment kategorisi seç (tops veya bottoms - dresses hariç)
        const garmentCategories: ('tops' | 'bottoms')[] = ['tops', 'bottoms'];
        const selectedCategory =
          garmentCategories[
            Math.floor(Math.random() * garmentCategories.length)
          ];
        const garmentImage = FileUtils.getRandomGarment(selectedCategory);

        // Garment type'ı kategoriye göre belirle
        const garmentType =
          selectedCategory === 'tops'
            ? CreateVtonProcessDtoGarmentTypeEnum.Top
            : CreateVtonProcessDtoGarmentTypeEnum.Bottom;

        if (!mannequinImage || !garmentImage) {
          console.warn(
            `⚠️ ${user.firstName} ${user.lastName} için gerekli görseller bulunamadı, VTON işlemi atlanıyor`,
          );
          continue;
        }

        // VTON işlemi oluştur
        const vtonResponse = await this.vtonApi.createVtonProcess({
          teamId: userTeam.id,
          mannequin: mannequinImage,
          garment: garmentImage,
          garmentType: garmentType,
          nSteps: 20,
          visibility:
            Math.random() > 0.5
              ? CreateVtonProcessDtoVisibilityEnum.Team
              : CreateVtonProcessDtoVisibilityEnum.Me,
        });

        if (vtonResponse.data.id) {
          console.log(
            `✅ ${user.firstName} ${user.lastName} VTON işlemi oluşturdu (Takım: ${userTeam.name})`,
          );
        }
      } catch (error) {
        console.error(
          `❌ VTON işlemi oluşturma hatası (${user.email}):`,
          error,
        );
      }
    }

    console.log(`✅ VTON işlemleri oluşturma tamamlandı`);
  }

  /**
   * Seed işleminin özetini gösterir
   */
  private displaySummary(): void {
    console.log('\n📊 SEED İŞLEMİ ÖZETİ');
    console.log('==================');
    console.log(`👥 Kaydedilen kullanıcılar: ${this.createdUsers.length}`);
    console.log(`🏢 Oluşturulan takımlar: ${this.createdTeams.length}`);

    console.log('\n👥 KULLANICILAR:');
    this.createdUsers.forEach((user, index) => {
      const isLead = this.createdTeams.some((t) => t.leaderId === user.id);
      const leadText = isLead ? ' (LEAD)' : '';
      console.log(
        `${index + 1}. ${user.firstName} ${user.lastName} (${user.email})${leadText}`,
      );
    });

    console.log('\n🏢 TAKIMLAR:');
    this.createdTeams.forEach((team, index) => {
      const leader = this.createdUsers.find((u) => u.id === team.leaderId);
      console.log(
        `${index + 1}. ${team.name} - Lead: ${leader?.firstName} ${leader?.lastName} (${TEST_CONFIG.TEAM_CREDITS} kredi)`,
      );
    });

    console.log('\n💳 KREDİ LİMİTLERİ:');
    console.log(`- Takım kredileri: ${TEST_CONFIG.TEAM_CREDITS} kredi`);
    console.log(
      `- Üye kredi limitleri: ${TEST_CONFIG.MEMBER_CREDITS} kredi (ilk 3 üye)`,
    );

    console.log('\n🎨 VTON İŞLEMLERİ:');
    console.log(
      `- ${TEST_CONFIG.VTON_PROCESS_COUNT} adet VTON işlemi oluşturuldu`,
    );
    console.log('- Rastgele mannequin ve garment görselleri kullanıldı');

    console.log('\n🔐 YÖNETİCİ BİLGİLERİ:');
    console.log(`Email: ${TEST_CONFIG.ADMIN_EMAIL}`);
    console.log(`Password: ${TEST_CONFIG.ADMIN_PASSWORD}`);

    console.log('\n✅ Veritabanı gerçekçi test verileriyle dolduruldu!');
  }

  /**
   * Ana seed işlemini çalıştırır
   */
  async seed(): Promise<void> {
    try {
      console.log('🚀 Gelişmiş veritabanı seed işlemi başlatılıyor...\n');

      // 1. 10 kullanıcı register olur
      await this.registerUsers();

      // 2. Admin 2 takım yaratıp 2 kullanıcıyı lead yapar
      await this.createTeamsWithLeads();

      // 3. Lead'ler 5'er kişiyi takımlarına ekler ve 3'üne kredi limiti uygular
      await this.addMembersToTeams();

      // 4. Rastgele 5 kullanıcı VTON işlemleri yaratır
      await this.createVtonProcesses();

      this.displaySummary();
    } catch (error) {
      console.error('❌ Seed işlemi hatası:', error);
      process.exit(1);
    }
  }
}

// Script çalıştırılırsa seed işlemini başlat
if (require.main === module) {
  const seeder = new DatabaseSeeder();
  seeder.seed();
}
