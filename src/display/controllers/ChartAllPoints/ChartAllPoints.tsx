/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from 'react-chartjs-2';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
      borderRadius: 8,
    },
  },
  maintainAspectRatio: false,
  responsive: true,

  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      reverse: true,
      border: {
        width: 3,
        color: '#3e435a',
      },
      grid: {
        display: false,
      },
      ticks: {
        color: '#3e435a',
        font: {
          size: 14,
        },
      },
      title: {
        display: true,
        text: 'scór',
        font: {
          size: 16,
        },
      },
    },
    x: {
      border: {
        display: false,
      },
    },
  },
};
interface ChartAllPointsProps {
  cumFreq: number[];
}
const ChartAllPoints = ({ cumFreq = [2, 3, 5, 4, 6, 8, 1] }: ChartAllPointsProps) => {
  const labels = ['-50', '50+', '60+', '70+', '80+', '90+'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: cumFreq,
        backgroundColor: '#5692d2',
        borderColor: '#3e435a',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ChartAllPoints;
