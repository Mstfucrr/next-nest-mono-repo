## 🚀 Projeyi Başlatma Adımları

1. **Bağımlılıkları yükleyin:**

   ```bash
   pnpm i
   ```

2. **Prisma client'ı oluşturun:**

   ```bash
   pnpm setup:prisma
   ```

3. **Servisleri ve web uygulamasını derleyin:**

   ```bash
   pnpm build:services && pnpm build:web
   ```

4. **Ortam dosyalarını ayarlayın:**
   - `.env.sample` dosyasını inceleyin.
   - Gerekli `.env` dosyalarını oluşturup uygun değerlerle doldurun.

5. **Geliştirme ortamını başlatın:**
   ```bash
   pnpm dev
   ```

Her adımda bir sorunla karşılaşırsanız, dökümantasyona göz atabilir veya ekibe danışabilirsiniz. Kolay gelsin! 🚀
