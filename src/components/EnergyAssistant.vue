<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center  fill-height text-center">
            <div v-if="connected">
                <v-card width="400" style="margin: 20px">
                    <v-card-item>
                        <v-card-title>{{ home.name }}
                        </v-card-title>

                    </v-card-item>

                    <v-card-text>
                        <v-row class="d-flex align-center fill-width">
                            <v-col cols="2">
                                <v-icon icon="mdi:mdi-home" />
                            </v-col>
                            <v-col cols="10">
                                <p>Solar Leistung: {{ home.solar_production }} W</p>
                                <p>Verbrauch: {{ home.home_consumption }} W</p>
                                <p>Autarkie: {{ home.self_sufficiency }} %</p>
                                <p>Autarkie heute: {{ home.self_sufficiency_today }} %</p>
                                <p style="color:gray">Solar Energie: {{ home.solar_energy.toFixed(2) }} kWh</p>
                                <p style="color:gray">Verbrauchte Energie: {{ home.consumed_energy.toFixed(2) }} kWh</p>

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
    created() {
        devicesAPI.fetchData()
    },
    data() {
        return {
            userLoggedIn: false
        };
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
        DeviceCard
    }
});

</script>
