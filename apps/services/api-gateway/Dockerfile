# Stage 1: Install dependencies and build
FROM node:24.4.1 AS builder
WORKDIR /app

# Install pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package definitions
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/services/api-gateway/package.json apps/services/api-gateway/
COPY tsconfig.json tsconfig.json
COPY libs libs

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source
COPY apps/services/api-gateway apps/services/api-gateway

# Build shared libraries first
RUN pnpm --filter @dailyshop/shared-utils build
RUN pnpm --filter @dailyshop/shared-types build

# Build the service
RUN pnpm --filter api-gateway build

# Stage 2: Prepare production image
FROM node:24.4.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy built files and dependencies
COPY --from=builder /app/apps/services/api-gateway/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4000
CMD ["node", "dist/main"]
