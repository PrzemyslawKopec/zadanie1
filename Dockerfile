FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production

FROM node:20-slim

LABEL org.opencontainers.image.authors="Przemyslaw Kopec"
LABEL org.opencontainers.image.title="weather-app"
LABEL org.opencontainers.image.description="Aplikacja pogodowa"
LABEL org.opencontainers.image.version="1.0"

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY index.js .

RUN apt-get update && apt-get install -y curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

CMD ["node", "index.js"]
