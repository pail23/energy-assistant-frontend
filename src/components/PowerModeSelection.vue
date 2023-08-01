<template>
  <div
    v-if="supportedPowerModes && supportedPowerModes.length > 1 && powerMode"
    class="mt-2 w-full items-center rounded-md bg-base-200 p-2"
  >
    <select
      v-model="powerModeModel"
      class="select w-full"
      @change="onChange($event)"
    >
      <option v-for="mode in supportedPowerModes" :key="mode" :value="mode">
        {{ t('power_mode.' + mode) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { api } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

let powerModeModel = ref('device_controlled');

interface Props {
  deviceId: string;
  supportedPowerModes: string[];
  powerMode: string;
}

const props = defineProps<Props>();

const onChange = function (event) {
  console.log(event.target.value);
  console.log('on change power mode: ' + powerModeModel.value);
  api.setPowerMode(props.deviceId, powerModeModel.value);
};

watch(
  () => props.powerMode,
  (_oldValue, _newValue) => {
    console.log('watch power mode: ' + powerModeModel.value);
    powerModeModel.value = props.powerMode;
  },
);

onMounted(() => {
  powerModeModel.value = props.powerMode;
  console.log('onMounted power mode: ' + powerModeModel.value);
});
</script>
