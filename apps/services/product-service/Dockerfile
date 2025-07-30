# --------------------------------------------
# 1. Builder Aşaması
# --------------------------------------------
    
FROM node:24.4.1 AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.json .npmrc ./
COPY apps/services/product-service/package.json apps/services/product-service/
COPY libs libs

RUN pnpm install --no-frozen-lockfile --shamefully-hoist

COPY apps/services/product-service apps/services/product-service

# Build shared libraries first
RUN pnpm --filter @dailyshop/shared-utils build
RUN pnpm --filter @dailyshop/shared-types build


RUN pnpm --filter product-service build


# --------------------------------------------
# 2. Runner Aşaması
# --------------------------------------------

FROM node:24.4.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy dist and node_modules, then move files to correct location
COPY --from=builder /app/apps/services/product-service/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
RUN cp -r dist/apps/services/product-service/src ./dist && \
    rm -rf dist/apps/services/product-service


# 5) Shared-types’in derlenmiş dist’ini node_modules’a koy
RUN mkdir -p node_modules/@dailyshop/shared-types
COPY --from=builder /app/libs/shared-types/dist ./node_modules/@dailyshop/shared-types/dist
COPY --from=builder /app/libs/shared-types/package.json ./node_modules/@dailyshop/shared-types/package.json

# 6) Shared-utils’in derlenmiş dist’ini node_modules’a koy
RUN mkdir -p node_modules/@dailyshop/shared-utils
COPY --from=builder /app/libs/shared-utils/dist ./node_modules/@dailyshop/shared-utils/dist
COPY --from=builder /app/libs/shared-utils/package.json ./node_modules/@dailyshop/shared-utils/package.json

# 4) Entrypoint script'i kopyala ve çalıştırılabilir yap
COPY apps/services/product-service/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 4003
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node", "dist/src/main"]
