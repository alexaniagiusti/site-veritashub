# ---------- Stage 1: build ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Instala dependências primeiro para aproveitar o cache de camadas do Docker
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do código e gera o bundle de produção
COPY . .
RUN npm run build

# ---------- Stage 2: runtime ----------
FROM nginx:1.27-alpine AS runner

# Configuração do Nginx (SPA fallback, gzip, cache de assets)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Artefatos estáticos gerados pelo Vite
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --spider -q http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
