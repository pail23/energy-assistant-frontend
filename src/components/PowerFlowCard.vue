<template>
    <div class="rounded-lg m-4 p-4 ring-1 ring-gray-900/5 drop-shadow-md w-96 bg-white">



        <div class="grid grid-cols-3 w-full place-items-center">
            <div class="h-24 w-24"></div>
            <div class="h-24 w-24 grid rounded-lg ring-2 ring-gray-900/5 place-items-center text-center">
                <div>
                    <div class="mdi mdi-solar-power text-3xl text-yellow-500"></div>
                    <span class="text-sm">{{ solar_power }} W</span>
                </div>
            </div>
            <div class="h-24 w-24"></div>

            <div class="h-24 w-24"></div>
            <!--
            <svg class="h-24 w-24">

                <path id="solar" d="M 10 10 L 90 90" stroke="black" />


                <circle cx="10" cy="10" r="2" fill="red">
                    <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
                        <mpath xlink:href="#solar" />
                    </animateMotion>
                </circle>
            </svg>-->
            <div></div>
            <div></div>

            <div class="h-24 w-24 grid rounded-lg ring-2 ring-gray-900/5 place-items-center text-center">
                <div>
                    <div class="mdi mdi-transmission-tower text-3xl"></div>
                    <span class="text-sm">{{
                        grid_consumption_power }} W</span>
                </div>
            </div>
            <div class="h-24 w-24">
               <!-- <svg  viewBox="0 0 100 100" class="h-24 w-24">

                    <path id="grid1" d="M 0 50 L 100 50" stroke="black" vector-effect="non-scaling-stroke" />


                    <circle cx="10" cy="10" r="2" fill="red">
                        <animateMotion dur="1.66s" repeatCount="indefinite" calcMode="linear">
                            <mpath xlink:href="#grid1" />
                        </animateMotion>
                    </circle>
                </svg>-->
            </div>
            <div class="h-24 w-24 grid rounded-lg ring-2 ring-gray-900/5 place-items-center text-center">
                <div>
                    <div class="mdi mdi-home text-3xl "></div>
                    <span class="text-sm">{{ home_consumption_power }} W</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
    solar_power: number
    home_consumption_power: number
}

const props = defineProps<Props>()

const grid_consumption_power = computed(() => {
    return props.home_consumption_power - props.solar_power
});
</script>