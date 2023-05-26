<template>
    <div class="bg-red rounded text-center">
        <div class="rounded bg-yellow-darken-2 text-center text-white" :style=progressBarStyle><span v-if="self_sufficiency > 20"> {{
            self_sufficiency }}%</span></div>
        <span v-if="self_sufficiency < 20"> {{
            self_sufficiency }}%</span>
    </div>
    <div >
        <v-icon color="yellow-darken-2" icon="mdi:mdi-solar-power" />
        <span class="text-yellow-darken-2">{{
            consumed_solar_energy.toFixed(1) }} {{ unit }}</span><span class="text-red" style="float:right;">{{
        consumed_grid_energy.toFixed(1) }} {{ unit }}<v-icon color="red" icon="mdi:mdi-transmission-tower" /></span>
        
    </div>
</template>


<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps({
    self_sufficiency: { type: Number, required: true },
    consumed_solar_energy: { type: Number, required: true },
    consumed_energy: { type: Number, required: true },
    unit: { type: String, default: "kWh" }
})
const progressBarStyle = computed(() => {
    return 'width: ' + props.self_sufficiency + '%'
});
const consumed_grid_energy = computed(() => {
    return props.consumed_energy - props.consumed_solar_energy
});


</script>
