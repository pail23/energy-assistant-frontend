<template>
  <div class="v-full flex h-full min-h-screen justify-center p-4">
    <div class="grid grid-cols-1">
      <div
        class="grid h-14 w-full grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2"
      >
        <div>
          <input
            id="1"
            v-model="timeframe"
            type="radio"
            name="option"
            class="peer hidden"
            value="today"
            checked
          />
          <label
            for="1"
            class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >Heute</label
          >
        </div>

        <div>
          <input
            id="2"
            v-model="timeframe"
            type="radio"
            name="option"
            class="peer hidden"
            value="week"
          />
          <label
            for="2"
            class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >Woche</label
          >
        </div>

        <div>
          <input
            id="3"
            v-model="timeframe"
            type="radio"
            name="option"
            class="peer hidden"
            value="month"
          />
          <label
            for="3"
            class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >Monat</label
          >
        </div>

        <div>
          <input
            id="4"
            v-model="timeframe"
            type="radio"
            name="option"
            class="peer hidden"
            value="year"
          />
          <label
            for="4"
            class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >Jahr</label
          >
        </div>
      </div>

      <div
        v-if="isLoading"
        class="grid w-full grid-cols-1 justify-items-center"
      >
        <span class="loading loading-dots loading-lg py-2"></span>
      </div>
      <div v-else>
        <div
          v-if="data"
          class="grid grid-cols-1 justify-items-center lg:grid-cols-2"
        >
          <PowerFlowCard
            :home-consumption-power="data.consumed_energy"
            :solar-power="data.solar_produced_energy"
            :grid-imported-energy="data.grid_imported_energy"
            :grid-exported-energy="data.grid_exported_energy"
            unit="kWh"
          >
          </PowerFlowCard>
          <div v-for="(device, index) in data.device_measurements" :key="index">
            <DeviceEnergyCard
              :measurement="device"
              :device="api.getDeviceInfo(device.device_id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { api, IHomeMeasurementDifference } from '@/api/energyAssistant.api';
import PowerFlowCard from '@/components/PowerFlowCard.vue';
import DeviceEnergyCard from '@/components/DeviceEnergyCard.vue';

const timeframe = ref('today');
const data = ref<IHomeMeasurementDifference>();

watch(timeframe, () => {
  const from_date = new Date();

  switch (timeframe.value) {
    case 'week':
      from_date.setDate(from_date.getDate() - 7);
      break;
    case 'month':
      from_date.setMonth(from_date.getMonth() - 1);
      break;
    case 'year':
      from_date.setFullYear(from_date.getFullYear() - 1);
      break;
  }
  loadData(from_date);
});

const loadData = async function (from_date: Date) {
  isLoading.value = true;
  data.value = (
    await api.getHomeMeasurementDifference(from_date, new Date())
  ).data;
  isLoading.value = false;
};

onMounted(() => {
  loadData(new Date());
});

const isLoading = ref(false);

//const { data, isLoading } = useQuery('home_measurements', () => getHomeMeasurementsByDateFn(from_date.value, new Date()));
</script>
