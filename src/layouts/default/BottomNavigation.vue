<template>
  <v-bottom-navigation height="80" grow>
    <v-tabs stacked :show-arrows="false" :model-value="activeTab" center-active nav color="accent">
      <v-tab v-for="menuItem of mainMenuItems" :key="menuItem.path" :to="menuItem.path" :value="menuItem.path">
        <v-icon size="xx-large">
          {{ menuItem.icon }}
        </v-icon>
        <span class="menuButton">{{ t(menuItem.label) }}</span>
      </v-tab>
    </v-tabs>
  </v-bottom-navigation>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import router from '@/plugins/router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

const mainMenuItems: MenuItem[] = [
  // disable Home until we have something useful to fill that screen
  {
    label: 'app.home',
    icon: 'mdi-home-outline',
    path: '/home',
  },
  {
    label: 'app.statistics',
    icon: 'mdi-chart-line',
    path: '/history',
  },
  {
    label: 'app.forecast',
    icon: 'mdi-chart-bell-curve',
    path: '/forecast',
  },
  {
    label: 'app.sessionlog',
    icon: 'mdi-format-list-numbered',
    path: '/sessionlog',
  },
  {
    label: 'app.rawdata',
    icon: 'mdi-database',
    path: '/rawdata',
  },
  {
    label: 'app.settings',
    icon: 'mdi-cog-outline',
    path: '/settings',
  },
];

export interface Props {
  height: number;
}
defineProps<Props>();

const activeTab = computed(() => {
  for (const menuItem of mainMenuItems) {
    if (router.currentRoute.value.path.startsWith(menuItem.path)) {
      return menuItem.path;
    }
  }
  return '';
});
</script>

<style>
.menuButton {
  font-weight: 300;
  font-size: x-small;
  font-stretch: condensed;
  text-transform: none;
  margin-top: 5px;
}

.v-slide-group-item--active {
  opacity: 100%;
}
</style>
