<template>
    <div class="h-full v-full bg-base-200 p-4 flex justify-center min-h-screen">

        <div v-if="isLoading" class="w-full h-full">
            <span class="loading loading-spinner loading-lg m-auto "></span>
        </div>
        <div v-else>

            <div class="grid w-[40rem] grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2">
                <div>
                    <input type="radio" name="option" id="1" class="peer hidden" checked />
                    <label for="1"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Heute</label>
                </div>

                <div>
                    <input type="radio" name="option" id="2" class="peer hidden" />
                    <label for="2"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Woche</label>
                </div>

                <div>
                    <input type="radio" name="option" id="3" class="peer hidden" />
                    <label for="3"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Monat</label>
                </div>

                <div>
                    <input type="radio" name="option" id="4" class="peer hidden" />
                    <label for="4"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Jahr</label>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <PowerFlowCard :home_consumption_power=data.difference.consumed_energy
                    :solar_power=data.difference.solar_produced_energy unit="kWh">
                </PowerFlowCard>
                <div v-for="(device, index) in data.difference.device_measurements" :key="index">
                    <p>{{ device.name }}</p>
                    <DeviceEnergyCard :measurement=device icon="mdi-home" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { getHomeMeasurementsByDateFn } from '@/api/measurement.api';
import { useQuery } from 'vue-query';
import PowerFlowCard from "@/components/PowerFlowCard.vue";
import DeviceEnergyCard from "@/components/DeviceEnergyCard.vue";

const { data, isLoading } = useQuery('home_measurements', () => getHomeMeasurementsByDateFn(new Date()));
</script>