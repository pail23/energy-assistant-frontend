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
                <v-col cols="2">
                    
                </v-col>
                <v-col cols="10">

                    <p class="text-left">Verbrauch: <span style="float:right;">{{ state }} W</span></p>
                    <p class="text-left">Autarkie heute: <span style="float:right;">{{ self_sufficiency_today }} %</span>
                    </p>
                    <p class="text-left">Temperatur: <span style="float:right;">{{ actual_temperature }} °C</span>
                    </p>                    
                    <p class="text-left text-grey">Verbrauchte Solar Energie: <span style="float:right;">{{
                        consumed_solar_energy.toFixed(2) }} kWh</span></p>
                    <p class="text-left text-grey">Verbrauchte Energie: <span style="float:right;">{{
                        consumed_energy.toFixed(2) }} kWh</span></p>

                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

import { computed, ref } from 'vue'

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
/*
const actual_temperature = computed(() => props.extra_attributes ) //extra_attributes["actual_temperature"])

const props = defineProps({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    state: { type: Number, required: true },
    consumed_solar_energy: { type: Number, required: true },
    consumed_energy: { type: Number, required: true },
    self_sufficiency_today: { type: Number, required: true },
    extra_attributes: null,
})*/
</script>