<template>
  <v-main id="cont" class="overflow-y-auto" style="height: 0px">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-main>
</template>

<script lang="ts" setup>
</script>
