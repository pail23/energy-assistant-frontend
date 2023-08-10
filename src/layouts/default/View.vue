<template>
    <v-main id="cont" class="overflow-y-auto" style="height: 0px">
      <drawer-navigation />
      <router-view v-slot="{ Component }" app>
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </template>
  
  <script lang="ts" setup>
  import DrawerNavigation from './DrawerNavigation.vue';
  </script>