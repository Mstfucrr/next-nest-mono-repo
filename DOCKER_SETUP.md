# Docker Ortami

Bu repodaki servisleri ve Next.js tabanli web uygulamasini Docker ile calistirmak icin `docker-compose.yml` dosyasi eklenmistir. Tum uygulamalar tek Dockerfile kullanarak Turbo ile derlenir.

## Kullanım

1. Tum servislerin ve web uygulamasinin imajlarini olusturmak ve baslatmak icin:

```bash
docker compose up --build
```

2. Uygulamalar varsayilan olarak asagidaki portlarda calisir:

- API Gateway: `http://localhost:4000`
- Auth Service: `http://localhost:4001`
- User Service: `http://localhost:4002`
- Product Service: `http://localhost:4003`
- Web: `http://localhost:3000`

Ihtiyac duyarsaniz `docker-compose.yml` icindeki portlari degistirebilirsiniz.
