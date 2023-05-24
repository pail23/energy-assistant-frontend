<template>
    <v-card width="350" class="rounded-lg ma-4">
        <v-card-item>
            <v-row class="d-flex align-center fill-width">
                <v-col cols="2">
                    <v-icon :icon="icon" />
                </v-col>
                <v-col cols="10">
                    <v-card-title class="text-left">{{ name }}
                    </v-card-title>
                </v-col>
            </v-row>
        </v-card-item>

        <v-card-text>
            <v-row class="d-flex align-center fill-width">
                <v-col class="d-flex align-end" cols="2">
                    <v-icon v-if="expanded" @click="expanded = !expanded" icon="mdi:mdi-arrow-up-drop-circle-outline" />
                    <v-icon v-else @click="expanded = !expanded" icon="mdi:mdi-arrow-down-drop-circle-outline" />
                </v-col>
                <v-col class="align-center" cols="10">

                    <p class="text-left">Verbrauch: <span style="float:right;">{{ state }} W</span></p>
                    <p class="text-left">Autarkie heute: <span style="float:right;">{{ self_sufficiency_today }} %</span>
                    </p>
                    <p class="text-left">Temperatur: <span style="float:right;">{{ actual_temperature }} °C</span>
                    </p>
                    <div v-show="expanded">
                        <h3 class="pt-2">Gesamtverbrauch:</h3>
                        <p class="text-left">Solarenergie: <span style="float:right;">{{
                            consumed_solar_energy.toFixed(2) }} kWh</span></p>
                        <p class="text-left">Gesamtverbrauch: <span style="float:right;">{{
                            consumed_energy.toFixed(2) }} kWh</span></p>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

interface Props {
    name: string
    icon: string
    state: number
    consumed_solar_energy: number
    consumed_energy: number
    self_sufficiency_today: number
    actual_temperature: number
}


const props = defineProps<Props>()
const expanded = ref(false)
</script>