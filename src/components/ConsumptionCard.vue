<template>
  <v-card class="elevation-2 m-4 w-80 rounded-md p-4 sm:w-96">
    <v-card-title> {{ $t('consumption') }} </v-card-title>
    <v-card-text>
      <div class="bg-subgroup mt-2 items-center rounded-md p-2">
        <div class="text-left">
          {{ $t('self_sufficiency') }}
          <span class="float-right">{{ formatNumberWithUnit(selfSufficiency, '%') }}</span>
        </div>
        <v-progress-linear color="sun" height="15" rounded :model-value="selfSufficiency"> </v-progress-linear>
      </div>

      <div class="bg-subgroup mt-2 items-center rounded-md p-2">
        <div class="text-left">
          {{ $t('self_consumption') }}
          <span class="float-right">{{ formatNumberWithUnit(selfConsumption, '%') }}</span>
        </div>
        <v-progress-linear color="grid" height="15" rounded :model-value="selfConsumption"> </v-progress-linear>
      </div>
      <div>{{ $t('period.today') }}:</div>
      <div class="bg-subgroup mt-2 items-center rounded-md p-2">
        <div class="text-left">
          {{ $t('self_sufficiency') }}
          <span class="float-right">{{ formatNumberWithUnit(selfSufficiencyToday, '%') }}</span>
        </div>
        <v-progress-linear color="sun" height="15" rounded :model-value="selfSufficiencyToday"> </v-progress-linear>
      </div>

      <div class="bg-subgroup mt-2 items-center rounded-md p-2">
        <div class="text-left">
          {{ $t('self_consumption') }}
          <span class="float-right">{{ formatNumberWithUnit(selfConsumptionToday, '%') }}</span>
        </div>
        <v-progress-linear color="grid" height="15" rounded :model-value="selfConsumptionToday"> </v-progress-linear>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { formatNumberWithUnit } from '@/utils';

interface Props {
  selfSufficiency: number;
  selfConsumption: number;
  selfSufficiencyToday: number;
  selfConsumptionToday: number;
}

defineProps<Props>();
</script>
