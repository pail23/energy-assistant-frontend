<template>
    <table class="m-4 bg-base-100 border-collapse border border-slate-300 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead>
            <tr>
                <th class="p-2 border border-slate-300  w-16">Datum</th>
                <th class="p-2 border border-slate-300  w-28">Verbrauchte Solar Energie</th>
                <th class="p-2 border border-slate-300  w-28">Verbrauchte Energie</th>
                <th class="p-2 border border-slate-300  w-28">Produzierte Solar Energie</th>                
            </tr>
        </thead>
        <tbody>

            <tr v-for="measurement in home_measurements" :key="measurement.id">
                <td class="p-2 border border-slate-300 w-16">
                    {{ measurement.measurement_date }}
                </td>
                <td class="p-2 border border-slate-300 w-28">
                    {{ measurement.solar_consumed_energy.toFixed(1) }} kWh
                </td>
                <td class="p-2 border border-slate-300 w-28">
                    {{ measurement.consumed_energy.toFixed(1) }} kWh
                </td>     
                <td class="p-2 border border-slate-300 w-28">
                    {{ measurement.solar_produced_energy.toFixed(1) }} kWh
                </td>                                
            </tr>

        </tbody>
    </table>
</template>
<script lang="ts" setup>
import { IHomeMeasurementResponse } from '@/api/measurementApi';

interface Props {
    home_measurements: IHomeMeasurementResponse[];
}

defineProps<Props>()
</script>