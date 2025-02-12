<template>
  <div>
    <v-toolbar color="transparent" :title="getBreakpointValue('bp2') ? $t('app.sessionlog') : ''">
      <template #append>
        <select
          v-model="selectedDevice"
          class="select bg-surface m-2 w-full max-w-xs"
          @change="onChangeDeviceSelection($event)"
        >
          <option v-for="device in devices" :key="device.id" :value="device.id">
            {{ device.name }}
          </option>
        </select>
      </template>
    </v-toolbar>
    <v-divider />
    <div class="v-full bg-background flex min-h-screen justify-center p-4">
      <div v-if="isLoading" class="flex h-full w-full justify-items-center">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <div v-else>
        <DeviceSessionLog v-if="device_sessionlog" :session-log="device_sessionlog" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api, ISessionLogEntry, IDeviceInfo } from '@/api/energyAssistant.api';
import DeviceSessionLog from '@/components/DeviceSessionLog.vue';
import { ref, onMounted } from 'vue';
import { getBreakpointValue } from '@/plugins/breakpoint';
import { $t } from '@/plugins/i18n';

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
  devices.value = await api.getAllDevices(true);
  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0].id;
    loadData(devices.value[0].id);
  }
});
</script>
