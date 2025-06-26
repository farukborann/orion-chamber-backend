# Orion Chamber Backend

Orion Chamber, AI destekli Virtual Try-On (VTON) uygulaması için geliştirilmiş NestJS tabanlı backend servisidir. Takım bazlı kredi yönetimi, kullanıcı kimlik doğrulama ve dosya depolama sistemi ile kapsamlı bir API sunar.

## 🚀 Özellikler

### 🔐 Kimlik Doğrulama & Yetkilendirme

- Session tabanlı kimlik doğrulama
- Admin/Kullanıcı rol sistemi
- Bcrypt ile şifre hashleme
- Güvenli session yönetimi (24 saat geçerlilik)

### 👥 Takım Yönetimi

- Takım oluşturma ve yönetimi
- Takım lideri/üye rolleri
- Kredi havuzu ve limitler
- Üye ekleme/çıkarma yetkileri

### 💳 Kredi Sistemi

- Takım bazlı kredi havuzu
- Kullanıcı bazlı kredi limitleri
- Periyodik kredi takibi (haftalık/aylık)
- AI işlemleri için kredi tüketimi

### 🤖 AI Entegrasyonu

- External AI modülü ile entegrasyon
- Virtual Try-On işlemleri
- Giysi türü tespiti
- Asenkron işlem yönetimi

### 📁 Dosya Yönetimi

- Base64 dosya yükleme
- Kategorize dosya depolama
- Güvenli dosya servisi
- Profil fotoğrafı yönetimi

### 🗄️ Veritabanı

- MongoDB ile TypeORM
- Soft delete sistemi
- Entity ilişkileri
- Otomatik timestamp'ler

## 🏗️ Proje Yapısı

```
src/
├── admin/              # Admin yönetim modülü
├── auth/               # Kimlik doğrulama modülü
├── common/             # Ortak entity'ler
├── core/               # Temel altyapı bileşenleri
│   ├── decorators/     # Custom decorator'lar
│   ├── filters/        # Exception filter'ları
│   ├── guards/         # Route guard'ları
│   ├── interceptors/   # HTTP interceptor'ları
│   └── services/       # Core servisler
├── processes/          # İşlem yönetimi
├── storage/            # Dosya depolama
├── teams/              # Takım yönetimi
├── users/              # Kullanıcı yönetimi
└── vton/               # Virtual Try-On modülü
```

## 🛠️ Teknoloji Stack'i

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: TypeORM
- **Authentication**: Express Session
- **Password Hashing**: Bcrypt
- **Package Manager**: Yarn
- **API Documentation**: Swagger/OpenAPI

## ⚙️ Kurulum

### Gereksinimler

- Node.js (v16+)
- MongoDB
- Yarn

### Adımlar

1. **Repository'yi klonlayın**

```bash
git clone <repository-url>
cd orion-chamber-backend
```

2. **Bağımlılıkları yükleyin**

```bash
yarn install
```

3. **Environment dosyasını oluşturun**

```bash
cp .env.example .env
```

4. **Environment değişkenlerini ayarlayın**

```env
# Database
DATABASE_URL=mongodb://localhost:27017/orion-chamber

# Session
SESSION_SECRET=your-super-secret-session-key

# Server
PORT=3000

# AI Service
AI_SERVICE_URL=http://localhost:9988
```

5. **Uygulamayı başlatın**

**Development mode:**

```bash
yarn start:dev
```

**Production mode:**

```bash
yarn build
yarn start:prod
```

## 📊 Veritabanı Şeması

### Core Entities

#### User

```typescript
{
  id: ObjectId
  firstName: string
  lastName: string
  email: string (unique)
  password: string (hashed)
  profilePhoto?: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
```

#### Team

```typescript
{
  id: ObjectId
  name: string
  photo?: string
  leadID: ObjectId (User ref)
  totalCredits: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
```

#### TeamMember

```typescript
{
  id: ObjectId
  teamID: ObjectId (Team ref)
  userID: ObjectId (User ref)
  maxCredit: number
  creditPeriod: 'monthly' | 'weekly'
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
```

