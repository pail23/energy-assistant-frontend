<template>
  <div class="card bg-base-100">
    <table
      class="m-4 border-collapse border border-slate-300 bg-base-100 text-left text-sm text-gray-500 dark:text-gray-400"
    >
      <thead class="bg-base-200">
        <tr>
          <th class="w-24 px-6 py-3">{{ t('raw_data.date') }}</th>
          <th class="w-36 px-6 py-3">
            {{ t('raw_data.consumed_solar_energy') }}
          </th>
          <th class="w-36 px-6 py-3">{{ t('raw_data.consumed_energy') }}</th>
          <th class="w-36 px-6 py-3">
            {{ t('raw_data.produced_solar_energy') }}
          </th>
          <th class="w-36 px-6 py-3">{{ t('raw_data.imported_energy') }}</th>
          <th class="w-36 px-6 py-3">{{ t('raw_data.exported_energy') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(measurement, index) in homeMeasurements"
          :key="measurement.id"
          class="border-b text-center odd:bg-base-100 even:bg-base-200"
        >
          <td class="px-6 py-4">
            {{ d(new Date(measurement.measurement_date)) }}
          </td>
          <td class="px-6 py-4">
            <p v-if="index > 0">
              {{
                formatNumberWithUnit(
                  measurement.solar_consumed_energy -
                    homeMeasurements[index - 1].solar_consumed_energy,
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
            <p v-if="index > 0">
              {{
                formatNumberWithUnit(
                  measurement.consumed_energy -
                    homeMeasurements[index - 1].consumed_energy,
                  'kWh',
                )
              }}
            </p>
            <p v-if="showMeterValues">
              {{ formatNumberWithUnit(measurement.consumed_energy, 'kWh') }}
            </p>
          </td>
          <td class="px-6 py-4">
            <p v-if="index > 0">
              {{
                formatNumberWithUnit(
                  measurement.solar_produced_energy -
                    homeMeasurements[index - 1].solar_produced_energy,
                  'kWh',
                )
              }}
            </p>
            <p v-if="showMeterValues">
              {{
                formatNumberWithUnit(measurement.solar_produced_energy, 'kWh')
              }}
            </p>
          </td>
          <td class="px-6 py-4">
            <p v-if="index > 0">
              {{
                formatNumberWithUnit(
                  measurement.grid_imported_energy -
                    homeMeasurements[index - 1].grid_imported_energy,
                  'kWh',
                )
              }}
            </p>
            <p v-if="showMeterValues">
              {{
                formatNumberWithUnit(measurement.grid_imported_energy, 'kWh')
              }}
            </p>
          </td>
          <td class="px-6 py-4">
            <p v-if="index > 0">
              {{
                formatNumberWithUnit(
                  measurement.grid_exported_energy -
                    homeMeasurements[index - 1].grid_exported_energy,
                  'kWh',
                )
              }}
            </p>
            <p v-if="showMeterValues">
              {{
                formatNumberWithUnit(measurement.grid_exported_energy, 'kWh')
              }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { IHomeMeasurement } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t, d } = useI18n();

interface Props {
  homeMeasurements: IHomeMeasurement[];
  showMeterValues: boolean;
}

defineProps<Props>();



</script>
