<template>
    <div class="card w-80 sm:w-96 bg-base-100 shadow-xl m-4 ">
        <div class="w-80 h-72 relative mx-auto">
            <svg class="w-full h-full" viewBox="0 0 200 180">
                <path id="solar-to-home" d="M 100 40 L 160 140" class="stroke-yellow-500" />
                <circle r="2" class="fill-yellow-500">
                    <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
                        <mpath xlink:href="#solar-to-home" />
                    </animateMotion>
                </circle>
                <path id="solar-to-grid" d="M 100 40 L 40 140" class="stroke-purple-500" />
                <circle r="2" class="fill-purple-800">
                    <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
                        <mpath xlink:href="#solar-to-grid" />
                    </animateMotion>
                </circle>
                <path id="grid-to-home" d="M 40 140 L 160 140" class="stroke-sky-500" />
                <circle r="2" class="fill-sky-800">
                    <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
                        <mpath xlink:href="#grid-to-home" />
                    </animateMotion>
                </circle>
            </svg>
            <div class="absolute top-0 bottom-0 left-0 right-0">
                <div
                    class="absolute top-5 left-1/2 transform -translate-x-1/2 h-20 w-20 grid rounded-full ring-2 ring-yellow-500 place-items-center text-center bg-base-100">
                    <div>
                        <div class="mdi mdi-solar-power text-2xl text-yellow-500"></div>
                        <span class="text-xs">{{ solar_power.toFixed(1) }} {{ unit }}</span>
                    </div>
                </div>
                <div
                    class="absolute bottom-5 left-5 h-20 w-20 grid rounded-full ring-2 ring-sky-800 place-items-center text-center bg-base-100">
                    <div>
                        <div class="mdi mdi-transmission-tower text-2xl"></div>

                        <div v-if="grid_imported_energy" class="text-xs">
                            <div><span class="mdi mdi-arrow-right"></span> {{ grid_imported_energy.toFixed(1) }} {{ unit }}
                            </div>
                            <div v-if="grid_exported_energy"><span class="mdi mdi-arrow-left"></span> {{
                                grid_exported_energy.toFixed(1) }} {{ unit }}</div>
                        </div>
                        <div v-else class="text-xs">
                            <span v-if="grid_consumption_power > 0"><span class="mdi mdi-arrow-right"></span>  {{ grid_consumption_power.toFixed(1) }} {{ unit }}</span>
                            <span v-else><span class="mdi mdi-arrow-left"></span> {{ (-grid_consumption_power).toFixed(1) }} {{ unit }}</span>
                        </div>
                    </div>
                </div>
                <div
                    class="absolute bottom-5 right-5 h-20 w-20 grid rounded-full ring-2 ring-blue-800 place-items-center text-center bg-base-100">
                    <div>
                        <div class="mdi mdi-home text-2xl "></div>
                        <span class="text-xs">{{ home_consumption_power.toFixed(1) }} {{ unit }}</span>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
    solar_power: number;
    home_consumption_power: number;
    grid_imported_energy?: number;
    grid_exported_energy?: number;
    unit: string;
}

const props = defineProps<Props>()

const grid_consumption_power = computed(() => {
    return props.home_consumption_power - props.solar_power
});
</script>