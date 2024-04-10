<template>
  <div>
    <v-toolbar
      color="transparent"
      :title="getBreakpointValue('bp4') ? $t('app.settings') : ''"
    >
      <template #append>
        <v-tabs
          :model-value="activeTab"
          align-tabs="end"
          height="100%"
        >
          <v-tab
            value="devices"
            :to="{ name: 'devicessettings' }"
          >
            {{ $t('settings.devices') }}
          </v-tab>
          <v-tab
            value="forecast"
            :to="{ name: 'forecastsettings' }"
          >
            {{ $t('settings.forecast') }}
          </v-tab>
          <v-tab
            value="core"
            :to="{ name: 'coresettings' }"
          >
            {{ $t('settings.core') }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-divider />
    <!-- some spacing -->
    <div style="height: 15px" />
    <router-view v-slot="{ Component }">
      <component :is="Component" />
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
