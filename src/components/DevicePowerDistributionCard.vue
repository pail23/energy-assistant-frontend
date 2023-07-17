<template>
  <div class="card m-4 h-80 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div v-for="device in devices" :key="device.device_id">
      {{ device.device_id }} {{ device.power }}
    </div>
    <Doughnut :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { IDevice } from '@/api/device';
import { api } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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
};

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  devices: IDevice[];
}

const props = defineProps<Props>();

const labels = computed(() => {
  return props.devices.map((device) => {
    return api.getDeviceInfo(device.device_id).name;
  });
});
</script>
