<template>
    <div class="card bg-base-100">
        <table
            class="m-4 bg-base-100 border-collapse border border-slate-300 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="bg-base-200">
                <tr>
                    <th class="px-6 py-3 w-24">{{ t('raw_data.date') }}</th>
                    <th class="px-6 py-3 w-36">{{ t('raw_data.consumed_solar_energy') }}</th>
                    <th class="px-6 py-3 w-36">{{ t('raw_data.consumed_energy') }}</th>
                    <th class="px-6 py-3 w-36">{{ t('raw_data.produced_solar_energy') }}</th>
                    <th class="px-6 py-3 w-36">{{ t('raw_data.imported_energy') }}</th>
                    <th class="px-6 py-3 w-36">{{ t('raw_data.exported_energy') }}</th>
                </tr>
            </thead>
            <tbody>

                <tr class="odd:bg-base-100 even:bg-base-200 border-b text-center"
                    v-for="(measurement, index) in home_measurements" :key="measurement.id">
                    <td class="px-6 py-4 ">
                        {{ d(new Date(measurement.measurement_date)) }}
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ formatNumberWithUnit(measurement.solar_consumed_energy -
                            home_measurements[index -
                                1].solar_consumed_energy, "kWh") }} </p>
                        <p v-if="show_meter_values">{{ formatNumberWithUnit(measurement.solar_consumed_energy, "kWh") }} </p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ formatNumberWithUnit(measurement.consumed_energy - home_measurements[index -
                            1].consumed_energy, "kWh") }}</p>
                        <p v-if="show_meter_values">{{ formatNumberWithUnit(measurement.consumed_energy, "kWh") }}</p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ formatNumberWithUnit(measurement.solar_produced_energy -
                            home_measurements[index -
                                1].solar_produced_energy, "kWh") }}</p>
                        <p v-if="show_meter_values">{{ formatNumberWithUnit(measurement.solar_produced_energy, "kWh") }}
                        </p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ formatNumberWithUnit(measurement.grid_imported_energy -
                            home_measurements[index -
                                1].grid_imported_energy, "kWh") }}</p>
                        <p v-if="show_meter_values">{{ formatNumberWithUnit(measurement.grid_imported_energy, "kWh") }}</p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ formatNumberWithUnit(measurement.grid_exported_energy -
                            home_measurements[index -
                                1].grid_exported_energy, "kWh") }}</p>
                        <p v-if="show_meter_values">{{ formatNumberWithUnit(measurement.grid_exported_energy, "kWh") }}</p>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script lang="ts" setup>
import { IHomeMeasurementResponse } from '@/api/measurement.api';
import { useI18n } from 'vue-i18n'
import { formatNumberWithUnit } from '@/utils';

const { t, d } = useI18n();

interface Props {
    home_measurements: IHomeMeasurementResponse[];
    show_meter_values: boolean;
}

defineProps<Props>()
</script>