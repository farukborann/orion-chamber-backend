import { AdminApi } from '../client-services/admin/api/admin-api';
import { AdminTeamsApi } from '../client-services/admin/api/admin-teams-api';
import { AuthApi } from '../client-services/admin/api/auth-api';
import { Configuration } from '../client-services/admin/configuration';
import { TeamsApi } from '../client-services/user/api/teams-api';
import { UsersApi } from '../client-services/user/api/users-api';
import { Configuration as UserConfiguration } from '../client-services/user/configuration';
import { TEST_CONFIG } from './config';

/**
 * API'lerin çalışıp çalışmadığını test eden kapsamlı test sınıfı
 */
class ApiTester {
  private configuration: Configuration;
  private userConfiguration: UserConfiguration;
  private authApi: AuthApi;
  private adminApi: AdminApi;
  private adminTeamsApi: AdminTeamsApi;
  private teamsApi: TeamsApi;
  private usersApi: UsersApi;

  constructor() {
    this.configuration = new Configuration({
      basePath: TEST_CONFIG.API_BASE_URL,
    });

    this.userConfiguration = new UserConfiguration({
      basePath: TEST_CONFIG.API_BASE_URL,
    });

    this.authApi = new AuthApi(this.configuration);
    this.adminApi = new AdminApi(this.configuration);
    this.adminTeamsApi = new AdminTeamsApi(this.configuration);
    this.teamsApi = new TeamsApi(this.userConfiguration);
    this.usersApi = new UsersApi(this.userConfiguration);
  }

  /**
   * Admin API'lerini test eder
   */
  private async testAdminApis(): Promise<void> {
    console.log('🔧 Admin API testleri başlatılıyor...');

    try {
      // Admin test endpoint
      await this.adminApi.adminTest();
      console.log('✅ Admin test endpoint çalışıyor');

      // Admin teams test endpoint
      await this.adminTeamsApi.adminTeamsTest();
      console.log('✅ Admin teams test endpoint çalışıyor');

      // Tüm kullanıcıları listele (admin gerekli)
      const usersResponse = await this.adminApi.getAllUsers();
      console.log(
        `✅ Toplam kullanıcı sayısı: ${usersResponse.data.users?.length || 0}`,
      );

      // Tüm takımları listele (admin gerekli)
      const teamsResponse = await this.adminTeamsApi.getAllTeams();
      console.log(
        `✅ Toplam takım sayısı: ${teamsResponse.data.teams?.length || 0}`,
      );
    } catch (error) {
      console.error('❌ Admin API test hatası:', error);
      throw error;
    }
  }

  /**
   * Auth API'lerini test eder
   */
  private async testAuthApis(): Promise<void> {
    console.log('🔐 Auth API testleri başlatılıyor...');

    try {
      // Admin girişi test et
      const loginResponse = await this.authApi.login({
        email: TEST_CONFIG.ADMIN_EMAIL,
        password: TEST_CONFIG.ADMIN_PASSWORD,
      });

      if (loginResponse.data.message && loginResponse.data.user) {
        console.log(
          `✅ Admin girişi başarılı: ${loginResponse.data.user.firstName} ${loginResponse.data.user.lastName}`,
        );
        console.log(
          `   Admin durumu: ${loginResponse.data.user.isAdmin ? '✅' : '❌'}`,
        );
      }

      // Kullanıcı profil bilgilerini al
      const meResponse = await this.authApi.getMe();
      if (meResponse.data.id) {
        console.log(
          `✅ Profil bilgileri alındı: ${meResponse.data.firstName} ${meResponse.data.lastName}`,
        );
        console.log(`   Takım sayısı: ${meResponse.data.teams?.length || 0}`);
      }
    } catch (error) {
      console.error('❌ Auth API test hatası:', error);
      throw error;
    }
  }

