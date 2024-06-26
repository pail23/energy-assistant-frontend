<template>
  <v-navigation-drawer
    v-if="getBreakpointValue({ breakpoint: 'bp3' })"
    ref="resizeComponent"
    app
    :permanent="!$vuetify.display.mobile"
    :rail="!$vuetify.display.mobile && !showNavigationMenu"
    :model-value="($vuetify.display.mobile && showNavigationMenu) || !$vuetify.display.mobile"
    :width="!getBreakpointValue('mobile') ? 200 : 250"
    @update:model-value="
      (e) => {
        if ($vuetify.display.mobile) showNavigationMenu = e;
      }
    "
  >
    <v-list-item dark style="height: 55px" :active="false">
      <template #prepend>
        <img
          class="logo_icon"
          :style="$vuetify.theme.current.dark ? 'filter: invert(100%);' : ''"
          width="35"
          src="@/assets/logo.svg"
        />
      </template>
      <template #title>
        <div class="logo_text">Energy Assistant</div>
      </template>
    </v-list-item>
    <v-divider />

    <!-- menu items -->
    <v-list lines="one" density="compact" nav>
      <v-list-item
        v-for="menuItem of mainMenuItems"
        :key="menuItem.path"
        nav
        density="compact"
        :height="15"
        :title="t(menuItem.label)"
        :prepend-icon="menuItem.icon"
        :to="menuItem.path"
      />
    </v-list>
    <!-- button at bottom to collapse/expand the navigation drawer-->
    <Button
      nav
      :height="15"
      :width="40"
      style="position: relative; float: right; right: 10px; top: 20px"
      :ripple="false"
      :icon="showNavigationMenu ? 'mdi-chevron-left' : 'mdi-chevron-right'"
      :title="t('tooltip.show_menu')"
      @click.stop="showNavigationMenu = !showNavigationMenu"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { getBreakpointValue } from '@/plugins/breakpoint';
import { store } from '@/plugins/store';
import { ref, watch } from 'vue';
import Button from '@/components/mods/Button.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const showNavigationMenu = ref(false);

watch(
  () => showNavigationMenu.value,
  (isShown) => {
    isShown ? (store.navigationMenuSize = !getBreakpointValue('mobile') ? 200 : 250) : (store.navigationMenuSize = 55);
  },
);
</script>

<script lang="ts">

export interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

export const mainMenuItems: MenuItem[] = [
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
</script>

<style>
.logo_text {
  margin-left: 25px;
  font-family: 'JetBrains Mono Medium';
  font-size: 55;
  font-weight: 500;
}

.logo_icon {
  margin-left: -5px;
  border-radius: 4px;
}
</style>
