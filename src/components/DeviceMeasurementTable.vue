<template>
  <v-card class="rounded-lg elevation-2">
    <v-table class="m-4 rounded-lg border">
      <thead class="bg-primary">
        <tr>
          <th class="w-24 px-6 py-3">{{ t('raw_data.date') }}</th>
          <th class="w-36 px-6 py-3">
            {{ t('consumed_solar_energy') }}
          </th>
          <th class="w-36 px-6 py-3">{{ t('consumed_energy') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(measurement, index) in deviceMeasurements"
          :key="measurement.id"
          class="border-b text-center"
        >
          <td class="px-6 py-4">
            {{ d(new Date(measurement.measurement_date)) }}
          </td>
          <td class="px-6 py-4">
            <p v-if="index < deviceMeasurements.length - 1">
              {{
                formatNumberWithUnit(
                  measurement.solar_consumed_energy -
                    deviceMeasurements[index + 1].solar_consumed_energy,
                  'kWh',
                )
              }}
            </p>
            <p v-if="showMeterValues">
              {{
                formatNumberWithUnit(measurement.solar_consumed_energy, 'kWh')
              }}
            </p>
          </td>
          <td class="px-6 py-4">
            <p v-if="index < deviceMeasurements.length - 1">
              {{
                formatNumberWithUnit(
                  measurement.consumed_energy -
                    deviceMeasurements[index + 1].consumed_energy,
                  'kWh',
                )
              }}
            </p>
            <p v-if="showMeterValues">
              {{ formatNumberWithUnit(measurement.consumed_energy, 'kWh') }}
            </p>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<script lang="ts" setup>
import { IDeviceMeasurement } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t, d } = useI18n();

interface Props {
  deviceMeasurements: IDeviceMeasurement[];
  showMeterValues: boolean;
}

defineProps<Props>();
</script>
<style scoped>
tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
