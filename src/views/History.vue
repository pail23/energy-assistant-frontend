<template>
    <div class="h-full v-full bg-base-200 p-4 flex justify-center min-h-screen">

        <div v-if="isLoading" class="w-full h-full">
            <span class="loading loading-spinner loading-lg m-auto "></span>
        </div>
        <div v-else>
            <p>Today</p>
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