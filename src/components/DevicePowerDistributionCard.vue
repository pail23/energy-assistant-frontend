<template>
  <v-card class="rounded-md elevation-2 ma-4 w-80 pa-4 sm:w-96">
    <v-card-text>
      <Doughnut :data="data" :options="options" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { computed } from 'vue';
import { IDevice } from '@/api/device';
import { api } from '@/api/energyAssistant.api';
import { formatNumberWithUnit } from '@/utils';
import { useTheme } from 'vuetify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const fontBold: 'number' | 'bold' | 'normal' | 'bolder' | 'lighter' | 'undefined' = 'bold';

const theme = useTheme();

const doughnutLabel = {
  id: 'doughnutlabel',
  beforeDraw: (chart, _args, options) => {
    const { ctx } = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';

    var width = chart.chartArea.width;
    var height = chart.chartArea.height;

    // var fontSize = (height / 114).toFixed(2);
    // ctx.font = fontSize + 'em sans-serif';
    ctx.font = '1.2em sans-serif';
    ctx.fillStyle = options.color;
    const linespacing = 2;

    ctx.textBaseline = 'top';
    let textHeight = 0;
    for (let i = 0; i < options.text.length; i++) {
      const text = options.text[i];
      const metrics: TextMetrics = ctx.measureText(text);
      textHeight += (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) * linespacing;
    }
    let currentY = chart.chartArea.top + (height - textHeight) / 2;
    for (let i = 0; i < options.text.length; i++) {
      const text = options.text[i];
      const metrics: TextMetrics = ctx.measureText(text);
      const textX = chart.chartArea.left + Math.round((width - metrics.width) / 2);
      ctx.fillText(text, textX, currentY);
      currentY += (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) * linespacing;
    }

    ctx.restore();
  },
  defaults: {
    text: [],
    color: 'black',
  },
};

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
      doughnutlabel: {
        color: theme.current.value.colors['on-surface'],
        text: [formatNumberWithUnit(props.power, 'W'), props.selfSufficiency.toFixed(0) + '%'],
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

ChartJS.register(ArcElement, Tooltip, Legend, Colors, doughnutLabel, ChartDataLabels);

interface Props {
  devices: IDevice[];
  power: number;
  selfSufficiency: number;
}

const props = defineProps<Props>();
</script>
