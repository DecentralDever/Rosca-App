import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);

const ContributionChart = ({ data }) => {
  const chartData = {
    labels: data.map(entry => entry.date),
    datasets: [
      {
        label: 'Contributions',
        data: data.map(entry => entry.amount),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contribution History</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ContributionChart;
