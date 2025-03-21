# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Copy file lock + install bun + deps
COPY package.json bun.lock ./
RUN npm install -g bun && bun install

# Copy source code
COPY . .

# Build app
RUN bun run build

# Stage 2: Run server
FROM node:22-alpine
WORKDIR /app

# Cài lại Bun để chạy
RUN npm install -g bun

# Copy app đã build
COPY --from=builder /app ./

# Cổng mặc định
EXPOSE 3000

# Chạy Next.js server (SSR)
CMD ["bun", "start"]