import * as fs from 'fs';
import * as path from 'path';

import { TEST_CONFIG } from './config';
import { AdminApi } from '../client-services/admin/api/admin-api';
import { AdminTeamsApi } from '../client-services/admin/api/admin-teams-api';
import { AuthApi } from '../client-services/admin/api/auth-api';
import { Configuration } from '../client-services/admin/configuration';

/**
 * Veritabanını temizleyen sınıf - sadece test verilerini temizler
 */
class DatabaseCleaner {
  private configuration: Configuration;
  private authApi: AuthApi;
  private adminApi: AdminApi;
  private adminTeamsApi: AdminTeamsApi;

  constructor() {
    this.configuration = new Configuration({
      basePath: TEST_CONFIG.API_BASE_URL,
    });

    this.authApi = new AuthApi(this.configuration);
    this.adminApi = new AdminApi(this.configuration);
    this.adminTeamsApi = new AdminTeamsApi(this.configuration);
  }

  /**
   * Admin olarak giriş yapar
   */
  private async loginAsAdmin(): Promise<void> {
    try {
      console.log('🔐 Admin olarak giriş yapılıyor...');

      const loginResponse = await this.authApi.login({
        email: TEST_CONFIG.ADMIN_EMAIL,
        password: TEST_CONFIG.ADMIN_PASSWORD,
      });

      if (loginResponse.data.message && loginResponse.data.user) {
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
   * Test takımlarını siler
   */
  private async deleteTestTeams(): Promise<void> {
    console.log('🗑️ Test takımları siliniyor...');

    try {
      const teamsResponse = await this.adminTeamsApi.getAllTeams();

      if (teamsResponse.data.teams && teamsResponse.data.teams.length > 0) {
        let deletedCount = 0;

        for (const team of teamsResponse.data.teams) {
          try {
            // Test takımlarını tespit etmek için isim kontrolü
            const isTestTeam = [
              'Fashion Forward',
              'Style Innovators',
              'Wardrobe Wizards',
              'Trend Setters',
              'Fashion Tech Lab',
            ].includes(team.name);

            if (isTestTeam) {
              await this.adminTeamsApi.deleteTeam(team.id);
              console.log(`✅ Takım silindi: ${team.name}`);
              deletedCount++;
            }
          } catch (error) {
            console.error(`❌ Takım silme hatası (${team.name}):`, error);
          }
        }

        console.log(`✅ Toplam ${deletedCount} test takımı silindi`);
      } else {
        console.log('ℹ️ Silinecek takım bulunamadı');
      }
    } catch (error) {
      console.error('❌ Test takımlarını silme hatası:', error);
    }
  }

  /**
   * Test kullanıcılarını siler
   */
  private async deleteTestUsers(): Promise<void> {
    console.log('🗑️ Test kullanıcıları siliniyor...');

    try {
      const usersResponse = await this.adminApi.getAllUsers();

      if (usersResponse.data.users && usersResponse.data.users.length > 0) {
        let deletedCount = 0;

        for (const user of usersResponse.data.users) {
          try {
            // Test kullanıcılarını tespit etmek için email kontrolü
            const isTestUser =
              user.email.includes('@test.com') ||
              user.email === TEST_CONFIG.ADMIN_EMAIL;

            // Admin kullanıcısını silme
            if (isTestUser && user.email !== TEST_CONFIG.ADMIN_EMAIL) {
              await this.adminApi.deleteUser(user.email);
              console.log(
                `✅ Kullanıcı silindi: ${user.firstName} ${user.lastName} (${user.email})`,
              );
              deletedCount++;
            }
          } catch (error) {
            console.error(`❌ Kullanıcı silme hatası (${user.email}):`, error);
          }
        }

        console.log(`✅ Toplam ${deletedCount} test kullanıcısı silindi`);
      } else {
        console.log('ℹ️ Silinecek kullanıcı bulunamadı');
      }
    } catch (error) {
      console.error('❌ Test kullanıcılarını silme hatası:', error);
    }
  }

  /**
   * Uploads klasöründeki test dosyalarını temizler
   */
  private async cleanUploadsDirectory(): Promise<void> {
    console.log('📁 Uploads klasörü temizleniyor...');

    const uploadsPath = path.join(__dirname, '../uploads');

    if (!fs.existsSync(uploadsPath)) {
      console.log('ℹ️ Uploads klasörü bulunamadı');
      return;
    }

    try {
      const subDirectories = [
        'garments',
        'mannequins',
        'masks',
        'profiles',
        'results',
      ];
      let totalDeleted = 0;

      for (const subDir of subDirectories) {
        const dirPath = path.join(uploadsPath, subDir);

        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath);
          let deletedCount = 0;

          for (const file of files) {
            try {
              const filePath = path.join(dirPath, file);
              const stats = fs.statSync(filePath);

              if (stats.isFile()) {
                fs.unlinkSync(filePath);
                deletedCount++;
              }
            } catch (error) {
              console.error(`❌ Dosya silme hatası (${file}):`, error);
            }
          }

          if (deletedCount > 0) {
            console.log(`✅ ${subDir}: ${deletedCount} dosya silindi`);
            totalDeleted += deletedCount;
          }
        }
      }

      if (totalDeleted > 0) {
        console.log(`✅ Toplam ${totalDeleted} upload dosyası silindi`);
      } else {
        console.log('ℹ️ Silinecek upload dosyası bulunamadı');
      }
    } catch (error) {
      console.error('❌ Uploads temizleme hatası:', error);
    }
  }

  /**
   * Temizleme özetini gösterir
   */
  private displayCleanupSummary(): void {
    console.log('\n🧹 TEMİZLEME ÖZETİ');
    console.log('==================');
    console.log('✅ Veritabanı ve dosya temizleme işlemi tamamlandı!');
    console.log('🔐 Admin kullanıcısı korundu');
    console.log(
      '📊 Sadece test verileri (@test.com emailli kullanıcılar ve test takımları) silindi',
    );
    console.log('📁 Uploads klasöründeki tüm dosyalar temizlendi');
    console.log('\n💡 İPUCU:');
    console.log('   - Admin kullanıcısı silinmez');
    console.log(
      '   - Sadece @test.com uzantılı emailler ve bilinen test takımları silinir',
    );
    console.log('   - Gerçek kullanıcı verileri korunur');
    console.log(
      '   - Uploads klasöründeki tüm dosyalar silinir (test ve gerçek)',
    );
  }

  /**
   * Ana temizleme işlemini çalıştırır
   */
  async clean(): Promise<void> {
    try {
      console.log('🧹 Veritabanı ve dosya temizleme işlemi başlatılıyor...\n');

      await this.loginAsAdmin();
      await this.deleteTestTeams();
      await this.deleteTestUsers();
      await this.cleanUploadsDirectory();

      this.displayCleanupSummary();
    } catch (error) {
      console.error('❌ Temizleme işlemi hatası:', error);
      console.log('\n🔍 HATA AYIKLAMA REHBERI:');
      console.log('1. Backend sunucusu çalışıyor mu?');
      console.log('2. Admin kullanıcısı mevcut mu?');
      console.log('3. Admin olarak giriş yapabilir misiniz?');
      process.exit(1);
    }
  }
}

// Script çalıştırılırsa temizleme işlemini başlat
if (require.main === module) {
  const cleaner = new DatabaseCleaner();
  cleaner.clean();
}
