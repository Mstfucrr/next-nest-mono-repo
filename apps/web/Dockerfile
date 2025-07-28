# Stage 1: Install dependencies and build
FROM node:18 AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY libs libs

RUN pnpm install --frozen-lockfile

COPY apps/web apps/web

RUN pnpm --filter web build

# Stage 2
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/web/.next apps/web/.next
COPY --from=builder /app/apps/web/public apps/web/public
COPY --from=builder /app/node_modules ./node_modules
COPY apps/web/package.json apps/web/package.json

EXPOSE 3000
CMD ["pnpm", "--filter", "web", "start"]
