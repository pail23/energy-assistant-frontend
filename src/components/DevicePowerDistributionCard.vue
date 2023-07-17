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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (item) => `${formatNumberWithUnit(item.parsed, 'W')}`,
      },
    },
  },
};

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

interface Props {
  devices: IDevice[];
}

const props = defineProps<Props>();
</script>
