<template>
    <v-container class="fill-height">
        <v-responsive class="d-flex align-center  fill-height text-center">
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
                            <p>Solar Energie: {{ home.solar_energy.toFixed(2) }} kWh</p>
                            <p>Verbrauchte Energie: {{ home.consumed_energy.toFixed(2) }} kWh</p>
                            <p>Autarkie heute: {{ home.self_sufficiency_today }} %</p>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>


            <li v-for="(device, index) in home.devices" :key="index">
                <v-card width="400" style="margin: 20px">
                    <v-card-item>
                        <v-card-title>{{ device.name }}
                        </v-card-title>

                    </v-card-item>

                    <v-card-text>
                        <v-row class="d-flex align-center fill-width">
                            <v-col cols="2">
                                <v-icon :icon="device.icon" />
                            </v-col>
                            <v-col cols="10">
                                <p>Verbrauch: {{ device.state }} W</p>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </li>


        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { devicesAPI } from './devices/devices.api'


export default defineComponent({
    created() {
        devicesAPI.fetchData()
    },
    computed: {
        home() {
            return devicesAPI.home;
        }
  }    
});

</script>
