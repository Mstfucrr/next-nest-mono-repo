# syntax=docker/dockerfile:1

###############################################################################
# 1) BASE AŞAMASI – Node.js ve pnpm kurulumu
###############################################################################
FROM node:24-alpine AS base
WORKDIR /app

# pnpm kurulumu
RUN npm install -g pnpm

# package.json ve lock dosyalarını kopyala
COPY package.json pnpm-lock.yaml ./

###############################################################################
# 2) DEPENDENCIES AŞAMASI – Bağımlılıkları yükle
###############################################################################
FROM base AS deps

# Tüm bağımlılıkları yükle (production ve development)
RUN pnpm install --frozen-lockfile

###############################################################################
# 3) BUILDER AŞAMASI – Next.js uygulamasını derle
###############################################################################
FROM base AS builder

# Bağımlılıkları kopyala
COPY --from=deps /app/node_modules ./node_modules

# Kaynak kodları kopyala
COPY . .

# Next.js uygulamasını derle
RUN pnpm run build

###############################################################################
# 4) RUNNER AŞAMASI – Production runtime
###############################################################################
FROM node:24-alpine AS runner

WORKDIR /app

# Sistem kullanıcısı oluştur
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Standalone output'u kopyala
COPY --from=builder /app/dist/standalone ./
COPY --from=builder /app/dist/static ./dist/static
COPY --from=builder /app/public ./public

# Kullanıcıyı değiştir
USER nextjs

# Port'u expose et
EXPOSE 3000

# Environment variable
ENV PORT 3000
ENV NODE_ENV production

# Uygulamayı başlat
CMD ["node", "server.js"] 