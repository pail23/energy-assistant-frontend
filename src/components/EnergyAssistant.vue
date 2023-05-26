<template>
    <v-container class="fill-height">
        <div v-if="connected">
            <v-card width="350" class="rounded-lg ma-4">
                <v-card-item>
                    <v-row class="d-flex align-center fill-width">
                        <v-col cols="2">
                            <v-icon icon="mdi:mdi-home" />
                        </v-col>
                        <v-col cols="10">
                            <v-card-title class="text-left">{{ home.name }}
                            </v-card-title>
                        </v-col>
                    </v-row>

                </v-card-item>


                <v-card-text>
                    <v-row class="d-flex  fill-width">
                        <v-col class="d-flex align-end" cols="2">
                            <v-icon v-if="expanded" @click="expanded = !expanded"
                                icon="mdi:mdi-arrow-up-drop-circle-outline" />
                            <v-icon v-else @click="expanded = !expanded" icon="mdi:mdi-arrow-down-drop-circle-outline" />
                        </v-col>
                        <v-col class="align-center" cols="10">
                            <div class="mb-4">
                                <h3>Leistung</h3>
                                <p class="text-left">Solarproduktion<span style="float:right;">{{
                                    home.power.solar_production }} W</span></p>
                            </div>
                            <h3>Aktueller Verbrauch</h3>
                            <div class="mt-2 mb-4">
                                <SelfSufficiencyBar :self_sufficiency=home.power.self_sufficiency
                                    :consumed_energy=home.power.home_consumption
                                    :consumed_solar_energy=solar_consumption_power unit="W"></SelfSufficiencyBar>
                            </div>
                            <div v-show="expanded">
                                <h3 class="pt-2">Verbrauch heute:</h3>

                                <div class="mt-2 mb-4">
                                    <SelfSufficiencyBar :self_sufficiency=home.today.self_sufficiency
                                        :consumed_energy=home.today.consumed_energy
                                        :consumed_solar_energy=home.today.consumed_solar_energy></SelfSufficiencyBar>
                                </div>

                                <h3 class="pt-2">Gesamtverbrauch:</h3>
                                <p class="text-left">Solarenergie: <span style="float:right;">{{
                                    home.overall.consumed_solar_energy.toFixed(2) }} kWh</span></p>
                                <p class="text-left">Gesamtverbrauch: <span style="float:right;">{{
                                    home.overall.consumed_energy.toFixed(2) }} kWh</span></p>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <div v-for="(device, index) in home.devices" :key="index">
                <DeviceCard :name=device.name :icon=device.icon :state=device.power
                    :consumed_solar_energy=device.overall.consumed_solar_energy
                    :consumed_energy=device.overall.consumed_energy :self_sufficiency_today=device.today.self_sufficiency>
                </DeviceCard>
            </div>
            <div v-for="(device, index) in home.heat_pumps" :key="index">
                <HeatPumpCard :name=device.name :icon=device.icon :state=device.power
                    :consumed_solar_energy=device.overall.consumed_solar_energy
                    :consumed_energy=device.overall.consumed_energy :self_sufficiency_today=device.today.self_sufficiency
                    :actual_temperature=device.actual_temperature>
                </HeatPumpCard>
            </div>

        </div>
        <div v-else>Not connected to the backend.</div>
    </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { devicesAPI } from './devices/devices.api'
import DeviceCard from "./DeviceCard.vue";
import HeatPumpCard from './HeatPumpCard.vue'
import SelfSufficiencyBar from './SelfSufficiencyBar.vue'

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
