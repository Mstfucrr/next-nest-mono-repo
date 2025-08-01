# syntax=docker/dockerfile:1

###############################################################################
# 1) BASE AŞAMASI – tüm workspace'i hazırlar
###############################################################################
FROM node:24-alpine AS base
WORKDIR /repo

# 1.1) pnpm & turbo CLI'ları
RUN npm install -g pnpm turbo

# 1.2) Monorepo manifest'leri ve TS config
COPY package.json pnpm-lock.yaml turbo.json pnpm-workspace.yaml tsconfig.json ./

# 1.3) Ortak kütüphaneler
COPY libs ./libs

# 1.4) Tüm bağımlılıkları yükle
RUN pnpm install --no-frozen-lockfile

###############################################################################
# 2) BUILD AŞAMASI – sadece ilgili servisi derler ve (opsiyonel) Prisma client üretir
###############################################################################
FROM base AS build

# PROJECT_PATH: apps/ içinden servis klasörü (örn: services/auth-service)
# SERVICE_NAME: servis adı (örn: auth-service)
# HAS_PRISMA: "true" ise prisma/schema.prisma'e göre client generate edecek
ARG PROJECT_PATH
ARG SERVICE_NAME
ARG HAS_PRISMA=false

WORKDIR /repo/apps/${PROJECT_PATH}

# 2.1) Servis kodunu workspace root'tan kopyala
#      (BASE aşamasında tüm apps/ kopyalanmadığı için burayı ekliyoruz)
COPY apps/${PROJECT_PATH} ./

# 2.2) Servis'e özel bağımlılıkları yükle
RUN pnpm install --no-frozen-lockfile

# 2.3) Eğer bu servis Prisma kullanıyorsa ve schema varsa, client üret
RUN if [ "$HAS_PRISMA" = "true" ] && [ -f "./prisma/schema.prisma" ]; then \
      echo "🔧 Prisma schema bulundu, client generate ediliyor…"; \
      pnpm run prisma:generate; \
      echo "✅ Prisma client generated successfully"; \
    else \
      echo "ℹ️  Prisma yok veya HAS_PRISMA=false, generate atlanıyor."; \
    fi

# 2.4) TypeScript ile build et (dist klasörüne)
RUN pnpm turbo run build --filter=${SERVICE_NAME}

###############################################################################
# 3) RUNTIME AŞAMASI – production için gerekli dosyaları alır ve çalıştırır
###############################################################################
FROM node:24-alpine AS runner
ARG PROJECT_PATH
WORKDIR /repo/apps/${PROJECT_PATH}

# 3.1) pnpm CLI
RUN npm install -g pnpm


ARG SERVICE_NAME
ARG HAS_PRISMA=false
# servido çalıştırma komutu
ENV START_CMD="node dist/main.js"

# 3.2) Build'dan dist'i al
COPY --from=build /repo/apps/${PROJECT_PATH}/dist ./dist

# 3.3) Libs'i al
COPY --from=build /repo/libs /repo/libs
# 3.4) Workspace node_modules'i al (lib'lerin bağımlılıkları için)
COPY --from=build /repo/node_modules /repo/node_modules

# 3.5) Build'dan node_modules'i al (prod + prisma client içerir)
COPY --from=build /repo/apps/${PROJECT_PATH}/node_modules ./node_modules

# 3.4) Prisma client'ı runtime'a kopyala (eğer varsa)
RUN if [ "$HAS_PRISMA" = "true" ]; then \
      echo "📦 Prisma client runtime'a kopyalanıyor…"; \
      mkdir -p ./node_modules/.prisma; \
      cp -r /repo/apps/${PROJECT_PATH}/node_modules/.prisma ./node_modules/ 2>/dev/null || true; \
    fi

# 3.5) Uygulamayı başlat
CMD ["sh","-c","$START_CMD"]
