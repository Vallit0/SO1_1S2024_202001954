
import './App.css';
import { ObtenerMemoriaRAM } from "../wailsjs/go/main/App";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// declaramos algunas cositas por aqui 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



  // Importaciones de Chart.js...

const MemoriaRAM = () => {
    const [datosMemoria, setDatosMemoria] = useState({
        labels: [],
        datasets: [
            {
                label: 'Memoria Usada (%)',
                data: [],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                label: 'Memoria Libre (%)',
                data: [],
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1
            }
        ]
    });

    const obtenerDatosMemoria = async () => {
        try {
            const memoria = await ObtenerMemoriaRAM();
            const memoriaObj = JSON.parse(memoria); // Asegúrate de que esto coincide con el formato devuelto
            const total = memoriaObj.usado + memoriaObj.libre;
            const usadoPorcentaje = (memoriaObj.usado / total) * 100;
            const librePorcentaje = (memoriaObj.libre / total) * 100;

            // Añadir nuevos datos y mantener solo los últimos N datos para que el gráfico sea manejable
            const maxDatos = 20;
            const newLabels = [...datosMemoria.labels, new Date().toLocaleTimeString()].slice(-maxDatos);
            const newDataUsado = [...datosMemoria.datasets[0].data, usadoPorcentaje].slice(-maxDatos);
            const newDataLibre = [...datosMemoria.datasets[1].data, librePorcentaje].slice(-maxDatos);

            setDatosMemoria({
                ...datosMemoria,
                labels: newLabels,
                datasets: [
                    { ...datosMemoria.datasets[0], data: newDataUsado },
                    { ...datosMemoria.datasets[1], data: newDataLibre }
                ]
            });

        } catch (error) {
            console.error("Error al obtener datos de memoria RAM: ", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            obtenerDatosMemoria();
        }, 500); // Actualizar cada 500 ms

        return () => clearInterval(interval);
    }, [datosMemoria]);

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 100 // Asumiendo que el porcentaje no puede ser mayor a 100%
            }
        }
    };

    return <Line data={datosMemoria} options={options} />;
};


  
  




function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e) => setName(e.target.value);
    const updateResultText = (result) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <div id="App">
            <MemoriaRAM />
        </div>
    )
}

export default App
