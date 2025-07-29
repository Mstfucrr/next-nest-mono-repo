# Stage 1: Install dependencies and build
FROM node:24.4.1 AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/services/user-service/package.json apps/services/user-service/
COPY tsconfig.json tsconfig.json
COPY libs libs

RUN pnpm install --frozen-lockfile

COPY apps/services/user-service apps/services/user-service

# Build shared libraries first
RUN pnpm --filter @dailyshop/shared-utils build
RUN pnpm --filter @dailyshop/shared-types build


RUN pnpm --filter user-service build

# Stage 2
FROM node:24.4.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/services/user-service/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4002
CMD ["node", "dist/main"]
