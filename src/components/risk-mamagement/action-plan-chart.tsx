'use client'

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['critical risk', 'high risk', 'medium resk', 'low resk'],
  datasets: [
    {
      label: '# percentage',
      data: [3, 30.9, 58.6, 8],
      backgroundColor: [
        'rgba(96, 165, 250, 0.2)',
        'rgba(59, 130, 246, 0.2)',
        'rgb(37, 99, 235, 0.2)',
        'rgb(29, 78, 216, 0.2)',
      ],
      borderColor: [
        'rgba(96, 165, 250, 0.2)',
        'rgba(59, 130, 246, 0.2)',
        'rgb(37, 99, 235, 0.2)',
        'rgb(29, 78, 216, 0.2)',
      ],
      borderWidth: 1,
    },
  ],
};

export function ActionPlanChart() {
  return <Pie data={data} />;
}