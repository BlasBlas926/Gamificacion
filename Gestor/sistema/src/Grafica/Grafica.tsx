import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, ChartData, TooltipItem } from 'chart.js';
import { IJuego } from '../Juegos/IJuego';
import { CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import Navbar from '../Shared/Navbar';
import ContextApp from '../Models/Contexto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);
Chart.register(ChartDataLabels);

const Grafica: React.FC = () => {
    const { id, nombre, apellidoMaterno, apellidoPaterno } = useContext(ContextApp);
    const [chartData, setChartData] = useState({
        labels: [] as string[],
        datasets: [{
            data: [] as number[],
            backgroundColor: [] as string[],
            borderWidth: 2,
        }],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = `https://localhost:7034/Juegos/Usuario/${id}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data: IJuego[]) => {
                const nombres = data.map((item) => item.nombre);
                const porcentajes = data.map((item) => item.porcentaje);
                const colores = porcentajes.map(() => getRandomColor());

                setChartData({
                    labels: nombres,
                    datasets: [{
                        data: porcentajes.filter((porcentaje) => porcentaje !== undefined) as number[],
                        backgroundColor: colores.filter((color) => color !== undefined) as string[],
                        borderWidth: 2,
                    }],
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error al obtener los datos de la API:', error);
                setLoading(false);
            });
    }, [id]);

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.7)`;
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Porcentajes de juegos completados',
                font: { size: 24, weight: 'bold' },
            },
            legend: {
                display: true,
                position: 'top' as const,
                labels: {
                    font: { size: 16 },
                },
            },
        },
        datalabels: {
            color: '#00000',
            display: function (context: any) {
                return context.dataset.data[context.dataIndex] > 60;
            },
            font: {
                weight: 'bold',
            },
            formatter: function (value: number, context: any) {
                return context.chart.data.labels[context.dataIndex];
            },
            align: 'end' as const,
            anchor: 'end' as const,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Juegos',
                    font: { size: 18, weight: 'bold' },
                },
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 12 },
                    maxRotation: 45,  // Rotación máxima en grados
                    minRotation: 45,   // Rotación mínima en grados
                    autoSkip: false // Evita que se superpongan las etiquetas
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Porcentaje (%)',
                    font: { size: 13, weight: 'bold' },
                },
                ticks: {
                    font: { size: 14 },
                },
            }
        },
        elements: {
            bar: {
                borderWidth: 2,
                barPercentage: 0.7, // Ajusta según tus necesidades
                categoryPercentage: 0.8, // Ajusta según tus necesidades
                borderSkipped: 'start' as const,
            },
        },
        animation: {
            duration: 1500,
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem: TooltipItem<'bar'>, data: ChartData<'bar'>) {
                    const label = data.labels![tooltipItem.dataIndex] as string || '';
                    const dataset = data.datasets![tooltipItem.datasetIndex!];
                    const value = dataset.data[tooltipItem.dataIndex] as number;
                    return `${label}: ${value}%`;
                },
            },
        },
    };

    return (

        <>
            <Navbar />
            <div className="container white-bg">
                <h1 style={{ textAlign: 'center', marginBottom: 15 }}>Gráfica de porcentajes de juegos</h1>
                <p style={{ textAlign: 'center' }}>Para ver la gráfica, debes completar al menos un juego.</p>
                <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', margin: '10px 0' }}>{`${nombre} ${apellidoPaterno} ${apellidoMaterno}`}</p>
                {loading ? (
                    <div style={{ textAlign: 'center', fontSize: 20, marginTop: 20 }}>Cargando...</div>
                ) : (
                    <>
                        {chartData.labels.length > 0 ? (
                            <div style={{ width: '100%', overflowX: 'scroll' }}>
                                <div style={{ minWidth: '1500px' }}>
                                    <Bar data={chartData} options={options} />
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', fontSize: 80, marginTop: 80 }}>Sin gráfica</div>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Grafica;
