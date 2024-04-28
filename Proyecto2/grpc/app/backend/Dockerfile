# Usar una imagen oficial de Node.js como imagen base
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de definición de paquetes y instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Exponer el puerto que utiliza la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]

