<template>
  <v-card class="elevation-2 ma-4 pa-4 w-80 rounded-md sm:w-96">
    <v-card-title> {{ $t('consumption') }} </v-card-title>
    <v-card-text>
      <div class="bg-subgroup pa-2 mt-2 items-center rounded-md">
        <div class="text-left">
          {{ $t('self_sufficiency') }}
          <span class="float-right">{{ formatNumberWithUnit(selfSufficiency, '%') }}</span>
        </div>
        <v-progress-linear color="sun" height="15" rounded :model-value="selfSufficiency" />
      </div>

      <div class="bg-subgroup pa-2 mt-2 items-center rounded-md">
        <div class="text-left">
          {{ $t('self_consumption') }}
          <span class="float-right">{{ formatNumberWithUnit(selfConsumption, '%') }}</span>
        </div>
        <v-progress-linear color="grid" height="15" rounded :model-value="selfConsumption" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { formatNumberWithUnit } from '@/utils';
import { $t } from '@/plugins/i18n';

interface Props {
  selfSufficiency: number;
  selfConsumption: number;
}

defineProps<Props>();
</script>
