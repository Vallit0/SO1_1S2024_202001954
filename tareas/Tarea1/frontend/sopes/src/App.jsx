import React, { useState } from 'react';

function App() {
  const [studentData, setStudentData] = useState({ carnet: '', name: '' });

  const fetchStudentData = () => {
    fetch('http://localhost:8080/data')
      .then(response => response.json())
      .then(data => setStudentData(data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%', // Asegurarse de que el contenedor se extienda a todo lo ancho
    textAlign: 'center' // Centrar texto dentro de cada elemento
  };

  return (
    <div style={containerStyle}>
      <h2>Universidad de San Carlos de Guatemala</h2>
      <h2>Facultad de Ingenieria</h2>
      <h2>Escuela de Ciencias y Sistemas</h2>
      <h2>Sistemas Operativos 1</h2>

      <p>Carnet: {studentData.carnet}</p>
      <p>Nombre: {studentData.name}</p>
      <button onClick={fetchStudentData}>Fetch Student Data</button>
    </div>
  );
}

export default App;
