<template>
  <div class="navbar bg-base-100 ">
    <div>
      <a class="btn btn-ghost normal-case text-xl">Energy Assistant</a>
    </div>

    <div class="flex-1">
      <!-- <div class="join mx-auto">
        <input class="btn join-item w-16" type="radio" name="options" aria-label="Live" checked />
        <input class="btn join-item w-16" type="radio" name="options" aria-label="Heute" />
        <input class="btn join-item w-16" type="radio" name="options" aria-label="Woche" />
        <input class="btn join-item w-16" type="radio" name="options" aria-label="Monat" />
        <input class="btn join-item w-16" type="radio" name="options" aria-label="Jahr" />
        <input class="btn join-item w-16" type="radio" name="options" aria-label="Gesamt" />
      </div>-->


    </div>

    <div class="flex-none">
      <select data-choose-theme class="select select-ghost w-full max-w-xs">
        <option value="">Light</option>
        <option value="dark">Dark</option>
        <option value="bumblebee">bumblebee</option>
      </select>
    </div>


  </div>
  <!--  <EnergyAssistant />-->
  <router-view />
  <div class="btm-nav">
    <router-link to="/">Live</router-link>
    <router-link to="/today">Heute</router-link>
    <router-link to="/week">Woche</router-link>
    <router-link to="/month">Monat</router-link>
    <router-link to="/overall">Overall</router-link>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { themeChange } from 'theme-change'

onMounted(() => {
  themeChange(true)
});
</script>
