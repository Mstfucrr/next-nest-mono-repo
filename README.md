# Docker Kurulumu

Bu proje, Next.js tabanlı web uygulaması ile NestJS mikro servislerini bir araya getiren bir monorepodur. Docker Compose sayesinde tum servisleri tek komutla calistirabilirsiniz.

## Baslangic

Tum imajlari olusturup containerlari calistirmak icin:

```bash
docker compose up --build
```

Durdurmak icin:

```bash
docker compose down
```

Servisler calistiktan sonra erisim adresleri:

- **Web**: [http://localhost:3000](http://localhost:3000)
- **API Gateway**: [http://localhost:3001](http://localhost:3001)
- **Auth Service**: [http://localhost:3002](http://localhost:3002)
- **Product Service**: [http://localhost:3003](http://localhost:3003)
- **User Service**: [http://localhost:3004](http://localhost:3004)

Her servisin Dockerfile'i kendi klasorunde yer alir. Dosyalarda builder ve calistirma asamalari Turkce yorumlarla aciklanmistir. Ayrica `.dockerignore` dosyasi gereksiz dosyalarin imaja eklenmesini onler.
