# Base image with pnpm and turbo
FROM node:24-alpine AS base
WORKDIR /repo
RUN npm install -g pnpm turbo
COPY package.json pnpm-lock.yaml turbo.json pnpm-workspace.yaml tsconfig.json ./
COPY apps ./apps
COPY libs ./libs
# Copy environment files if they exist
COPY .env* ./
RUN pnpm install --no-frozen-lockfile

# Build stage for a specific app
FROM base AS build
ARG APP
# Extract package name from path (e.g., apps/services/product-service -> product-service)
# Check if Prisma exists in the app and generate if it does
RUN APP_NAME=$(echo $APP | sed 's|.*/||') && \
    if [ -f "$APP/prisma/schema.prisma" ]; then \
      echo "Prisma schema found in $APP, generating client..." && \
      cd $APP && pnpm prisma generate && cd /repo; \
    fi && \
    pnpm turbo build --filter=$APP_NAME

# Production runtime
FROM node:24-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm
ARG APP
ARG BUILD_DIR=dist
ARG START_CMD="node dist/main.js"
COPY --from=build /repo/$APP/$BUILD_DIR ./$BUILD_DIR
COPY $APP/package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
# Copy workspace dependencies (shared libs)
COPY --from=build /repo/libs ./libs
COPY --from=build /repo/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --prod --no-frozen-lockfile
CMD sh -c "$START_CMD"
