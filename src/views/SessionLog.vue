<template>
  <div>
    <v-toolbar color="transparent" :title="getBreakpointValue('bp2') ? $t('app.sessionlog') : ''">
      <template #append>
        <v-select
          v-model="selectedDevice"
          class="bg-surface ma-2"
          :items="devices ? devices : []"
          item-title="name"
          item-value="id"
          @update:model-value="onChangeDeviceSelection"
        />
      </template>
    </v-toolbar>
    <v-divider />
    <div class="pa-4 v-full bg-background d-flex min-height-screen justify-center">
      <div v-if="isLoading" class="d-flex h-100 w-100 justify-center">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <div v-else>
        <DeviceSessionLog v-if="device_sessionlog" :session-log="device_sessionlog" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import type { ISessionLogEntry, IDeviceInfo } from '@/api/types';
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

const onChangeDeviceSelection = function (deviceId: string) {
  console.log(deviceId);
  loadData(deviceId);
};

onMounted(async () => {
  devices.value = await api.getAllDevices(true);
  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0].id;
    loadData(devices.value[0].id);
  }
});
</script>
