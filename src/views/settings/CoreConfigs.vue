<template>
  <v-card class="elevation-2 ma-4 max-w-sm">
    <v-card-title>{{ $t('settings.device_control') }}</v-card-title>
    <v-card-item>
      <v-switch v-model="disableDeviceControl" :label="$t('settings.disableDeviceControl')" />
    </v-card-item>
  </v-card>
  <v-card class="elevation-2 ma-4 max-w-sm">
    <v-card-title>{{ $t('settings.about') }}</v-card-title>
    <v-card-item>
      <div class="my-2">
        Energy Assistant Copyright © 2025 by Paul Frank
        <p>Version: {{ version }}</p>
      </div>
    </v-card-item>
  </v-card>
</template>

<script lang="ts" setup>
import { api } from '@/api/energyAssistant.api';
import { onMounted, ref, watch } from 'vue';
import { $t } from '@/plugins/i18n';

const version = ref('');
const disableDeviceControl = ref(false);

watch(disableDeviceControl, () => {
  api.setDeviceControlDisabled(disableDeviceControl.value);
});

onMounted(async () => {
  version.value = await api.getVersion();
  disableDeviceControl.value = (await api.getDeviceControlDisabled()).disable_device_control;
});
</script>
