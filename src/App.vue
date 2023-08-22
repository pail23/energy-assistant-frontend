<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { devicesAPI } from '@/api/devices.api';
import { api } from '@/api/energyAssistant.api';
import { useTheme } from 'vuetify';
import { store } from './plugins/store';

const theme = useTheme();

onMounted(async () => {
  // @ts-ignore
  store.isInStandaloneMode = window.navigator.standalone || false;
  // enable dark mode based on OS/browser config
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      const newColorScheme = event.matches ? 'dark' : 'light';
      theme.global.name.value = newColorScheme;
    });

  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    // dark mode is enabled
    theme.global.name.value = 'dark';
  }

  let serverAddress = '';
  if (process.env.NODE_ENV === 'development') {
    serverAddress = localStorage.getItem('mass_debug_address') || '';
    if (!serverAddress) {
      serverAddress =
        prompt(
          'Enter location of the Energy Assistant server',
          window.location.origin.replace('3000', '8095'),
        ) || '';
      localStorage.setItem('mass_debug_address', serverAddress);
    }
  } else {
    const loc = window.location;
    serverAddress = loc.origin + loc.pathname;
  }

  console.error('Server address: ' + serverAddress);
  devicesAPI.initialize(serverAddress);
  await api.initialize(serverAddress);
});
</script>
