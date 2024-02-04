import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Profits',
      data: [483, 469, 234, 325, 146, 325, 349, 249, 110],
      borderColor: 'rgb(86, 188, 241)',
      backgroundColor: 'rgba(86, 188, 241, 0.1)',
      lineTension: 0.3
    },
    {
      label: 'Expenses',
      data: [100, 420, 210, 312, 223, 415, 551, 577, 385],
      borderColor: 'rgb(105, 95, 241)',
      backgroundColor: 'rgba(105, 95, 241, 0.1)',
      lineTension: 0.3
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
