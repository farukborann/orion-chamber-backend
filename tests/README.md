# Orion Chamber Test Scripts

Bu klasör, Orion Chamber backend API'lerini test etmek ve veritabanına gerçekçi test verileri eklemek için kullanılan scriptleri içerir.

## 📁 Dosyalar

- **`config.ts`** - Test konfigürasyonu ve örnek veri tanımları
- **`seed-database.ts`** - Veritabanına gerçekçi test verileri ekleyen script
- **`run-tests.ts`** - API'lerin çalışıp çalışmadığını test eden script
- **`clean-database.ts`** - Test verilerini ve upload dosyalarını temizleyen script
- **`assets/`** - Test için kullanılan görsel dosyalar (mannequin, garment, profil fotoğrafları)
- **`utils/`** - Dosya işlemleri için yardımcı fonksiyonlar
- **`tsconfig.json`** - TypeScript konfigürasyonu (ana projeyi extend eder)

## 🎯 Gerçekçi Seed İşlemi Akışı

Yeni seed sistemi gerçek kullanım senaryolarını taklit eder:

1. **10 kullanıcı register olur** - Rastgele profil fotoğrafları ile
2. **Admin 2 takım yaratır** - İlk 2 kullanıcıyı lead yapar, her takıma 100 kredi verir
3. **Lead'ler takımlarına 5'er üye ekler** - İlk 3 üyeye 150 kredi limiti uygular
4. **Rastgele 5 kullanıcı VTON işlemleri yaratır** - Asset dosyalarından rastgele mannequin ve garment seçer

## 🚀 Kullanım

### Ön Koşullar

1. **Backend sunucusunu başlat:**

   ```bash
   yarn start:dev
   ```

2. **Admin kullanıcısının mevcut olduğunu doğrula:**
   - Email: `admin@orionchamber.com`
   - Password: `Admin123!`

3. **Test asset dosyalarını ekle:**
   `tests/assets/README.md` dosyasını okuyun ve gerekli görsel dosyaları ekleyin.

### Komutlar

```bash
# Veritabanını gerçekçi test verileriyle doldur
yarn seed

# API testlerini çalıştır
yarn test:api

# Test verilerini ve upload dosyalarını temizle
yarn clean:test
```

## 📋 Oluşturulan Test Verileri

### 👥 Kullanıcılar (10 adet)

- alice.johnson@test.com _(LEAD - Fashion Forward)_
- bob.smith@test.com _(LEAD - Style Innovators)_
- charlie.brown@test.com
- diana.wilson@test.com
- ethan.davis@test.com
- fiona.martinez@test.com
- george.garcia@test.com
- hannah.rodriguez@test.com
- ivan.lopez@test.com
- jessica.lee@test.com

### 🏢 Takımlar (2 adet)

- **Fashion Forward** - Lead: Alice Johnson (100 kredi)
- **Style Innovators** - Lead: Bob Smith (100 kredi)

### 💳 Kredi Sistemi

- Her takım: 100 kredi
- İlk 3 üye: 150 kredi limiti
- Diğer üyeler: Kredi limiti yok

### 🎨 VTON İşlemleri

- 5 adet rastgele VTON işlemi
- Rastgele mannequin ve garment kombinasyonları
- Rastgele visibility ayarları (ME/TEAM)

## 📁 Asset Dosyaları

Test scriptlerinin düzgün çalışması için `tests/assets/` klasörüne aşağıdaki dosyaları eklemeniz gerekir:

```
tests/assets/
├── mannequins/
│   ├── female/          # En az 5 kadın model fotoğrafı
│   └── male/            # En az 5 erkek model fotoğrafı
├── garments/
│   ├── tops/            # En az 3 üst giyim fotoğrafı
│   └── bottoms/         # En az 3 alt giyim fotoğrafı
└── profiles/            # En az 10 profil fotoğrafı
```

Detaylar için `tests/assets/README.md` dosyasına bakın.

## 🛠️ Konfigürasyon

`config.ts` dosyasından ayarları değiştirebilirsiniz:

```typescript
export const TEST_CONFIG = {
  API_BASE_URL: 'http://localhost:3000',
  ADMIN_EMAIL: 'admin@orionchamber.com',
  ADMIN_PASSWORD: 'Admin123!',
  TEST_USER_COUNT: 10,
  TEST_TEAM_COUNT: 2,
  TEAM_CREDITS: 100,
  MEMBER_CREDITS: 150,
  VTON_PROCESS_COUNT: 5,
};
```

## 🔧 Sorun Giderme

### Yaygın Hatalar

1. **"Admin girişi başarısız"**
   - Backend sunucusunun çalıştığını kontrol edin
   - Admin kullanıcısının oluşturulduğunu doğrulayın

2. **"Asset dosyaları bulunamadı"**
   - `tests/assets/` klasörüne gerekli dosyaları ekleyin
   - `tests/assets/README.md` dosyasını okuyun

3. **"VTON işlemi oluşturulamadı"**
   - Kullanıcının bir takıma dahil olduğunu kontrol edin
   - Mannequin ve garment dosyalarının mevcut olduğunu kontrol edin

### Temizleme İşlemi

`yarn clean:test` komutu:

- Sadece @test.com uzantılı kullanıcıları siler
- Test takımlarını siler (Fashion Forward, Style Innovators)
- **Uploads klasöründeki TÜM dosyaları siler**
- Admin kullanıcısını korur

## 🔄 Tam Test Döngüsü

```bash
# 1. Mevcut test verilerini ve dosyaları temizle
yarn clean:test

# 2. Asset dosyalarını kontrol et ve ekle
# (tests/assets/ klasörüne gerekli dosyaları koyun)

# 3. Yeni gerçekçi test verileri oluştur
yarn seed

# 4. API'leri test et
yarn test:api
```

## 📊 Seed İşlemi Sonuçları

Seed işlemi tamamlandığında:

- ✅ 10 kullanıcı kaydedilir (profil fotoğrafları ile)
- ✅ 2 takım oluşturulur (lead'ler atanır)
- ✅ Her takıma 5 üye eklenir (kredi limitleri ile)
- ✅ 5 VTON işlemi oluşturulur (rastgele görsellerle)
- ✅ Detaylı özet raporu gösterilir

Bu sistem, gerçek kullanım senaryolarını taklit ederek backend API'lerinin kapsamlı testini sağlar.
