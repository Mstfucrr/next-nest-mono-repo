# Builder asamasi: bagimliliklari yukleyip uygulamayi derler
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Proje dosyalarini ekle
COPY . .

RUN pnpm install --frozen-lockfile

# Sadece user-service'i derle
RUN pnpm --filter user-service build

# -------------------------
# Calistirma asamasi
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

COPY --from=builder /app/apps/services/user-service/dist ./dist
COPY apps/services/user-service/package.json ./package.json

RUN pnpm install --prod --frozen-lockfile

CMD ["node", "dist/main"]
