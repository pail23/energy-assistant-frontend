<template>
  <div>
    <v-toolbar color="transparent" :title="$t('app.forecast')" />
    <v-divider />
    <div class="v-full w-full justify-center p-4 bg-background">
      <v-card class="mb-4 p-4 rounded-lg elevation-6">
        <v-card-title>
          {{ $t('forecast.summary') }}
        </v-card-title>
        <v-card-text>
          <div>{{ costTotalProfitLabel }}</div>
        </v-card-text>
      </v-card>

      <v-card class="mb-4 p-4 rounded-lg elevation-6">
        <v-card-title>
          {{ $t('forecast.energy') }}
        </v-card-title>
        <v-card-text>
          <div class="h-96">
            <Line :data="data" :options="options" />
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mb-4 p-4 rounded-lg elevation-6">
        <v-card-title>
          {{ $t('forecast.cost_profit') }}
        </v-card-title>
        <v-card-text>
          <div class="h-96">
            <Line :data="costProfitData" :options="options" />
          </div>
        </v-card-text>
      </v-card>

    </div>
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
import { $t } from '@/plugins/i18n';
import { servicesVersion } from 'typescript';

//const { t } = useI18n();
const theme = useTheme();

const forecast = ref<IForecast>();

const colors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
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
    case 'pv_forecast':
      return theme.current.value.colors['sun'];
    case 'consumption':
      return theme.current.value.colors['grid'];
    case 'no_var_loads':
      return theme.current.value.colors['grid'];
    default:
      return null;
  }
}

function getDataSetLabel(name: string) {
  switch (name) {
    case 'pv':
      return $t('forecast.pv');
    case 'pv_forecast':
      return $t('forecast.pv_forecast');
    case 'consumption':
      return $t('forecast.consumption');
    case 'no_var_loads':
      return $t('forecast.no_var_loads');
    default:
      return api.getDeviceInfo(name).name;
  }
}

function getDataSets(forecast: IForecast) {
  if (forecast && forecast.series) {
    let colorIterator = new ColorIterator();
    return forecast.series
      .filter((serie) => serie.name != 'cost_profit')
      .map((serie) => {
        if (serie.name == 'pv' || serie.name == 'no_var_loads') {
          let color = getDataSetColor(serie.name);
          return {
            label: getDataSetLabel(serie.name),
            data: serie.data,
            fill: false,
            backgroundColor: color,
            borderColor: color,
            borderDash: [5, 5],
            borderWidth: 2,
            pointStyle: false,
          };
        } else {
          if (serie.name == 'pv_forecast' || serie.name == 'consumption') {
            let color = getDataSetColor(serie.name);
            return {
              label: getDataSetLabel(serie.name),
              data: serie.data,
              fill: false,
              backgroundColor: color,
              borderColor: color,
              borderWidth: 2,
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
              borderWidth: 2,
              pointStyle: false,
            };
          }
        }
      });
  }

  return [];
}

function getCostProfitDataSets(forecast: IForecast) {
  if (forecast && forecast.series) {
    let colorIterator = new ColorIterator();
    return forecast.series
      .filter((serie) => serie.name == 'cost_profit')
      .map((serie) => {
        const color = 'blue';
        return {
          label: 'Cost / Profit',
          data: serie.data,
          fill: false,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2,
          pointStyle: false,
          stepped: true,
        };
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

const costProfitData = computed(() => {
  return {
    labels: forecast.value?.time.map((t) =>
      new Date(t).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    ),
    datasets: getCostProfitDataSets(forecast.value),
  };
});

const costTotalProfitLabel = computed(() => {
  const profitSerie = forecast.value?.series.filter(
    (serie) => serie.name == 'cost_profit',
  )[0].data;

  const totalCostProfit = profitSerie?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  if (totalCostProfit) {
    if (totalCostProfit < 0) {
      return $t('forecast.total_cost') + ': ' + -totalCostProfit.toFixed(2);
    } else {
      return $t('forecast.total_profit') + ': ' + totalCostProfit.toFixed(2);
    }
  } else {
    return 'unknown';
  }
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
