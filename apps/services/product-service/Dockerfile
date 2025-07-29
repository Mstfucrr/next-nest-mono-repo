# --------------------------------------------
# 1. Builder aşaması
# --------------------------------------------
FROM node:24.4.1 AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/services/product-service/package.json apps/services/product-service/
COPY tsconfig.json tsconfig.json
# Shared-libs ve sadece ürüne ait kodu kopyala
COPY libs/shared-types libs/shared-types
COPY libs/shared-utils libs/shared-utils

RUN pnpm install --frozen-lockfile

COPY apps/services/product-service apps/services/product-service

RUN pnpm --filter product-service build

# --------------------------------------------
# 2. Runner aşaması
# --------------------------------------------
FROM node:24.4.1-alpine AS runner
WORKDIR /app
# Runtime'da klasörü listele, sonra uygulamayı başlat
CMD ["sh", "-c", "echo '==== /app içeriği ====' && ls -la /app && echo '==== dist içeriği ====' && ls -la /app/dist && exec node dist/main"]
ENV NODE_ENV=production

# 1) product-service kodunu kopyala
COPY --from=builder /app/apps/services/product-service/dist ./dist

COPY --from=builder /app/libs/shared-types ./libs/shared-types
COPY --from=builder /app/libs/shared-utils ./libs/shared-utils

# 2) node_modules'i builder'dan al
COPY --from=builder /app/node_modules node_modules

# 3) dist içindeki apps/services/product-service/src/main'i dist/main'e kopyala
RUN cp -r dist/apps/services/product-service/src ./dist

# 4) Entrypoint script'i kopyala ve çalıştırılabilir yap
COPY apps/services/product-service/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 4003

ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/src/main"]
