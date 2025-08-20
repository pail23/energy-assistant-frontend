<template>
  <Bar :data="chartData" :options="options" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';
import type { IHomeMeasurementDate } from '@/api/types';
import { useI18n } from 'vue-i18n';

const { d } = useI18n();

const chartData = computed(() => {
  return {
    labels: props.data.map((measurement) =>
      d(new Date(measurement.measurement_date), {
        month: 'numeric',
        day: 'numeric',
      }),
    ),
    datasets: [
      {
        label: 'Solar Production',
        backgroundColor: '#fbbf24',
        data: props.data.map((measurement) => measurement.solar_produced_energy),
      },
      {
        label: 'Consumption',
        backgroundColor: '#2563eb',
        data: props.data.map((measurement) => measurement.consumed_energy),
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
  },
};

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface Props {
  data: IHomeMeasurementDate[];
}

const props = defineProps<Props>();
</script>
