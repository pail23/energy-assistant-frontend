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
                    <v-row class="d-flex align-center fill-width">
                        <v-col cols="2">

                        </v-col>
                        <v-col cols="10">
                            <p class="text-left">Solar Leistung:<span style="float:right;">{{
                                home.power.solar_production }} W</span></p>
                            <p class="text-left">Verbrauch: <span style="float:right;">{{ home.power.home_consumption }}
                                    W</span></p>
                            <p class="text-left">Autarkie: <span style="float:right;">{{ home.power.self_sufficiency }}
                                    %</span></p>


                            <p class="text-left">Autarkie heute: <span style="float:right;">{{
                                home.today.self_sufficiency }} %</span></p>
                            <p class="text-left text-grey">Verbr. Solar Energie heute: <span style="float:right;">{{
                                home.today.consumed_solar_energy.toFixed(2) }} kWh</span></p>
                            <p class="text-left text-grey">Verbr. Energie heute: <span style="float:right;">{{
                                home.today.consumed_energy.toFixed(2) }} kWh</span></p>
                            <p class="text-left text-grey">Verbr. Solar Energie: <span style="float:right;">{{
                                home.overall.consumed_solar_energy.toFixed(2) }} kWh</span></p>
                            <p class="text-left text-grey">Verbr. Energie: <span style="float:right;">{{
                                home.overall.consumed_energy.toFixed(2) }} kWh</span></p>

                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <div v-for="(device, index) in home.devices" :key="index">
                <DeviceCard :name=device.name :icon=device.icon :state=device.power
                    :consumed_solar_energy=device.overall.consumed_solar_energy :consumed_energy=device.overall.consumed_energy
                    :self_sufficiency_today=device.today.self_sufficiency>
                </DeviceCard>
            </div>
            <div v-for="(device, index) in home.heat_pumps" :key="index">
                <HeatPumpCard :name=device.name :icon=device.icon :state=device.power
                    :consumed_solar_energy=device.overall.consumed_solar_energy :consumed_energy=device.overall.consumed_energy
                    :self_sufficiency_today=device.today.self_sufficiency :actual_temperature=device.actual_temperature>
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
