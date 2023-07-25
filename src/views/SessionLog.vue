<template>
  <div class="v-full flex h-full min-h-screen justify-center p-4">
    <div
      v-if="isLoading"
      class="grid h-full w-full grid-cols-1 justify-items-center"
    >
      <span class="loading loading-dots loading-lg py-2"></span>
    </div>
    <div v-else>
      <select
        v-model="selectedDevice"
        class="select m-2 w-full max-w-xs"
        @change="onChangeDeviceSelection($event)"
      >
        <option v-for="device in devices" :key="device.id" :value="device.id">
          {{ device.name }}
        </option>
      </select>

      <DeviceSessionLog
        v-if="device_sessionlog"
        :session-log="device_sessionlog"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api, ISessionLogEntry, IDeviceInfo } from '@/api/energyAssistant.api';
import DeviceSessionLog from '@/components/DeviceSessionLog.vue';
import { ref, onMounted } from 'vue';

const device_sessionlog = ref<ISessionLogEntry[]>();
const devices = ref<IDeviceInfo[]>();
const isLoading = ref(false);
const selectedDevice = ref('');

const loadData = async function (id: string) {
  isLoading.value = true;
  device_sessionlog.value = id != '' ? await api.getDeviceSessionLog(id) : [];
  isLoading.value = false;
};

const onChangeDeviceSelection = function (event) {
  console.log(event.target.value);
  loadData(event.target.value);
};

onMounted(async () => {
  devices.value = await api.getAllDevices();
  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0].id;
    loadData(devices.value[0].id);
  }
});
//console.log(data.home_measurements);
</script>
