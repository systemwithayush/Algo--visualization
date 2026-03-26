import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceDashboard = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: { color: '#94a3b8' }
      },
    },
    scales: {
      y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
      x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } }
    }
  };

  const labels = ['10', '100', '1000', '5000', '10000'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Bubble Sort (O(n²))',
        data: [1, 10, 100, 2500, 10000],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
      },
      {
        label: 'Quick Sort (O(n log n))',
        data: [1, 5, 10, 20, 40],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
      },
      {
        label: 'Merge Sort (O(n log n))',
        data: [1, 4, 12, 22, 45],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  return (
    <div className="performance-dashboard grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div className="glass-card p-6">
        <h3 className="mb-4">Algorithm Time Complexity Comparison</h3>
        <Line options={options} data={data} />
      </div>
      <div className="glass-card p-6">
        <h3 className="mb-4">Space Complexity (Nodes/Memory)</h3>
        <Bar options={options} data={{
            labels: ['Bubble', 'Merge', 'Quick', 'Binary Search', 'BST'],
            datasets: [{
                label: 'Space Complexity',
                data: [1, 5, 3, 1, 4],
                backgroundColor: ['#ef4444', '#10b981', '#6366f1', '#fcd34d', '#a855f7'],
            }]
        }} />
      </div>
    </div>
  );
};

export default PerformanceDashboard;
