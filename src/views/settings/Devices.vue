<template>
  <div class="bg-background grid grid-cols-1 p-4 md:grid-cols-2 xl:grid-cols-4">
    <div v-for="(device, index) in devices" :key="index">
      <v-card v-if="device.id != '9c0e0865-f3b0-488f-8d3f-b3b0cdda5de7'" class="elevation-2 m-4 max-w-sm">
        <v-card-title>
          <span class="mdi pr-2" :class="device.icon" />
          <span class="">{{ device.name }}</span>
        </v-card-title>
        <v-card-actions>
          <v-btn class="m-2" @click="editDevice(device.id)">
            {{ $t('settings.edit_action') }}
          </v-btn>
          <v-btn class="m-2" @click="deleteDevice(device.id)">
            {{ $t('settings.delete_action') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text> Please remove the device manually from the config file. </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { api, IDeviceInfo } from '@/api/energyAssistant.api';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {$t} from '@/plugins/i18n';

const router = useRouter();

const devices = ref<IDeviceInfo[]>();
const dialog = ref<boolean>(false);

const deleteDevice = async function (deviceId: string) {
  await api.deleteDevice(deviceId);
  devices.value = await api.getAllDevices(false);
  dialog.value = true;
  //  alert('Please remove the device manually from the config file.');
};

const editDevice = function (deviceId: string) {
  //if (deviceId in api.devices) {
  // only allow edit if device is alive/available
  router.push(`/settings/editdevice/${deviceId}`);
  //}
};

onMounted(async () => {
  devices.value = await api.getAllDevices(false);
});
</script>
