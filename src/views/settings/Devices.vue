<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 p-4 bg-background">
    <div v-for="(device, index) in devices" :key="index">
      <v-card
        v-if="device.id != '9c0e0865-f3b0-488f-8d3f-b3b0cdda5de7'"
        class="m-4 max-w-sm elevation-6"
      >
        <v-card-title>
          <span class="mdi pr-2" :class="device.icon"></span>
          <span class="">{{ device.name }}</span>
        </v-card-title>
        <v-card-actions>
          <v-btn class="m-2" @click="DeleteDevice(device.id)">
            {{ $t('settings.delete_action') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api, IDeviceInfo } from '@/api/energyAssistant.api';
import { ref, onMounted } from 'vue';

const devices = ref<IDeviceInfo[]>();

const DeleteDevice = async function (id: string) {
  alert('Delete Device ' + id + ' is not yet implemented.');
};

onMounted(async () => {
  devices.value = await api.getAllDevices(false);
});
</script>
