# 1. Definimos la imagen base ligera de Node.js
FROM node:20-alpine

# 2. Seteamos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los descriptores de dependencias primero para aprovechar el almacenamiento en caché de capas
COPY package*.json ./

# 4. Instalamos únicamente dependencias de producción de forma limpia
RUN npm ci --only=production

# 5. Copiamos el resto de los archivos fuentes de la aplicación
COPY . .

# 6. Exponemos el puerto de escucha definido en nuestra arquitectura
EXPOSE 8080

# 7. Seteamos por defecto el entorno productivo
ENV NODE_ENV=production

# 8. Comando principal de arranque
CMD ["npm", "start"]
