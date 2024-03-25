const express = require('express');
const redis = require('redis');

const app = express();
const port = 3000; // Puerto en el que escuchará el servidor Express

// Cliente de Redis
const redisClient = redis.createClient({
    socket: {
        host: '10.98.34.133', // Reemplaza con tu Endpoint de Redis
        port: 6379 // Puerto estándar de Redis
    }
});                                      
// Conectar al cliente de Redis
redisClient.connect();

// Manejo de errores del cliente de Redis
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Ruta para publicar mensajes
app.get('/publish', async (req, res) => {
    try {
        console.log("Recibida petición para publicar mensaje"); // Registro de la petición recibida
        await redisClient.publish('test', JSON.stringify({ msg: "hola a todos" }));
        console.log("Mensaje publicado con éxito"); // Confirmación de la publicación
        res.send('Mensaje publicado');
    } catch (error) {
        console.error('Error al publicar mensaje:', error);
        res.status(500).send('Error al conectar con Redis');
    }
});

// Iniciar el servidor Express
app.listen(port, () => {
    console.log(`Publicador escuchando en http://localhost:${port}`);
});
