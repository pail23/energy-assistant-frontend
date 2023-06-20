<template>
    <div class="card w-80 sm:w-96 bg-base-100 shadow-xl m-4 p-4">
        <div>
            <div class="grid grid-cols-6 w-full">
                <div>
                    <span class="mdi text-3xl" :class="icon"></span>
                </div>
                <div class="col-span-5">
                    <div class="text-left font-bold text-lg">{{ measurement.name }}
                    </div>
                </div>

                <div class="items-center col-span-6">
                    <div class="italic">Verbrauch heute:</div>
                    <SelfSufficiencyBar :self_sufficiency=measurement.self_sufficiency :consumed_energy=measurement.consumed_energy
                        :consumed_solar_energy=measurement.solar_consumed_energy></SelfSufficiencyBar>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import SelfSufficiencyBar from './SelfSufficiencyBar.vue'
import {DeviceMeasurementDifference} from '@/api/measurement.api.ts'

interface Props {
    icon: string
    measurement: DeviceMeasurementDifference
}

defineProps<Props>()
</script>