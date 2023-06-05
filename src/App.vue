<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl">Energy Assistant</a>
    </div>
    <div class="flex-none">
      <select data-choose-theme class="select w-full max-w-xs">
        <option value="">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>


  </div>
  <EnergyAssistant />
</template>

<script lang="ts" setup>
import EnergyAssistant from './components/EnergyAssistant.vue'
import { themeChange } from 'theme-change'

themeChange(true)
</script>
