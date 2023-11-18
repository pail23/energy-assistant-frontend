<template>
  <div>
    <v-toolbar
      color="transparent"
      :title="getBreakpointValue('bp4') ? $t('settings.settings') : ''"
    >
      <template #append>
        <v-tabs :model-value="activeTab" align-tabs="end" height="100%">
          <v-tab value="devices" :to="{ name: 'devicessettings' }">
            {{ $t('settings.devices') }}
          </v-tab>
          <v-tab value="forecast" :to="{ name: 'forecastsettings' }">
            {{ $t('settings.forecast') }}
          </v-tab>
          <v-tab value="core" :to="{ name: 'coresettings' }">
            {{ $t('settings.core') }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-divider />
    <!-- some spacing -->
    <div style="height: 15px"></div>
    <router-view v-slot="{ Component }">
      <component :is="Component" />
      <!-- transition temporary disabled as it renders the view unusable somehow? -->
      <!-- <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition> -->
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { getBreakpointValue } from '@/plugins/breakpoint';

// global refs
const router = useRouter();

// computed properties
const activeTab = computed(() => {
  if (router.currentRoute.value.name?.toString().includes('forecast')) {
    return 'forecast';
  }
  if (router.currentRoute.value.name?.toString().includes('core')) {
    return 'core';
  }
  return 'devices';
});
</script>
