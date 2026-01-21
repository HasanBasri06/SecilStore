# Seçil Store - Koleksiyon Yönetim Platformu

Next.js tabanlı koleksiyon yönetim platformu. Kullanıcılar koleksiyonlarını yönetebilir, ürünlerini düzenleyebilir, sıralayabilir ve filtreleyebilir.

## 🚀 Teknolojiler

- **Framework**: Next.js 16.1.4
- **Kimlik Doğrulama**: NextAuth.js
- **State Yönetimi**: Redux Toolkit
- **Dil**: TypeScript
- **Stil**: Tailwind CSS
- **Container**: Docker & Docker Compose

## 📋 Özellikler

### Login Sayfası
- Email ve şifre ile giriş
- NextAuth.js ile kimlik doğrulama
- Hata mesajları gösterimi
- Başarılı giriş sonrası koleksiyonlar sayfasına yönlendirme
- Koyu mod tasarım

### Koleksiyonlar Sayfası
- **Grid Görünümü**: 3 sütunlu grid görünümü (responsive)
- **Liste Görünümü**: Yatay kart görünümü
- Görünüm türü seçimi (Grid/Liste butonları)
- Arama özelliği (koleksiyon ismi ve açıklama)
- Her koleksiyon için özel görsel tasarım
- Her koleksiyon için "Sabitleri Düzenle" butonu
- Düzenleme sayfasına yönlendirme (`/collection/:id/edit`)
- Koyu mod tasarım

### Koleksiyon Düzenleme Sayfası
- **Koleksiyon Bilgileri Düzenleme**:
  - Başlık
  - Açıklama
  - Kategori seçimi

- **Ürün Yönetimi**:
  - Koleksiyona ait ürünleri görüntüleme
  - **Grid Görünümü**: 3 sütunlu grid görünümü
  - **Liste Görünümü**: Yatay liste görünümü
  - Drag-and-drop ile ürün sıralama
  - Ürünlere tıklayarak düzenleme modalı açma

- **Ürün Düzenleme Modalı**:
  - Başlık düzenleme
  - Açıklama düzenleme
  - Kategori seçimi
  - Fiyat düzenleme
  - Stok bilgisi ekleme/düzenleme
  - Ürün kodu ekleme/düzenleme
  - Başarılı kayıt sonrası toast bildirimi

- **Filtreleme Paneli**:
  - Kategori filtresi
  - Min/Max Fiyat filtresi
  - Min/Max Stok filtresi
  - Ürün kodu arama filtresi
  - Filtreleri temizleme butonu

- **Ürün Listesi Özellikleri**:
  - Ürün başlığı, açıklama, kategori
  - Fiyat gösterimi
  - Stok bilgisi (varsa)
  - Ürün kodu (varsa)
  - Sıra numarası

