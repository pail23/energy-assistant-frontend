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
import { Line, Bar } from 'vue-chartjs';
import { IForecast, api } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';
import { color } from 'chart.js/helpers';
import { Result } from 'postcss';

const { t } = useI18n();
const theme = useTheme();

const forecast = ref<IForecast>();

const colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'organe',
  'deep-orange',
  'brown',
  'blue-grey',
];

class ColorIterator {
  private index = 0;
  public getNextColor(): string {
    const result = colors[this.index++];
    if (this.index >= colors.length) {
      this.index = 0;
    }
    return result;
  }
}

function getDataSetColor(name: string) {
  switch (name) {
    case 'pv':
      return theme.current.value.colors['sun'];
    case 'consumption':
      return theme.current.value.colors['grid'];
    default:
      return null;
  }
}

function getDataSetLabel(name: string) {
  switch (name) {
    case 'pv':
      return t('forecast.pv');
    case 'consumption':
      return t('forecast.consumption');
    default:
      return api.getDeviceInfo(name).name;
  }
}

function getDataSets(forecast: IForecast) {
  if (forecast && forecast.series) {
    let colorIterator = new ColorIterator();
    return forecast.series.map((serie) => {
      if (serie.name == 'pv' || serie.name == 'consumption') {
        let color = getDataSetColor(serie.name);
        return {
          label: getDataSetLabel(serie.name),
          data: serie.data,
          fill: false,
          backgroundColor: color,
          borderColor: color,
          pointStyle: false,
        };
      } else {
        let color = colorIterator.getNextColor();
        return {
          label: getDataSetLabel(serie.name),
          data: serie.data,
          fill: false,
          backgroundColor: color,
          borderColor: color,
          stepped: true,
          pointStyle: false,
        };
      }
    });
  }

  return [];
}

const data = computed(() => {
  return {
    labels: forecast.value?.time.map((t) =>
      new Date(t).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    ),
    datasets: getDataSets(forecast.value),
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