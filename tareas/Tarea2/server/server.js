// Server Side 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();



// Permite todas las solicitudes CORS solo para el origen especificado
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'], // Permite múltiples orígenes
  optionsSuccessStatus: 200 // Para navegadores legacy
};



app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb' }))

// Establecer limites de seguridad
//app.use(express.bodyParser({limit: '100mb'}));cha

// Conectar a MongoDB
mongoose.connect('mongodb://mongo/mydb', { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log("Conexion a base de datos exitosa a", db.connection.host))
.catch(err => console.error("Error al conectar a la base de datos", err));

// Definir el esquema y el modelo de Mongoose
const FotoSchema = new mongoose.Schema({
  imagen: String,
  fechaCarga: {
    type: Date,
    default: Date.now // Guarda automáticamente la fecha de carga
  }
});

// Agregamos el modelo general de MongoDB 
const Foto = mongoose.model('Foto', FotoSchema);

// Rutas
app.post('/foto', cors(), async (req, res) => {
  try {
    // finalmente podemos crear una cosa 
    const nuevaFoto = new Foto({ imagen: req.body.imagen });
    console.log("Tratando de guardar")
    await nuevaFoto.save();
    // tal vez es aqui el error 
    console.log("Se ha guardado nueva fotografia")
    res.status(201).send('Foto guardada');
  } catch (error) {
    console.log("Errro al guardar la foto")
    console.error("Error al guardar la foto: ", error);
    res.status(500).send('Error al guardar la foto');
  }
});

app.get('/fotos', cors(),  async (req, res) => {
  try {
    console.log("REQUESTTTTT AAAAAAAAAAAAAAA")
    const fotos = await Foto.find();
    res.json(fotos);
  } catch (error) {
    console.log("Error al guardar la foto")
    console.error("Error al obtener las fotos desde server: ", error);
    res.status(500).send('Error al obtener las fotos');
  }
});

app.get('/fotos/filtradas', async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;

  try {
    const query = {
      fechaCarga: {
        $gte: new Date(fechaInicio),
        $lte: new Date(fechaFin)
      }
    };

    const fotosFiltradas = await Foto.find(query);
    res.json(fotosFiltradas);
  } catch (error) {
    console.error("Error al obtener fotos filtradas: ", error);
    res.status(500).send('Error al obtener fotos filtradas');
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

