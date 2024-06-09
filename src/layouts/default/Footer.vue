<template>
  <BottomNavigation :height="bottomNavHeight" />
</template>

<script setup lang="ts">
import { getBreakpointValue } from '@/plugins/breakpoint';
import BottomNavigation from './BottomNavigation.vue';
import { store } from '@/plugins/store';
import { computed } from 'vue';

const bottomNavHeight = computed(() => {
  if (store.isInStandaloneMode) {
    // for iOS standalone we need extra padding at the bottom due to the apphandle
    return 100;
  }
  return 80;
});
</script>
