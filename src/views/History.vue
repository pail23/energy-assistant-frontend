<template>
    <div class="h-full v-full bg-base-200 p-4 flex justify-center min-h-screen">

        <div class="grid grid-cols-1">

            <div class="grid w-[40rem] grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2">
                <div>
                    <input type="radio" name="option" id="1" class="peer hidden" value="today" v-model="timeframe"
                        checked />
                    <label for="1"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Heute</label>
                </div>

                <div>
                    <input type="radio" name="option" id="2" class="peer hidden" value="week" v-model="timeframe" />
                    <label for="2"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Woche</label>
                </div>

                <div>
                    <input type="radio" name="option" id="3" class="peer hidden" value="month" v-model="timeframe" />
                    <label for="3"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Monat</label>
                </div>

                <div>
                    <input type="radio" name="option" id="4" class="peer hidden" value="year" v-model="timeframe" />
                    <label for="4"
                        class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Jahr</label>
                </div>
            </div>


            <div v-if="isLoading" class="w-full h-full">
                <span class="loading loading-spinner loading-lg m-auto "></span>
            </div>
            <div v-else>
                <div v-if="data" class="grid grid-cols-1 lg:grid-cols-2">
                    <PowerFlowCard :home_consumption_power=data.consumed_energy :solar_power=data.solar_produced_energy
                        unit="kWh">
                    </PowerFlowCard>
                    <div v-for="(device, index) in data.device_measurements" :key="index">
                        <DeviceEnergyCard :measurement=device icon="mdi-home" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { api, HomeMeasurementDifference } from '@/api/measurement.api';
import PowerFlowCard from "@/components/PowerFlowCard.vue";
import DeviceEnergyCard from "@/components/DeviceEnergyCard.vue";



const timeframe = ref("today")
const data = ref<HomeMeasurementDifference>()

watch(timeframe, () => {

    const from_date = new Date();

    switch (timeframe.value) {
        case "week":
            from_date.setDate(from_date.getDate() - 7);
            break;
        case "month":
            from_date.setMonth(from_date.getMonth() - 1);
            break;
        case "year":
            from_date.setFullYear(from_date.getFullYear() - 1);
            break;
    }
    loadData(from_date);
})

const loadData = async function (from_date: Date) {
    isLoading.value = true
    data.value = await api.getHomeMeasurementsByDate(from_date, new Date())
    isLoading.value = false
}

onMounted(() => {
    loadData(new Date());
});



const isLoading = ref(false)

//const { data, isLoading } = useQuery('home_measurements', () => getHomeMeasurementsByDateFn(from_date.value, new Date()));
</script>