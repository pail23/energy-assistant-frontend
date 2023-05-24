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
                            <h3>Leistung</h3>
                            <p class="text-left">Solarproduktion<span style="float:right;">{{
                                home.power.solar_production }} W</span></p>
                            <p class="text-left">Verbrauch: <span style="float:right;">{{ home.power.home_consumption }}
                                    W</span></p>
                            <p class="text-left">Autarkie: <span style="float:right;">{{ home.power.self_sufficiency }}
                                    %</span></p>

                            <div v-show="expanded">
                                <h3 class="pt-2">Verbrauch heute:</h3>
                                <p class="text-left">Autarkie: <span style="float:right;">{{
                                    home.today.self_sufficiency }} %</span></p>
                                <p class="text-left">Solarenergie: <span style="float:right;">{{
                                    home.today.consumed_solar_energy.toFixed(2) }} kWh</span></p>
                                <p class="text-left">Gesamtverbrauch: <span style="float:right;">{{
                                    home.today.consumed_energy.toFixed(2) }} kWh</span></p>

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

<script lang="ts">
import { defineComponent } from "vue";
import { devicesAPI } from './devices/devices.api'
import DeviceCard from "./DeviceCard.vue";
import HeatPumpCard from './HeatPumpCard.vue'

export default defineComponent({
    data() {
        return {
            expanded: true
        }
    },
    computed: {
        home() {
            return devicesAPI.home;
        },
        connected() {
            return devicesAPI.state.connected;
        }
    },
    components: {
        DeviceCard, HeatPumpCard
    }
});

</script>
