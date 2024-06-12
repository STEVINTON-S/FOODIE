import React, { useEffect, useState, useRef } from 'react';
import useFetch from '../../FetchData/useFetch';
import { Pie } from 'react-chartjs-2';
import { Alert } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import './admin.css'; // Import your CSS file

function AdminHome() {
  const { data: orders, error, isLoading } = useFetch(`http://localhost:8080/orders`);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Total Price',
        data: [],
        backgroundColor: [
          'rgba(255, 159, 64)',
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 99, 132)',
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const totalPriceByDate = new Map();

      orders.forEach(order => {
        const date = new Date(order.orderDate).toLocaleDateString();
        const totalPrice = order.totalPrice;

        if (totalPriceByDate.has(date)) {
          totalPriceByDate.set(date, totalPriceByDate.get(date) + totalPrice);
        } else {
          totalPriceByDate.set(date, totalPrice);
        }
      });

      setChartData({
        labels: Array.from(totalPriceByDate.keys()),
        datasets: [
          {
            label: 'Total Price',
            data: Array.from(totalPriceByDate.values()),
            backgroundColor: [
              'rgba(255, 159, 64)',
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 99, 132)',
            ],
            borderColor: [
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [orders]);

  useEffect(() => {
    if (!chartRef.current || !chartData) return;

    // Cleanup previous chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart instance (Pie chart)
    const newChartInstance = new Chart(chartRef.current, {
      type: 'pie',
      data: {
        labels: chartData.labels,
        datasets: chartData.datasets.map(dataset => ({
          ...dataset,
          hoverOffset: 4,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'left', // Position legend on the left side
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.raw) {
                  label += context.raw.toLocaleString();
                }
                return label;
              },
            },
          },
        },
      },
    });

    // Store new chart instance in ref
    chartInstance.current = newChartInstance;

    return () => {
      // Cleanup on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [chartData]);

  return (
    <div className="chart-container">
      <h1>Admin Dashboard</h1>
      {isLoading && <p>Loading...</p>}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <div className="chart-table">
        <div className="chart-labels">
          {chartData.labels.map((label, index) => (
            <div key={index} className="chart-label">
              {label}
            </div>
          ))}
        </div>
        <div className="chart-canvas">
          <canvas ref={chartRef} width="800" height="400" />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
