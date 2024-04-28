const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// URL de conexión a MongoDB
const uri = "mongodb://34.66.15.67:30245"; // Modificado para usar el puerto mapeado por el LoadBalancer
const client = new MongoClient(uri);

app.get('/latest-records', async (req, res) => {
  try {
    await client.connect();
    const database = client.db("testdb");
    const records = database.collection("records");
    // Consulta para obtener los últimos 20 registros
    const query = {};
    const options = {
      sort: { _id: -1 },
      limit: 20
    };
    const result = await records.find(query, options).toArray();
    console.log(result); // Línea añadida para mostrar los registros en la consola
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

