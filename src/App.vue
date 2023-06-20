<template>
  <header>
    <div class="navbar bg-base-100 ">
      <div>
        <a class="btn btn-ghost normal-case text-xl">Energy Assistant</a>
      </div>

    <div class="flex-1">



    </div>

      <div class="flex-none">
        <select data-choose-theme class="select select-ghost w-full max-w-xs">
          <option value="">Light</option>
          <option value="dark">Dark</option>
          <option value="bumblebee">bumblebee</option>
        </select>
      </div>


    </div>
  </header>
  <router-view />
  <footer>
    <div class="btm-nav">
      <router-link to="/">Live</router-link>
      <router-link to="/history">Vergangenheit</router-link>
      <router-link to="/rawdata">Daten</router-link>
    </div>
  </footer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { themeChange } from 'theme-change'
import {devicesAPI} from '@/api/devices.api'
import {api} from '@/api/measurement.api'

onMounted(() => {
  themeChange(true)
  let serverAddress = '';
  if (process.env.NODE_ENV === 'development') {
    serverAddress = localStorage.getItem('mass_debug_address') || '';
    if (!serverAddress) {
      serverAddress =
        prompt('Enter location of the Music Assistant server', window.location.origin.replace('3000', '8095')) || '';
      localStorage.setItem('mass_debug_address', serverAddress);
    }
  } else {
    const loc = window.location;
    serverAddress = loc.origin + loc.pathname;
  }

  console.error("Server address: " + serverAddress)
  devicesAPI.initialize(serverAddress)
  api.initialize(serverAddress)

});
</script>
