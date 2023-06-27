<template>
  <header>
    <div class="navbar bg-base-100">
      <div>
        <a class="btn-ghost btn text-xl normal-case">{{
          t('app.energy_assistant')
        }}</a>
      </div>

      <div class="flex-1"></div>

      <div class="flex-none">
        <select data-choose-theme class="select-ghost select w-full max-w-xs">
          <option value="">Light</option>
          <option value="dark">Dark</option>
          <option value="bumblebee">bumblebee</option>
        </select>
      </div>
    </div>
  </header>
  <div class="bg-base-200 pb-20">
    <router-view />
  </div>
  <footer>
    <div class="btm-nav">
      <router-link to="/">{{ t('app.live') }}</router-link>
      <router-link to="/history">{{ t('app.statistics') }}</router-link>
      <router-link to="/rawdata">{{ t('app.raw_data') }}</router-link>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { themeChange } from 'theme-change';
import { devicesAPI } from '@/api/devices.api';
import { api } from '@/api/measurement.api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

onMounted(() => {
  themeChange(true);
  let serverAddress = '';
  if (process.env.NODE_ENV === 'development') {
    serverAddress = localStorage.getItem('mass_debug_address') || '';
    if (!serverAddress) {
      serverAddress =
        prompt(
          'Enter location of the Music Assistant server',
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
  api.initialize(serverAddress);
});
</script>
