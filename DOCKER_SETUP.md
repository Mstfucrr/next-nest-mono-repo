# Docker Setup

Bu repo icin Docker ortamini kullanarak tum servisleri ve web uygulamasini calistirabilirsiniz. Her servis icin ayri Dockerfile olusturulmus ve `docker-compose.yml` dosyasinda tanimlanmistir.

## Calistirma

1. Docker ve Docker Compose yüklü olmalıdır.
2. Depo kök dizininde aşağıdaki komutu çalıştırın:

```bash
docker compose up --build
```

Bu komut `.dockerignore` dosyasında belirtilen gereksiz dosyaları hariç
tutarak tüm servisleri ve Next.js uygulamasını derler ve başlatır. Aşağıdaki portlar kullanılır:

- API Gateway: `http://localhost:4000`
- Auth Service: `tcp://localhost:4001`
- User Service: `tcp://localhost:4002`
- Product Service: `tcp://localhost:4003`
- Web Uygulaması: `http://localhost:3000`

Servisler arası iletişim için gerekli `HOST` değişkenleri `docker-compose.yml` içinde ayarlanmıştır.
