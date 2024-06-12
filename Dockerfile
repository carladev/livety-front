# Usa la imagen oficial de Node.js
FROM node:18.18-alpine AS build

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia el código del proyecto al contenedor
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Compila la aplicación Angular
RUN npm run build

# Usa una imagen de nginx para servir la aplicación
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos compilados al directorio de nginx
COPY --from=build /app/dist/livety-front/browser /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]
