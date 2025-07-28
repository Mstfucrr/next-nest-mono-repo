# Builder asamasi: web uygulamasini derle
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Tum projeyi kopyala
COPY . .

RUN pnpm install --frozen-lockfile

# Web uygulamasini derle
RUN pnpm --filter web build

# -------------------------
# Calistirma asamasi
FROM node:20-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

COPY --from=builder /app/apps/web .
RUN pnpm install --prod --frozen-lockfile --filter web...

WORKDIR /app/apps/web
EXPOSE 3000

CMD ["pnpm", "start"]
