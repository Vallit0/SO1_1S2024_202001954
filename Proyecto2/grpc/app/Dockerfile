# Establecer una imagen base
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dependencias del frontend
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Construir el frontend
COPY frontend/ ./frontend/
RUN cd frontend && npm run build

# Instalar dependencias del backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copiar el resto del código del backend
COPY backend/ ./backend/

# Exponer el puerto que el servidor Express usará
EXPOSE 5000

# Comando para iniciar el servidor Express
CMD ["node", "./backend/app.js"]

