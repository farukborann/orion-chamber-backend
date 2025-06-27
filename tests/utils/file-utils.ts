import * as fs from 'fs';
import * as path from 'path';

/**
 * Test asset dosyalarını yönetmek için yardımcı fonksiyonlar
 */
export class FileUtils {
  private static readonly ASSETS_DIR = path.join(__dirname, '../assets');

  /**
   * Belirtilen klasördeki tüm dosyaları listeler
   */
  static getFilesInDirectory(dirPath: string): string[] {
    try {
      const fullPath = path.join(this.ASSETS_DIR, dirPath);
      if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️ Klasör bulunamadı: ${fullPath}`);
        return [];
      }

      const files = fs.readdirSync(fullPath);
      return files.filter((file) => {
        const filePath = path.join(fullPath, file);
        return fs.statSync(filePath).isFile() && this.isImageFile(file);
      });
    } catch (error) {
      console.error(`❌ Dosyalar listelenemedi (${dirPath}):`, error);
      return [];
    }
  }

  /**
   * Rastgele bir dosya seçer
   */
  static getRandomFile(dirPath: string): string | null {
    const files = this.getFilesInDirectory(dirPath);
    if (files.length === 0) {
      console.warn(`⚠️ ${dirPath} klasöründe dosya bulunamadı`);
      return null;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    return files[randomIndex];
  }

  /**
   * Dosyayı base64 formatına çevirir
   */
  static fileToBase64(dirPath: string, filename: string): string | null {
    try {
      const fullPath = path.join(this.ASSETS_DIR, dirPath, filename);
      if (!fs.existsSync(fullPath)) {
        console.warn(`⚠️ Dosya bulunamadı: ${fullPath}`);
        return null;
      }

      const fileBuffer = fs.readFileSync(fullPath);
      const mimeType = this.getMimeType(filename);
      return `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
    } catch (error) {
      console.error(`❌ Dosya base64'e çevrilemedi (${filename}):`, error);
      return null;
    }
  }

  /**
   * Rastgele dosyayı base64 formatında döner
   */
  static getRandomFileAsBase64(dirPath: string): string | null {
    const filename = this.getRandomFile(dirPath);
    if (!filename) return null;

    return this.fileToBase64(dirPath, filename);
  }

  /**
   * Dosyanın görsel dosyası olup olmadığını kontrol eder
   */
  private static isImageFile(filename: string): boolean {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const ext = path.extname(filename).toLowerCase();
    return imageExtensions.includes(ext);
  }

  /**
   * Dosya uzantısından MIME type'ı döner
   */
  private static getMimeType(filename: string): string {
    const ext = path.extname(filename).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    };

    return mimeTypes[ext] || 'image/jpeg';
  }

  /**
   * Rastgele mannequin fotoğrafı seçer
   */
  static getRandomMannequin(gender?: 'male' | 'female'): string | null {
    if (gender) {
      return this.getRandomFileAsBase64(`mannequins/${gender}`);
    }

    // Rastgele cinsiyet seç
    const randomGender = Math.random() > 0.5 ? 'female' : 'male';
    return this.getRandomFileAsBase64(`mannequins/${randomGender}`);
  }

  /**
   * Rastgele kıyafet fotoğrafı seçer
   */
  static getRandomGarment(category?: 'tops' | 'bottoms'): string | null {
    if (category) {
      return this.getRandomFileAsBase64(`garments/${category}`);
    }

    // Rastgele kategori seç
    const categories = ['tops', 'bottoms'];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    return this.getRandomFileAsBase64(`garments/${randomCategory}`);
  }

  /**
   * Rastgele profil fotoğrafı seçer
   */
  static getRandomProfile(): string | null {
    return this.getRandomFileAsBase64('profiles');
  }

  /**
   * Asset klasörlerinin durumunu kontrol eder
   */
  static checkAssetDirectories(): void {
    console.log('📁 Asset klasörleri kontrol ediliyor...');

    const directories = [
      'mannequins/female',
      'mannequins/male',
      'garments/tops',
      'garments/bottoms',
      'profiles',
    ];

    let hasIssues = false;

    directories.forEach((dir) => {
      const files = this.getFilesInDirectory(dir);
      if (files.length === 0) {
        console.warn(`⚠️ ${dir} klasöründe dosya bulunamadı`);
        hasIssues = true;
      } else {
        console.log(`✅ ${dir}: ${files.length} dosya`);
      }
    });

    if (hasIssues) {
      console.log(
        '\n💡 İPUCU: tests/assets/README.md dosyasını okuyun ve gerekli dosyaları ekleyin',
      );
    }
  }
}
