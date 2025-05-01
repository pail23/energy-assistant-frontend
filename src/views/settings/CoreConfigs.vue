<template>
  <v-card class="max-w-sm elevation-2 ma-4">
    <v-card-title>{{ $t('settings.about') }}</v-card-title>
    <v-card-item>
      <div class="my-2">
        Energy Assistant Copyright © 2025 by Paul Frank
        <p>Version: {{ version }} </p>
      </div>
    </v-card-item>
  </v-card>


</template>

<script lang="ts" setup>
import { api } from '@/api/energyAssistant.api';
import { onMounted, ref } from 'vue';
import { $t } from '@/plugins/i18n';

const version = ref('');



onMounted(async () => {
  version.value = await api.getVersion();
});
</script>