- **Kaydet ve Vazgeç**:
  - Kaydet butonu (request modal'da JSON gösterimi)
  - Vazgeç butonu (koleksiyonlar sayfasına dönüş)

### Genel Özellikler
- Koyu mod tasarım (tüm sayfalar)
- Responsive tasarım
- Toast bildirimleri
- Koleksiyonlara özel görsel tasarım (gradient + ikon)
- 8 koleksiyon, 36 ürün (mock data)

## 🛠️ Kurulum

### Geliştirme Ortamı

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### Docker ile Çalıştırma

```bash
# Docker image'ı build et ve container'ı başlat
docker-compose up --build

# Arka planda çalıştırmak için
docker-compose up -d --build

# Container'ı durdurmak için
docker-compose down

# Container loglarını görüntülemek için
docker-compose logs -f
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 👤 Test Kullanıcıları

Aşağıdaki kullanıcı bilgileri ile giriş yapabilirsiniz:

- **Email**: `basri@info.com` | **Şifre**: `123456`
- **Email**: `test@example.com` | **Şifre**: `123456`
- **Email**: `admin@example.com` | **Şifre**: `admin123`

## 📁 Proje Yapısı

```
secilstore/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts          # NextAuth yapılandırması
│   │   ├── collection/
│   │   │   ├── [id]/
│   │   │   │   └── edit/
│   │   │   │       └── page.tsx          # Koleksiyon düzenleme sayfası
│   │   │   └── page.tsx                  # Koleksiyonlar listesi
│   │   ├── login/
│   │   │   └── page.tsx                  # Login sayfası
│   │   ├── globals.css                   # Global stiller ve animasyonlar
│   │   └── layout.tsx                    # Root layout
│   ├── components/
│   │   ├── CollectionItem.tsx           # Koleksiyon kartı (grid/liste görünümü)
│   │   ├── Navbar.tsx                    # Navigasyon çubuğu
│   │   ├── Providers.tsx                 # Redux ve NextAuth provider'ları
│   │   ├── ReduxProvider.tsx             # Redux provider
│   │   └── ui/                           # UI bileşenleri
│   │       ├── Button.tsx               # Buton component'i
│   │       ├── Card.tsx                  # Kart component'i
│   │       └── index.ts                  # UI export'ları
│   ├── store/
│   │   ├── slices/
│   │   │   ├── collectionSlice.ts       # Koleksiyon state yönetimi
│   │   │   └── loginSlice.ts            # Login state yönetimi
│   │   ├── hooks.ts                      # Redux hooks
│   │   └── store.ts                      # Redux store
│   └── types/
│       └── next-auth.d.ts                # NextAuth type tanımları
├── public/                                # Statik dosyalar
├── Dockerfile                             # Docker image tanımı
├── docker-compose.yml                     # Docker Compose yapılandırması
├── package.json
├── tsconfig.json
├── next.config.mjs
└── tailwind.config.js
```

## 🎨 Tasarım Özellikleri

### Koyu Mod
- Tüm sayfalar koyu modda tasarlandı
- Siyah ve koyu gri tonları kullanıldı
- Açık renkli metinler ve kontrastlar

### Koleksiyon Görselleri
Her koleksiyon için ismine özel görsel tasarım:
- **Premium Giyim**: Mor-pembe-kırmızı gradient + kalkan ikonu
- **Değerli Mücevherler**: Sarı-amber-turuncu gradient + yıldız ikonu
- **Modern Sanat**: Mavi-indigo-mor gradient + sanat ikonu
- **Ayakkabı**: Gri tonları gradient + ayakkabı ikonu
- **Antika**: Amber-sarı-turuncu gradient + antika ikonu
- **Zaman Ölçüm**: Mavi-cyan-teal gradient + saat ikonu
- **Deri Aksesuarlar**: Kahverengi-amber gradient + deri ikonu
- **Ev Dekorasyonu**: Yeşil-emerald-teal gradient + ev ikonu

## 🔧 Geliştirme

### Build

```bash
npm run build
```

### Production'da Çalıştırma

```bash
npm start
```

### Lint

```bash
npm run lint
```

## 🐳 Docker Detayları

### Dockerfile
- Multi-stage build kullanıyor
- Node.js 20 Alpine base image
- Standalone output ile optimize edilmiş build
- Production-ready yapılandırma
- Non-root user ile çalışır (güvenlik)

### Docker Compose
- Tek servis (app) tanımlı
- Port 3000'de çalışır
- Environment variables yapılandırılabilir
- Network yapılandırması
- Restart policy: unless-stopped

## 📊 Veri Yapısı

### Koleksiyonlar
- 8 koleksiyon
- Her koleksiyon 4-5 ürün içerir
- Kategori bazlı gruplandırma

### Ürünler
- 36 ürün (mock data)
- Her ürün için: başlık, açıklama, kategori, fiyat, stok, ürün kodu
- Sıralama (order) desteği

### Kategoriler
- Giyim
- Mücevher
- Sanat
- Ayakkabı
- Kitap
- Saat
- Aksesuar
- Mobilya

## 🎯 Kullanım Senaryoları

1. **Koleksiyon Görüntüleme**:
   - Login yapın
   - Koleksiyonlar sayfasında grid veya liste görünümünü seçin
   - Arama yaparak koleksiyonları filtreleyin

2. **Koleksiyon Düzenleme**:
   - Bir koleksiyonun "Sabitleri Düzenle" butonuna tıklayın
   - Koleksiyon bilgilerini düzenleyin
   - Ürünleri drag-and-drop ile sıralayın
   - Filtreleme panelini kullanarak ürünleri filtreleyin

3. **Ürün Düzenleme**:
   - Ürün listesinde bir ürüne tıklayın
   - Modal'da ürün bilgilerini düzenleyin
   - Stok ve ürün kodu ekleyin
   - Kaydet butonuna tıklayın
   - Toast bildirimi ile başarı mesajını görün

## 📝 Notlar

- Kaydet butonuna tıklandığında request modal'da JSON gösterilir, gerçek kaydetme işlemi yapılmaz
- Tüm veriler mock data olarak Redux store'da tutulmaktadır
- NextAuth secret key'i production'da değiştirilmelidir
- Drag-and-drop sıralama sadece liste görünümünde çalışır
- Toast bildirimleri 3 saniye sonra otomatik kapanır

## 🔐 Güvenlik

- NextAuth.js ile güvenli kimlik doğrulama
- Environment variables ile hassas bilgilerin korunması
- Docker container'da non-root user kullanımı
- Production'da secret key'lerin değiştirilmesi gereklidir
