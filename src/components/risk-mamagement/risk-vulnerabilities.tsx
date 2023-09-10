'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const,
    },
    title: {
      display: true,
      text: 'Risk Vulnerabilities',
    },
  },
};

const labels = ['Encryption Vulnerabilities', 'Excessive User Permissions', 'Dormant Accounts', 'Physical Security', 'Overly Trusting Employees'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Vulnerabilities',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(29, 78, 216)',
      backgroundColor: 'rgb(37, 99, 235)',
    },
  ],
};

export function RiskVulnerabilitiesChart() {
  return <Bar options={options} data={data} />;
}
