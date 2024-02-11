import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [foto, setFoto] = useState(null);
  const [fotos, setFotos] = useState([]);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);


  useEffect(() => {
    obtenerFotos();
    return () => {
      // Limpieza del stream de la cámara al desmontar el componente
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Activar la cámara del dispositivo
  const obtenerCamara = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error al acceder a la cámara web:", error);
      setError("No se pudo acceder a la cámara.");
    }
  };

  // calcular el tamaño de la base 
  function calcularTamanoBase64(base64String) {
    let padding, inBytes;
    if(base64String.endsWith("==")) padding = 2;
    else if (base64String.endsWith("=")) padding = 1;
    else padding = 0;
  
    inBytes = (base64String.length / 4) * 3 - padding;
    return inBytes;
  }
  
  // Capturar la foto desde la cámara y almacenarla en el estado
  const tomarFoto = () => {
    console.log("Tomando Fotografia")
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png'); // Obtiene la imagen en base64
    const base64ImageContent = imageDataUrl.split(",")[1]; // Elimina el prefijo data URL
    const imageSizeInBytes = calcularTamanoBase64(base64ImageContent);
  
    console.log("El tamaño de la imagen es de ${imageSizeInBytes} bytes.");
  
    // Aquí puedes decidir si quieres proceder con el envío basado en el tamaño
    if (imageSizeInBytes <= 5000000) {
      //console.log("Se envian los datos", imageDataUrl) // Por ejemplo, si quieres un límite de 5MB
      //console.log(imageSizeInBytes)
      setFoto(imageDataUrl);
    } else {
      setError("El tamaño de la imagen supera el límite permitido. Error Front");
      // Aquí puedes manejar cómo responder si la imagen es demasiado grande
    }
  };
  

  // Guardar la foto en el backend
  const guardarFoto = async () => {
    try {
      const respuesta = await fetch('http://localhost:5000/foto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagen: foto }), // `foto` ya es una cadena base64 aquí
      });
      if (!respuesta.ok) throw new Error('Respuesta de red no fue ok');
      console.log('Foto guardada con éxito');
      obtenerFotos(); // Recarga las fotos después de guardar
    } catch (error) {
      console.error("Error al guardar la foto Appjs:", error);
      setError("Error al guardar la foto. APPJS");
    }
  };
  
  // Obtener todas las fotos guardadas desde el backend
  const obtenerFotos = async () => {
    try {
      const response = await fetch('http://localhost:5000/fotos');
      const data = await response.json();
      setFotos(data);
    } catch (error) {
      console.error("Error al obtener las fotos: obtenerF", error);
      setError("Error al obtener las fotos.Obtener");
    }
  };



  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={obtenerCamara}>Activar Cámara</button>
      <video ref={videoRef} autoPlay style={{ display: 'none' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button onClick={tomarFoto}>Tomar Foto</button>
      <button onClick={guardarFoto}>Guardar Foto</button>
      {foto && <img src={foto} alt="Captura" style={{ margin: '10px' }} />}
      <div>
        <h2>Fotos Guardadas</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {fotos.map((foto, index) => (
            <img key={index} src={foto.imagen} alt={`Foto ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '10px' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
