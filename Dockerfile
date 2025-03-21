# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app

# Copy lock file + install bun + deps
COPY package.json bun.lock ./
RUN npm install -g bun && bun install

# Copy source code
COPY . .

# 👉 Generate Prisma client
RUN bunx prisma generate

# Build Next.js app
RUN bun run build

# Stage 2: Run server
FROM node:22-alpine
WORKDIR /app

# Cài lại Bun
RUN npm install -g bun

# Copy toàn bộ app đã build
COPY --from=builder /app ./

# Expose port
EXPOSE 3000

# Start server
CMD ["bun", "start"]