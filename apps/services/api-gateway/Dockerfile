# Builder asamasi: bagimliliklari yukleyip uygulamayi derler
FROM node:20-alpine AS builder

# Calisma dizini
WORKDIR /app

# pnpm'i aktif et ve versiyonunu ayarla
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Tum projeyi konteynera kopyala
COPY . .

# Bagimliliklari kur
RUN pnpm install --frozen-lockfile

# Sadece api-gateway servisini derle
RUN pnpm --filter api-gateway build

# -------------------------
# Calistirma asamasi
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Derlenen dosyalari kopyala
COPY --from=builder /app/apps/services/api-gateway/dist ./dist
COPY apps/services/api-gateway/package.json ./package.json

# Sadece uretim bagimliliklarini kur
RUN pnpm install --prod --frozen-lockfile

# Uygulamayi baslat
CMD ["node", "dist/main"]
