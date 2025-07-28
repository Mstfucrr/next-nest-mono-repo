# Stage 1: Install dependencies and build
FROM node:18 AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/services/auth-service/package.json apps/services/auth-service/
COPY libs libs

RUN pnpm install --frozen-lockfile

COPY apps/services/auth-service apps/services/auth-service

# Build shared libraries first
RUN pnpm --filter @dailyshop/shared-utils build
RUN pnpm --filter @dailyshop/shared-types build


RUN pnpm --filter auth-service build

# Stage 2
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/services/auth-service/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4001
CMD ["node", "dist/main"]