#### Process

```typescript
{
  id: ObjectId
  userID: ObjectId (User ref)
  teamID?: ObjectId (Team ref)
  priority: number
  type: 'VTON'
  inputs: Record<string, any>
  outputs?: Record<string, any>
  status: 'PENDING' | 'INPROGRESS' | 'COMPLETED'
  visibility: 'ME' | 'TEAM'
  credit: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
}
```

## 🔗 API Endpoints

### Authentication

- `POST /auth/login` - Kullanıcı girişi
- `POST /auth/register` - Yeni kullanıcı kaydı
- `POST /auth/logout` - Çıkış
- `GET /auth/me` - Mevcut kullanıcı bilgileri

### Admin Management

- `GET /admin/users` - Tüm kullanıcıları listele
- `POST /admin/make-admin` - Admin yetkisi ver
- `POST /admin/remove-admin` - Admin yetkisini kaldır
- `DELETE /admin/users/:email` - Kullanıcı sil

### User Profile

- `GET /users/profile` - Profil bilgilerini getir
- `PUT /users/profile` - Profil güncelle

### Teams

- `GET /teams/my-teams` - Kullanıcının takımları
- `GET /teams/:id` - Takım detayları
- `POST /teams` - Yeni takım oluştur (Admin)
- `PUT /teams/:id` - Takım güncelle (Leader)
- `DELETE /teams/:id` - Takım sil (Admin)
- `GET /teams/:id/members` - Takım üyeleri
- `POST /teams/:id/members` - Üye ekle (Leader)
- `PUT /teams/:id/members/:email` - Üye güncelle (Leader)
- `DELETE /teams/:id/members/:email` - Üye çıkar (Leader)

### Storage

- `POST /storage/upload` - Dosya yükle
- `GET /storage/serve/*` - Dosya servis et

### VTON (Virtual Try-On)

- `POST /vton/create` - VTON işlemi oluştur
- `GET /vton/status/:id` - İşlem durumu sorgula

## 🎯 İş Kuralları

### Kredi Sistemi

- Her AI işlemi belirli miktarda kredi tüketir (VTON: 4 kredi)
- Takımların toplam kredi havuzu vardır
- Kullanıcıların periyodik kredi limitleri vardır
- Kredi kontrolü işlem öncesi yapılır

### Takım Yönetimi

- Takım lideri tüm üyeleri yönetebilir
- Lider kendi üyeliğini silemez
- Admin tüm takımları yönetebilir
- Üyeler sadece görüntüleme yetkisine sahiptir

### Dosya Güvenliği

- Tüm dosya erişimleri kimlik doğrulama gerektirir
- Directory traversal saldırılarına karşı korunma
- Base64 formatında dosya yükleme

## 🔒 Güvenlik

- Session tabanlı kimlik doğrulama
- Bcrypt ile güçlü şifre hashleme
- SQL injection koruması (NoSQL)
- Input validation (class-validator)
- Rate limiting (gelecek güncelleme)
- HTTPS zorunluluğu (production)

## 🧪 Test

```bash
# Unit testler
yarn test

# E2E testler
yarn test:e2e

# Test coverage
yarn test:cov
```

## 📝 Development Guidelines

### Code Style

- TypeScript strict mode
- ESLint + Prettier
- Camel case for variables/functions
- Pascal case for classes
- Kebab case for files

### Architecture

- Modular design
- Dependency injection
- Single responsibility principle
- Clean code practices

## 🚀 Deployment

### Production Checklist

- [ ] Environment variables ayarlandı
- [ ] Database bağlantısı test edildi
- [ ] Session secret güçlü şifre
- [ ] HTTPS aktif
- [ ] Log monitoring ayarlandı

### Docker (Opsiyonel)

```dockerfile
# Gelecek sürümlerde eklenecek
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişiklikleri commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje Lideri: Ömer Faruk Boran (github.com/farukborann)

---

**Not**: Bu README dosyası proje geliştikçe güncellenecektir.
