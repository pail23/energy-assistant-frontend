<template>
  <v-app>
    <Footer />
    <MainView v-if="!notConnected" />
    <v-overlay v-model="notConnected" class="justify-center align-center">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <reload-prompt v-if="store.isInStandaloneMode" />
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import MainView from './MainView.vue';
import Footer from './Footer.vue';
import { devicesAPI } from '@/api/devices.api';
import { store } from '@/plugins/store';
import ReloadPrompt from './ReloadPrompt.vue';

const notConnected = computed(() => {
  return !devicesAPI.state.connected;
});
</script>
