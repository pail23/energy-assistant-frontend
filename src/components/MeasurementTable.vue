<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg bg-base-100">
        <table
            class="m-4 bg-base-100 border-collapse border border-slate-300 text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="bg-base-200">
                <tr>
                    <th class="px-6 py-3 w-24">Datum</th>
                    <th class="px-6 py-3 w-36">Verbrauchte Solar Energie</th>
                    <th class="px-6 py-3 w-36">Verbrauchte Energie</th>
                    <th class="px-6 py-3 w-36">Produzierte Solar Energie</th>
                    <th class="px-6 py-3 w-36">Bezognene Energie</th>
                    <th class="px-6 py-3 w-36">Gelieferte Energie</th>
                </tr>
            </thead>
            <tbody>

                <tr class="odd:bg-base-100 even:bg-base-200 border-b text-center" v-for="(measurement, index) in home_measurements" :key="measurement.id">
                    <td class="px-6 py-4 ">
                        {{ (new Date(measurement.measurement_date)).toLocaleDateString("de-DE") }}
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ (measurement.solar_consumed_energy - home_measurements[index -
                            1].solar_consumed_energy).toFixed(1) }} kWh</p>
                        <p v-if="show_meter_values">{{ measurement.solar_consumed_energy.toFixed(1) }} kWh</p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ (measurement.consumed_energy - home_measurements[index -
                            1].consumed_energy).toFixed(1) }} kWh</p>
                        <p v-if="show_meter_values">{{ measurement.consumed_energy.toFixed(1) }} kWh</p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ (measurement.solar_produced_energy - home_measurements[index -
                            1].solar_produced_energy).toFixed(1) }} kWh</p>
                        <p v-if="show_meter_values">{{ measurement.solar_produced_energy.toFixed(1) }} kWh</p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ (measurement.grid_imported_energy - home_measurements[index -
                            1].grid_imported_energy).toFixed(1) }} kWh</p>
                        <p v-if="show_meter_values">{{ measurement.grid_imported_energy.toFixed(1) }} kWh</p>
                    </td>
                    <td class="px-6 py-4">
                        <p v-if="index > 0"> {{ (measurement.grid_exported_energy - home_measurements[index -
                            1].grid_exported_energy).toFixed(1) }} kWh</p>
                        <p v-if="show_meter_values">{{ measurement.grid_exported_energy.toFixed(1) }} kWh</p>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script lang="ts" setup>
import { IHomeMeasurementResponse } from '@/api/measurement.api';

interface Props {
    home_measurements: IHomeMeasurementResponse[];
    show_meter_values: boolean;
}

defineProps<Props>()
</script>