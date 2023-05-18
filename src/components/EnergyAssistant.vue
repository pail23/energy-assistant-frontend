<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center  fill-height">
            <div v-if="connected">
                <v-card width="400" class="rounded-lg ma-4">
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
                                    home.solar_production }} W</span></p>
                                <p class="text-left">Verbrauch: <span style="float:right;">{{ home.home_consumption }}
                                        W</span></p>
                                <p class="text-left">Autarkie: <span style="float:right;">{{ home.self_sufficiency }}
                                        %</span></p>
                                <p class="text-left">Autarkie heute: <span style="float:right;">{{
                                    home.self_sufficiency_today }} %</span></p>
                                <p class="text-left text-grey">Solar Energie: <span style="float:right;">{{
                                    home.solar_energy.toFixed(2) }} kWh</span></p>
                                <p class="text-left text-grey">Verbrauchte Energie: <span style="float:right;">{{
                                    home.consumed_energy.toFixed(2) }} kWh</span></p>

                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>


                <li v-for="(device, index) in home.devices" :key="index">
                    <DeviceCard :name=device.name :icon=device.icon :state=device.state :solar_energy=device.solar_energy
                        :consumed_energy=device.consumed_energy :self_sufficiency_today=device.self_sufficiency_today>
                    </DeviceCard>
                </li>
            </div>
            <div v-else>Not connected to the backend.</div>
        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { devicesAPI } from './devices/devices.api'
import DeviceCard from "./DeviceCard.vue";

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
        DeviceCard
    }
});

</script>
