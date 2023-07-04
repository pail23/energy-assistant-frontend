<template>
  <div class="v-full flex h-full min-h-screen justify-center p-4">
    <div
      v-if="isLoading"
      class="grid h-full w-full grid-cols-1 justify-items-center"
    >
      <span class="loading loading-dots loading-lg py-2"></span>
    </div>
    <div v-else>
      <HomeMeasurementTable
        :home-measurements="data"
        :show-meter-values="show_meter_values"
      />
      <p class="p-2">Tumbler</p>
      <DeviceMeasurementTable
        v-if="device_measurements"
        :device-measurements="device_measurements"
        :show-meter-values="show_meter_values"
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
import {
  getAllHomeMeasurementsFn,
  api,
  IDeviceMeasurement,
} from '@/api/energyAssistant.api';
import HomeMeasurementTable from '@/components/HomeMeasurementTable.vue';
import DeviceMeasurementTable from '@/components/DeviceMeasurementTable.vue';
import { useQuery } from 'vue-query';
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const device_measurements = ref<IDeviceMeasurement[]>();
const isLoading = ref(false);

let show_meter_values_value = false;
const show_meter_values = ref(show_meter_values_value);
//data = await getAllHomeMeasurementsFn();
const { data } = useQuery('home_measurements', () =>
  getAllHomeMeasurementsFn(),
);
const loadData = async function (id: string) {
  isLoading.value = true;
  device_measurements.value = await api.getDeviceMeasurements(id);
  isLoading.value = false;
};

onMounted(() => {
  loadData('246e6ffa-f3d1-4294-bd19-8aea1a86e53e');
});
console.log(data.home_measurements);
</script>
