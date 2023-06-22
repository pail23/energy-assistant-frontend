<template>
    <div class="h-full v-full p-4 flex justify-center min-h-screen">

        <div v-if="connected">
            <div class="grid grid-cols-1 lg:grid-cols-2">

                <PowerFlowCard :home_consumption_power=home.power.home_consumption :solar_power=home.power.solar_production unit="W">
                </PowerFlowCard>

                <div class="card w-80 sm:w-96 bg-base-100 shadow-xl m-4 p-4">
                    <div class="card-body  w-full">
                        <div class="grid grid-cols-6">
                            <div>
                                <span class="mdi text-3xl mdi-home"></span>
                            </div>
                            <span class="text-left font-bold text-lg col-span-5">{{ home.name }}
                            </span>
                            <div class="flex items-end">
                                <span v-if="expanded" @click="expanded = !expanded"
                                    className="mdi mdi-arrow-up-drop-circle-outline" />
                                <span v-else @click="expanded = !expanded"
                                    className="mdi mdi-arrow-down-drop-circle-outline" />
                            </div>
                            <div class="items-center col-span-5">
                                <div class="mb-4">
                                    <div class="italic">Leistung</div>
                                    <p class="text-left">Solarproduktion<span class="float-right">{{
                                        home.power.solar_production }} W</span></p>
                                </div>
                                <div class="italic">Aktueller Verbrauch</div>
                                <div class="mt-2 mb-4">
                                    <SelfSufficiencyBar :self_sufficiency=home.power.self_sufficiency
                                        :consumed_energy=home.power.home_consumption
                                        :consumed_solar_energy=solar_consumption_power unit="W"></SelfSufficiencyBar>
                                </div>
                                <div v-show="expanded">
                                    <div class="italic">Verbrauch heute:</div>

                                    <div class="mt-2 mb-4">
                                        <SelfSufficiencyBar :self_sufficiency=home.today.self_sufficiency
                                            :consumed_energy=home.today.consumed_energy
                                            :consumed_solar_energy=home.today.consumed_solar_energy></SelfSufficiencyBar>
                                    </div>

                                    <div class="italic">Gesamtverbrauch:</div>
                                    <p class="text-left">Solarenergie: <span class="float-right">{{
                                        home.overall.consumed_solar_energy.toFixed(2) }} kWh</span></p>
                                    <p class="text-left">Gesamtverbrauch: <span class="float-right">{{
                                        home.overall.consumed_energy.toFixed(2) }} kWh</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-for="(device, index) in home.devices" :key="index">
                    <DeviceCard :name=device.name :icon=device.icon :power=device.power :overall=device.overall
                        :today=device.today>
                    </DeviceCard>
                </div>
                <div v-for="(device, index) in home.heat_pumps" :key="index">
                    <HeatPumpCard :name=device.name :icon=device.icon :power=device.power :overall=device.overall
                        :today=device.today :actual_temperature=device.actual_temperature :state=device.state>
                    </HeatPumpCard>
                </div>
            </div>
        </div>
        <div v-else class="alert alert-error w-80 h-16">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Not connected to the backend.</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { devicesAPI } from '../api/devices.api'
import DeviceCard from "./DeviceCard.vue";
import HeatPumpCard from './HeatPumpCard.vue'
import SelfSufficiencyBar from './SelfSufficiencyBar.vue'
import PowerFlowCard from "./PowerFlowCard.vue";

const expanded = ref(false)
const home = computed(() => {
    return devicesAPI.home
});

const connected = computed(() => {
    return devicesAPI.state.connected;
})

const solar_consumption_power = computed(() => {
    return devicesAPI.home.power.self_sufficiency * devicesAPI.home.power.home_consumption / 100
})



</script>
