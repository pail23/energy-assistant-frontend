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

    ctx.textBaseline = 'middle';

    var text = options.text;
    var textX =
      chart.chartArea.left +
      Math.round((width - ctx.measureText(text).width) / 2);
    var textY = chart.chartArea.top + height / 2;
    ctx.fillText(text, textX, textY);

    ctx.restore();
  },
  defaults: {
    text: '4000 W',
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
        //backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
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
        text: formatNumberWithUnit(props.power, 'W'),
      },
    },
  };
});

ChartJS.register(ArcElement, Tooltip, Legend, Colors, doughnutLabel);

interface Props {
  devices: IDevice[];
  power: number;
}

const props = defineProps<Props>();
</script>
