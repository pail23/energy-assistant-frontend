<template>
  <div>
    <v-toolbar
      color="transparent"
      :title="getBreakpointValue('bp4') ? $t('app.statistics') : ''"
    >
      <template #append>
        <v-tabs v-model="activeTab" align-tabs="end" height="100%">
          <v-tab value="today">
            {{ $t('statistics.today') }}
          </v-tab>
          <v-tab value="week">
            {{ $t('statistics.week') }}
          </v-tab>
          <v-tab value="month">
            {{ $t('statistics.month') }}
          </v-tab>
          <v-tab value="year">
            {{ $t('statistics.year') }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-divider />
    <div class="flex min-h-screen w-full justify-center">
      <div
        v-if="isLoading"
        class="grid w-full grid-cols-1 justify-items-center"
      >
        <span class="loading loading-dots loading-lg py-2"></span>
      </div>
      <div v-else>
        <div v-if="data" class="grid grid-cols-1 lg:grid-cols-2 p-4">
          <PowerFlowCard
            :home-consumption-power="data.consumed_energy"
            :solar-power="data.solar_produced_energy"
            :grid-imported-energy="data.grid_imported_energy"
            :grid-exported-energy="data.grid_exported_energy"
            unit="kWh"
          >
          </PowerFlowCard>
          <WeeklyStatisticsCard
            v-if="activeTab == 'week' && statistics != null"
            :data="statistics"
          >
          </WeeklyStatisticsCard>
          <div v-for="(device, index) in data.device_measurements" :key="index">
            <DeviceEnergyCard
              :measurement="device"
              :device="api.getDeviceInfo(device.device_id)"
              :statistics="statistics"
              :timeframe="activeTab"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch, ref, onMounted } from 'vue';
import {
  api,
  IHomeMeasurementPeriod,
  IHomeMeasurementDate,
} from '@/api/energyAssistant.api';
import { getBreakpointValue } from '@/plugins/breakpoint';
import { useRouter } from 'vue-router';
import PowerFlowCard from '@/components/PowerFlowCard.vue';
import DeviceEnergyCard from '@/components/DeviceEnergyCard.vue';
import WeeklyStatisticsCard from '@/components/WeeklyStatisticsCard.vue';

// global refs
const router = useRouter();
const data = ref<IHomeMeasurementPeriod>();
const statistics = ref<IHomeMeasurementDate[]>();
const isLoading = ref(false);

// computed properties
const activeTab = ref('today'); /* computed(() => {
  if (router.currentRoute.value.name?.toString().includes('today')) {
    return 'today';
  }
  if (router.currentRoute.value.name?.toString().includes('week')) {
    return 'week';
  }
  if (router.currentRoute.value.name?.toString().includes('month')) {
    return 'month';
  }
  return 'year';
});
*/
watch(activeTab, () => {
  const from_date = new Date();

  switch (activeTab.value) {
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
  console.log('Load ' + from_date.toString());
  loadData(from_date);
});

onMounted(() => {
  loadData(new Date());
});

const loadData = async function (from_date: Date) {
  isLoading.value = true;
  data.value = (
    await api.getHomeMeasurementDifference(from_date, new Date())
  ).data;
  statistics.value = await api.getDailyMeasurements(from_date, new Date());
  isLoading.value = false;
};
</script>
