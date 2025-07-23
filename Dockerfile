# Dockerfile para Next.js

# Etapa 1: Instalación de dependencias y construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y package-lock.json
# Esta línea ha sido modificada para usar package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
# Se asume que usas npm con package-lock.json, por lo que usaremos npm ci
RUN npm ci

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# Etapa 2: Imagen de producción ligera
FROM node:18-alpine

WORKDIR /app

# Copiar solo los archivos necesarios de la etapa de construcción
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Exponer el puerto por defecto de Next.js en producción
EXPOSE 3000

# Comando para iniciar la aplicación Next.js en producción
# Se asume que usas npm con package-lock.json, por lo que usaremos npm start
CMD ["npm", "start"]