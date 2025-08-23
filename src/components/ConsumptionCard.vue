<template>
  <v-card class="elevation-2 ma-4 pa-4 card-fixed-width">
    <v-card-title> {{ $t('consumption') }} </v-card-title>
    <v-card-text>
      <div class="bg-subgroup pa-2 mt-2 items-center rounded-md">
        <div class="text-left">
          {{ $t('self_sufficiency') }}
          <span class="float-right">{{ formatNumberWithUnit(selfSufficiency, '%') }}</span>
        </div>
        <v-progress-linear color="sun" height="15" rounded :model-value="selfSufficiency" />
      </div>

      <div class="pa-2 bg-subgroup mt-2 items-center rounded-md">
        <div class="text-left">
          {{ $t('self_consumption') }}
          <span class="float-right">{{ formatNumberWithUnit(selfConsumption, '%') }}</span>
        </div>
        <v-progress-linear color="grid" height="15" rounded :model-value="selfConsumption" />
      </div>
      <div>{{ $t('period.today') }}:</div>
      <div class="pa-2 bg-subgroup mt-2 items-center rounded-md">
        <div class="text-left">
          {{ $t('self_sufficiency') }}
          <span class="float-right">{{ formatNumberWithUnit(selfSufficiencyToday, '%') }}</span>
        </div>
        <v-progress-linear color="sun" height="15" rounded :model-value="selfSufficiencyToday" />
      </div>

      <div class="pa-2 bg-subgroup mt-2 items-center rounded-md">
        <div class="text-left">
          {{ $t('self_consumption') }}
          <span class="float-right">{{ formatNumberWithUnit(selfConsumptionToday, '%') }}</span>
        </div>
        <v-progress-linear color="grid" height="15" rounded :model-value="selfConsumptionToday" />
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
  selfSufficiencyToday: number;
  selfConsumptionToday: number;
}

defineProps<Props>();
</script>

<style scoped>
.card-fixed-width {
  width: 320px;
}

@media (min-width: 600px) {
  .card-fixed-width {
    width: 384px;
  }
}
</style>
