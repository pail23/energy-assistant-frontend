<template>
  <div>
    <v-toolbar color="transparent" :title="$t('app.rawdata')" />
    <v-divider />
    <div class="flex justify-center min-h-screen p-4 v-full bg-background">
      <div v-if="isLoading" class="grid w-full h-full grid-cols-1 justify-items-center">
        <span class="py-2 loading loading-dots loading-lg" />
      </div>
      <div v-else>
        <HomeMeasurementTable v-if="data" :home-measurements="data" :show-meter-values="show_meter_values" />
        <!--<select v-model="selectedDevice" class="w-full max-w-xs m-2 select" @change="onChangeDeviceSelection($event)">
        <option v-for="device in devices" :key="device.id" :value="device.id">
          {{ device.name }}
        </option>
      </select> -->

        <v-select
          v-model="selectedDevice"
          class="my-4 rounded-md bg-surface"
          :items="devices ? devices : []"
          item-title="name"
          item-value="id"
          single-line
        />

        <DeviceMeasurementTable
          v-if="device_measurements"
          :device-measurements="device_measurements"
          :show-meter-values="show_meter_values"
        />
        <div class="flex my-4">
          <v-checkbox v-model="show_meter_values" :label="$t('raw_data.show_meter_values')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api, IDeviceMeasurement, IDeviceInfo, IHomeMeasurement } from '@/api/energyAssistant.api';
import HomeMeasurementTable from '@/components/HomeMeasurementTable.vue';
import DeviceMeasurementTable from '@/components/DeviceMeasurementTable.vue';
import { ref, onMounted, watch } from 'vue';
import {$t} from '@/plugins/i18n';


const device_measurements = ref<IDeviceMeasurement[]>();
const data = ref<IHomeMeasurement[]>();
const devices = ref<IDeviceInfo[]>();
const isLoading = ref(false);
const selectedDevice = ref('');

let show_meter_values_value = false;
const show_meter_values = ref(show_meter_values_value);

const loadData = async function (id: string) {
  isLoading.value = true;
  data.value = await api.getAllHomeMeasurements();
  device_measurements.value = id != '' ? await api.getDeviceMeasurements(id) : [];
  isLoading.value = false;
};

watch(selectedDevice, () => {
  console.log('Change selection: ' + selectedDevice.value);
  loadData(selectedDevice.value);
});

onMounted(async () => {
  devices.value = await api.getAllDevices();
  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0].id;
    console.log('Load in on mounted: ' + devices.value[0].id);
    loadData(devices.value[0].id);
  }
});
</script>