  /**
   * User API'lerini test eder
   */
  private async testUserApis(): Promise<void> {
    console.log('👥 User API testleri başlatılıyor...');

    try {
      // Teams test endpoint
      await this.teamsApi.teamsTest();
      console.log('✅ Teams test endpoint çalışıyor');

      // Users test endpoint
      await this.usersApi.usersTest();
      console.log('✅ Users test endpoint çalışıyor');

      // Kullanıcının takımlarını listele
      const myTeamsResponse = await this.teamsApi.getMyTeams();
      console.log(
        `✅ Kullanıcı takım sayısı: ${myTeamsResponse.data.teams?.length || 0}`,
      );

      // Her takımın detaylarını al
      if (myTeamsResponse.data.teams && myTeamsResponse.data.teams.length > 0) {
        for (const team of myTeamsResponse.data.teams.slice(0, 2)) {
          // İlk 2 takımı test et
          const teamDetail = await this.teamsApi.getTeam(team.id);
          console.log(`✅ Takım detayı alındı: ${teamDetail.data.name}`);

          const teamMembers = await this.teamsApi.getTeamMembers(team.id);
          console.log(
            `   Takım üye sayısı: ${teamMembers.data.members?.length || 0}`,
          );
        }
      }
    } catch (error) {
      console.error('❌ User API test hatası:', error);
      throw error;
    }
  }

  /**
   * API bağlantısını test eder
   */
  private async testApiConnection(): Promise<void> {
    console.log('🌐 API bağlantısı test ediliyor...');

    try {
      const response = await fetch(`${TEST_CONFIG.API_BASE_URL}/health`);
      if (response.ok) {
        console.log('✅ API sunucusu erişilebilir');
      } else {
        console.log(
          '⚠️ API sunucusu erişilebilir ama health endpoint bulunamadı',
        );
      }
    } catch (error) {
      console.log(
        '⚠️ Health endpoint test edilemedi, API testlerine devam ediliyor...',
      );
    }
  }

  /**
   * Performans testini çalıştırır
   */
  private async testPerformance(): Promise<void> {
    console.log('⚡ Performans testi başlatılıyor...');

    const startTime = Date.now();

    try {
      // Paralel olarak birkaç basit endpoint test et
      await Promise.all([
        this.adminApi.adminTest(),
        this.teamsApi.teamsTest(),
        this.usersApi.usersTest(),
      ]);

      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`✅ Paralel test tamamlandı: ${duration}ms`);

      if (duration < 1000) {
        console.log('🚀 Performans: Mükemmel');
      } else if (duration < 3000) {
        console.log('⚡ Performans: İyi');
      } else {
        console.log('⚠️ Performans: Yavaş');
      }
    } catch (error) {
      console.error('❌ Performans testi hatası:', error);
    }
  }

  /**
   * Test özetini gösterir
   */
  private displayTestSummary(): void {
    console.log('\n📊 TEST ÖZETİ');
    console.log('=============');
    console.log('✅ Tüm testler başarıyla tamamlandı!');
    console.log(`🌐 API Base URL: ${TEST_CONFIG.API_BASE_URL}`);
    console.log(`🔐 Admin Email: ${TEST_CONFIG.ADMIN_EMAIL}`);
    console.log('\n💡 İPUCU: Eğer bir test başarısız olduysa:');
    console.log('   1. Backend sunucusunun çalıştığından emin olun');
    console.log('   2. Veritabanının erişilebilir olduğunu kontrol edin');
    console.log(
      `   3. Admin kullanıcısının (${TEST_CONFIG.ADMIN_EMAIL}) var olduğunu doğrulayın`,
    );
    console.log('   4. Client servislerinin güncel olduğunu kontrol edin');
  }

  /**
   * Ana test fonksiyonu
   */
  async runTests(): Promise<void> {
    try {
      console.log('🚀 API Testleri Başlatılıyor...\n');

      await this.testApiConnection();
      await this.testAuthApis();
      await this.testAdminApis();
      await this.testUserApis();
      await this.testPerformance();

      this.displayTestSummary();
    } catch (error) {
      console.error('\n❌ Test süreci hatası:', error);
      console.log('\n🔍 HATA AYIKLAMA REHBERI:');
      console.log('1. Backend sunucusu çalışıyor mu? (yarn dev)');
      console.log('2. Doğru URL kullanılıyor mu?', TEST_CONFIG.API_BASE_URL);
      console.log('3. Admin kullanıcısı oluşturulmuş mu?');
      console.log('4. Session tabanlı auth çalışıyor mu?');
      process.exit(1);
    }
  }
}

// Script çalıştırılırsa testleri başlat
if (require.main === module) {
  const tester = new ApiTester();
  tester.runTests();
}
