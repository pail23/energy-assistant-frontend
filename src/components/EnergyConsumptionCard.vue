<template>
  <v-card class="p-4 m-4 rounded-md elevation-2 w-80 sm:w-96">
    <v-card-title> {{ $t('consumption') }} </v-card-title>
    <v-card-text>
      <div class="items-center p-2 mt-2 rounded-md bg-subgroup">
        <div class="text-left">
          {{ $t('self_sufficiency') }}
          <span class="float-right">{{ formatNumberWithUnit(selfSufficiency, '%') }}</span>
        </div>
        <v-progress-linear color="sun" height="15" rounded :model-value="selfSufficiency" />
      </div>

      <div class="items-center p-2 mt-2 rounded-md bg-subgroup">
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
import {$t} from '@/plugins/i18n';

interface Props {
  selfSufficiency: number;
  selfConsumption: number;
}

defineProps<Props>();
</script>
