<template>
    <div class="card w-80 sm:w-96 bg-base-100 shadow-xl m-4 p-4">
        <div>
            <div class="grid grid-cols-6 w-full">
                <div>
                    <span class="mdi text-3xl" :class="icon"></span>
                </div>
                <div class="col-span-5">
                    <div class="text-left font-bold text-lg">{{ name }}
                    </div>
                </div>

                <div class="flex items-end">
                    <span v-if="expanded" @click="expanded = !expanded" className="mdi mdi-arrow-up-drop-circle-outline" />
                    <span v-else @click="expanded = !expanded" className="mdi mdi-arrow-down-drop-circle-outline" />
                </div>
                <div class="items-center col-span-5">
                    <div class="text-left">Verbrauch: <span class="float-right">{{ power }} W</span></div>
                    <div class="text-left">Temperatur: <span class="float-right">{{ actual_temperature }} °C</span> </div>
                    <div class="text-left">Status: <span class="float-right">{{ state }}</span> </div>
                    <div class="italic">Verbrauch heute:</div>
                    <SelfSufficiencyBar :self_sufficiency=today.self_sufficiency :consumed_energy=today.consumed_energy
                        :consumed_solar_energy=today.consumed_solar_energy></SelfSufficiencyBar>
                    <div v-show="expanded">
                        <div class="italic">Gesamtverbrauch:</div>
                        <div class="text-left">Solarenergie: <span class="float-right">{{
                            overall.consumed_solar_energy.toFixed(2) }} kWh</span></div>
                        <div class="text-left">Gesamtverbrauch: <span class="float-right">{{
                            overall.consumed_energy.toFixed(2) }} kWh</span></div>
                        <SelfSufficiencyBar :self_sufficiency=overall.self_sufficiency
                            :consumed_energy=overall.consumed_energy :consumed_solar_energy=overall.consumed_solar_energy>
                        </SelfSufficiencyBar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import SelfSufficiencyBar from './SelfSufficiencyBar.vue'
import { Energy } from '../api/device'

interface Props {
    name: string;
    icon: string;
    power: number;

    overall: Energy;
    today: Energy;
    actual_temperature: number;
    state: string;
}


defineProps<Props>()
const expanded = ref(false)
</script>