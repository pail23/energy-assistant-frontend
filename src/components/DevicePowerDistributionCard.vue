<template>
  <v-card class="elevation-2 ma-4 pa-4 card-fixed-width">
    <v-card-text>
      <Doughnut :data="data" :options="options" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { computed } from 'vue';
import { api } from '@/api';
import type { IDevice } from '@/api/types';
import { formatNumberWithUnit } from '@/utils';
import { useTheme } from 'vuetify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';


const fontBold: 'number' | 'bold' | 'normal' | 'bolder' | 'lighter' | 'undefined' = 'bold';

const theme = useTheme();


const data = computed(() => {
  const devices = props.devices.filter((device) => device.power > 0);
  return {
    labels: devices.map((device) => api.getDeviceInfo(device.device_id).name),
    datasets: [
      {
        data: devices.map((device) => device.power),
      },
    ],
  };
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: theme.current.value.colors['on-surface'],
        },
      },
      tooltip: {
        callbacks: {
          label: (item) => `${formatNumberWithUnit(item.parsed, 'W')}`,
        },
      },
      annotation: {
        annotations: {
          dLabel: {
            type: 'doughnutLabel',
            content: ({ chart }) => 
            [formatNumberWithUnit(props.power, 'W'), props.selfSufficiency.toFixed(0) + '%'],
            font: [{ size: 30 }, { size: 20 }],
            color: ['black', 'black']
          }
        }
      },

      datalabels: {
        backgroundColor: function (context) {
          return context.dataset.backgroundColor;
        },
        borderColor: 'white',
        borderRadius: 25,
        borderWidth: 2,
        color: 'white',
        display: function (context) {
          var dataset = context.dataset;
          const sum = dataset.data.reduce((partialSum, a) => partialSum + a, 0);
          var value = dataset.data[context.dataIndex];
          return value > sum / 10;
        },
        font: {
          weight: fontBold,
        },
        padding: 6,
        formatter: Math.round,
      },
    },
  };
});

ChartJS.register(ArcElement, Tooltip, Legend, Colors, annotationPlugin, ChartDataLabels);

interface Props {
  devices: IDevice[];
  power: number;
  selfSufficiency: number;
}

const props = defineProps<Props>();
</script>
