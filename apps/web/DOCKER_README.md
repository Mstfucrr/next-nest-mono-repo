# Next.js Web Application Docker Setup

Bu klasör Next.js web uygulaması için özel Docker yapılandırması içerir.

## Dockerfile Özellikleri

### Multi-stage Build

- **base**: Node.js ve pnpm kurulumu
- **deps**: Bağımlılıkların yüklenmesi
- **builder**: Next.js uygulamasının derlenmesi
- **runner**: Production runtime

### Standalone Output

Next.js `output: 'standalone'` konfigürasyonu kullanılarak:

- Minimum runtime dependencies
- Optimized production build
- Self-contained server

## Kullanım

### Tek Başına Çalıştırma

```bash
# Build
docker build -t web-app .

# Çalıştır
docker run -p 3000:3000 web-app
```

### Docker Compose ile

```bash
# Sadece web servisi
docker-compose up web

# Tüm servisler
docker-compose up
```

## Port

- **3000**: Web uygulaması

## Environment Variables

- `PORT`: 3000 (default)
- `NODE_ENV`: production

## Build Optimizasyonları

- `.dockerignore` ile gereksiz dosyalar hariç tutulur
- Multi-stage build ile image boyutu minimize edilir
- Non-root user (nextjs) ile güvenlik sağlanır

## Sorun Giderme

### Module Not Found Hatası

Eğer `./cpu-profile` gibi modül bulunamama hatası alırsanız:

1. Next.js konfigürasyonunu kontrol edin
2. `output: 'standalone'` ayarının doğru olduğundan emin olun
3. Dockerfile'ın güncel olduğunu kontrol edin

### Build Hatası

1. `pnpm install` komutunun başarılı olduğunu kontrol edin
2. TypeScript derleme hatalarını kontrol edin
3. Next.js build çıktısını kontrol edin
