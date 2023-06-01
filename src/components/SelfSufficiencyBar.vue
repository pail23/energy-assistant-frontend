<template>
    <div class="bg-red-900 w-full text-sm rounded text-center text-white">
        <div class="rounded bg-yellow-500 " :style=progressBarStyle><span v-if="self_sufficiency > 50"> {{
            self_sufficiency }}%</span></div>
        <span v-if="self_sufficiency < 50"> {{
            self_sufficiency }}%</span>
    </div>
    <div class="text-sm">
        <span class="mdi mdi-solar-power text-yellow-500" ></span>
        <span class="text-yellow-500">{{
            consumed_solar_energy.toFixed(1) }} {{ unit }}</span><span class="text-red-900 float-right">{{
        consumed_grid_energy.toFixed(1) }} {{ unit }}<span class="mdi mdi-transmission-tower text-red-900" ></span></span>
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
