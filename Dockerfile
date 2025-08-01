# Base image with pnpm and turbo
FROM node:20-alpine AS base
WORKDIR /repo
RUN npm install -g pnpm turbo
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps ./apps
COPY libs ./libs
RUN pnpm install --frozen-lockfile

# Build stage for a specific app
FROM base AS build
ARG APP
RUN pnpm turbo build --filter=$APP

# Production runtime
FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm
ARG APP
ARG BUILD_DIR=dist
ARG START_CMD="node dist/main.js"
COPY --from=build /repo/$APP/$BUILD_DIR ./$BUILD_DIR
COPY $APP/package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --prod --frozen-lockfile
CMD sh -c "$START_CMD"
