<template>
  <v-app>
    <Footer />
    <MainView v-if="devicesAPI.state" />
    <v-overlay v-else>
      <v-progress-circular indeterminate size="64" />
    </v-overlay>
    <reload-prompt v-if="store.isInStandaloneMode" />
  </v-app>
</template>
  
<script lang="ts" setup>
import MainView from './View.vue';
import Footer from './Footer.vue';
import { devicesAPI } from '@/api/devices.api';
import { store } from '@/plugins/store';
import ReloadPrompt from './ReloadPrompt.vue';
</script>