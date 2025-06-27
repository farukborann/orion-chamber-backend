# Test Assets Klasörü

Bu klasör, test scriptlerinde kullanılacak örnek dosyaları içerir.

## 📁 Klasör Yapısı

```
tests/assets/
├── mannequins/          # Model fotoğrafları
│   ├── female/          # Kadın modeller
│   │   ├── model_1.jpg
│   │   ├── model_2.jpg
│   │   └── ...
│   └── male/            # Erkek modeller
│       ├── model_1.jpg
│       ├── model_2.jpg
│       └── ...
├── garments/            # Kıyafet fotoğrafları
│   ├── tops/            # Üst giyim
│   │   ├── shirt_1.jpg
│   │   ├── tshirt_1.jpg
│   │   └── ...
│   └── bottoms/         # Alt giyim
│       ├── jeans_1.jpg
│       ├── pants_1.jpg
│       └── ...
└── profiles/            # Profil fotoğrafları
    ├── avatar_1.jpg
    ├── avatar_2.jpg
    └── ...
```

## 📋 Dosya Gereksinimleri

### Mannequin Fotoğrafları

- **Format**: JPG, PNG
- **Boyut**: 512x768 px (önerilen)
- **İçerik**: Temiz arka plan, düz duruş
- **Adet**: En az 5'er adet kadın/erkek

### Garment Fotoğrafları

- **Format**: JPG, PNG
- **Boyut**: 512x512 px (önerilen)
- **İçerik**: Temiz arka plan, düz kıyafet
- **Adet**: Her kategoride en az 3'er adet

### Profil Fotoğrafları

- **Format**: JPG, PNG
- **Boyut**: 200x200 px (önerilen)
- **İçerik**: Avatar veya kişi fotoğrafları
- **Adet**: En az 10 adet

## 🔄 Kullanım

Test scriptleri bu dosyaları otomatik olarak seçer ve VTON işlemleri için kullanır:

1. **Mannequin seçimi**: Rastgele model fotoğrafı
2. **Garment seçimi**: Rastgele kıyafet fotoğrafı
3. **Profil fotoğrafı**: Kullanıcı kayıt sırasında rastgele avatar

## ⚠️ Önemli Notlar

- Dosya isimleri basit olmalı (özel karakter yok)
- Tüm dosyalar gerçek test dosyaları olmalı
- Copyright sorunları olmayan görseller kullanın
- Dosya boyutları 2MB'ı geçmemeli
