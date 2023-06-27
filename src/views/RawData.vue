<template>
  <div class="v-full flex h-full min-h-screen justify-center p-4">
    <div v-if="isLoading" class="h-full w-full">
      <span class="loading loading-spinner loading-lg m-auto"></span>
    </div>
    <div v-else>
      <MeasurementTable
        :home_measurements="data.home_measurements"
        :show_meter_values="show_meter_values"
      />
      <div class="my-4 flex">
        <label class="label cursor-pointer">
          <input
            id="show-meter-values-checkbox"
            v-model="show_meter_values"
            type="checkbox"
            class="checkbox"
          />
          <label for="show-meter-values-checkbox" class="label-text ml-2">{{
            t('raw_data.show_meter_values')
          }}</label>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getAllHomeMeasurementsFn } from '@/api/measurement.api';
import MeasurementTable from '@/components/MeasurementTable.vue';
import { useQuery } from 'vue-query';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

let show_meter_values_value = false;
const show_meter_values = ref(show_meter_values_value);
//data = await getAllHomeMeasurementsFn();
const { data, isLoading } = useQuery('home_measurements', () =>
  getAllHomeMeasurementsFn(),
);
console.log(data.home_measurements);
</script>
