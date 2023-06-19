<template>
    <div class="h-full v-full bg-base-200 p-4 flex justify-center min-h-screen">

        <div v-if="isLoading" class="w-full h-full">
            <span class="loading loading-spinner loading-lg m-auto "></span>
        </div>
        <div v-else>
            <MeasurementTable :home_measurements=data.home_measurements />
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { getAllHomeMeasurementsFn } from '@/api/measurementApi';
import MeasurementTable from '@/components/MeasurementTable.vue'
import { useQuery } from 'vue-query';

//data = await getAllHomeMeasurementsFn();
const { data, isLoading } = useQuery('home_measurements', () => getAllHomeMeasurementsFn());
console.log(data.home_measurements)
</script>