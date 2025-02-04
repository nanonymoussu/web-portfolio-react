# Install package dependencies files first for better caching
FROM oven/bun:1-alpine AS base
WORKDIR /app
COPY package.json ./
RUN bun install && \
    rm -rf ~/.bun/install/cache

# Copy the rest of the application files
COPY public/ ./public/
COPY src/ ./src/
COPY index.html vite.config.js tailwind.config.js postcss.config.js ./

# Start development server on port 5173
FROM base AS development
EXPOSE 5173
CMD ["bun", "run", "dev", "--host"]

# Build the webpage for production
FROM base AS builder
RUN bun run build

# Start production server using Nginx on port 80
FROM nginx:stable-alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]