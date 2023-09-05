<template>
  <div class="v-full flex min-h-screen justify-center p-4 bg-background">
    <Line :data="data" :options="options" />
  </div>
</template>

<script lang="ts" setup>
// @ts-nocheck
import { computed, ref, onMounted } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { IForecast, api } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';

const { t } = useI18n();
const theme = useTheme();

const forecast = ref<IForecast>();

const data = computed(() => {
  return {
    labels: forecast.value?.time.map((t) =>
      new Date(t).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    ),
    datasets: [
      {
        label: t('forecast.pv'),
        backgroundColor: theme.current.value.colors['sun'],
        data: forecast.value?.series['pv'],
      },
      {
        label: t('forecast.consumption'),
        backgroundColor: theme.current.value.colors['grid'],
        data: forecast.value?.series['load'],
      },
    ],
  };
});

const options = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
  };
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

onMounted(async () => {
  forecast.value = await api.getForecast();
});
</script>
