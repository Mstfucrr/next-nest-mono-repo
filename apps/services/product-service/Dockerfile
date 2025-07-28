# Stage 1: Install dependencies and build
FROM node:18 AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/services/product-service/package.json apps/services/product-service/
COPY libs libs

RUN pnpm install --frozen-lockfile

COPY apps/services/product-service apps/services/product-service

RUN pnpm --filter product-service build

# Stage 2
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/services/product-service/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4003
CMD ["node", "dist/main"]
