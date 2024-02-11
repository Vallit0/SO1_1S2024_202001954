# server/Dockerfile
FROM node:alpine
RUN mkdir -p /app 
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# El puerto 5000 fue designado para el servidor y el 3000 para client
EXPOSE 5000
CMD ["node", "server.js"]
