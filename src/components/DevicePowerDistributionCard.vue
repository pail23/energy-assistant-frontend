<template>
  <div class="card m-4 h-80 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IDevice } from '@/api/device';
import { api } from '@/api/energyAssistant.api';
import { formatNumberWithUnit } from '@/utils';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';

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
    ctx.font = '1.25em sans-serif';
    ctx.color = options.color;
    const linespacing = 1.5;

    ctx.textBaseline = 'top';
    let textHeight = 0;
    for (let i = 0; i < options.text.length; i++) {
      const text = options.text[i];
      const metrics: TextMetrics = ctx.measureText(text);
      textHeight +=
        (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) *
        linespacing;
    }
    let currentY = chart.chartArea.top + (height - textHeight) / 2;
    for (let i = 0; i < options.text.length; i++) {
      const text = options.text[i];
      const metrics: TextMetrics = ctx.measureText(text);
      const textX =
        chart.chartArea.left + Math.round((width - metrics.width) / 2);
      ctx.fillText(text, textX, currentY);
      currentY +=
        (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) *
        linespacing;
    }

    ctx.restore();
  },
  defaults: {
    text: [],
    color: 0,
  },
};

const data = computed(() => {
  return {
    labels: props.devices.map(
      (device) => api.getDeviceInfo(device.device_id).name,
    ),
    datasets: [
      {
        data: props.devices.map((device) => device.power),
      },
    ],
  };
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (item) => `${formatNumberWithUnit(item.parsed, 'W')}`,
        },
      },
      doughnutlabel: {
        text: [
          formatNumberWithUnit(props.power, 'W'),
          props.selfSufficiency.toFixed(0) + '%',
        ],
      },
    },
  };
});

ChartJS.register(ArcElement, Tooltip, Legend, Colors, doughnutLabel);

interface Props {
  devices: IDevice[];
  power: number;
  selfSufficiency: number;
}

const props = defineProps<Props>();
</script>
