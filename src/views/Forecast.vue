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
          <div>
            {{
              $t('consumption') +
              ': ' +
              formatNumberWithUnit(forecast?.consumed_energy, 'kWh')
            }}
          </div>
          <div>
            {{
              $t('home_card.solar_production') +
              ': ' +
              formatNumberWithUnit(forecast?.solar_energy, 'kWh')
            }}
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mb-4 p-4 rounded-lg elevation-6">
        <v-card-title>
          {{ $t('forecast.energy') }}
        </v-card-title>
        <v-card-text>
          <div class="h-96">
            <Line :data="data" :options="optionsEnergyChart" />
          </div>
        </v-card-text>
      </v-card>
      <v-card class="mb-4 p-4 rounded-lg elevation-6">
        <v-card-title>
          {{ $t('forecast.cost_profit') }}
        </v-card-title>
        <v-card-text>
          <div class="h-96">
            <Line :data="costProfitData" :options="optionsCostProfitChart" />
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
import { formatNumberWithUnit } from '@/utils';

const theme = useTheme();

const forecast = ref<IForecast>();

const currency = ref('');

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
          label: $t('forecast.cost_profit'),
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
  const totalCostProfit = forecast.value?.cost;

  if (totalCostProfit) {
    if (totalCostProfit < 0) {
      return (
        $t('forecast.total_cost') +
        ': ' +
        -totalCostProfit.toFixed(2) +
        ' ' +
        currency.value
      );
    } else {
      return (
        $t('forecast.total_profit') +
        ': ' +
        totalCostProfit.toFixed(2) +
        ' ' +
        currency.value
      );
    }
  } else {
    return 'unknown';
  }
});

const optionsEnergyChart = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      display: false,
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'W',
      },
    },
  },
};

const optionsCostProfitChart = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: currency.value,
        },
      },
    },
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
  const config = await api.getConfig();
  currency.value = config.home_assistant.currency;
  console.log(config.home_assistant);
});
</script>
