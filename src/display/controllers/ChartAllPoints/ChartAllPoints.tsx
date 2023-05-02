/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

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

interface ChartAllPointsProps {
  cumFreq: number[];
}
const ChartAllPoints = ({ cumFreq = [2, 3, 5, 4, 1] }: ChartAllPointsProps) => {
  const { t } = useTranslation();

  const options = {
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
          color: '#3e435a',
          text: t('subHeaders.score'),
          font: {
            size: 16,
          },
        },
      },
      x: {
        border: {
          display: false,
        },
        ticks: {
          color: '#3e435a',
          font: {
            size: 14,
          },
          callback: function (value: number) {
            if (value % 1 === 0) {
              return value;
            }
          },
        },
      },
    },
  };
  const labels = ['-20', '20+', '30+', '40+', '50'];
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
