<template>
  <v-app>
    <Footer />
    <MainView />

    <reload-prompt v-if="store.isInStandaloneMode" />
  </v-app>
</template>

<script lang="ts" setup>
import MainView from './MainView.vue';
import Footer from './Footer.vue';
import { store } from '@/plugins/store';
import ReloadPrompt from './ReloadPrompt.vue';
</script>
