<template>
  <div
    v-if="supportedPowerModes && supportedPowerModes.length > 1 && powerMode"
    class="bg-subgroup mt-2 w-full items-center rounded-md px-2 pt-1"
  >
    <v-select
      v-model="powerModeModel"
      class="my-4"
      :items="supportedPowerModes.map((mode) => translate(mode))"
      item-title="title"
      item-value="mode"
      single-line
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { api } from '@/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface ITranslatedMode {
  title: string;
  mode: string;
}

function translate(value: string): ITranslatedMode {
  return {
    title: t('power_mode.' + value),
    mode: value,
  };
}

let powerModeModel = ref('device_controlled');

interface Props {
  deviceId: string;
  supportedPowerModes: string[];
  powerMode: string;
}

const props = defineProps<Props>();

watch(powerModeModel, () => {
  if (powerModeModel.value != '') {
    api.setPowerMode(props.deviceId, powerModeModel.value);
  }
});

watch(
  () => props.powerMode,
  (_oldValue, _newValue) => {
    console.log('watch power mode: ' + powerModeModel.value);
    powerModeModel.value = props.powerMode;
  },
);

onMounted(() => {
  powerModeModel.value = props.powerMode;
});
</script>
