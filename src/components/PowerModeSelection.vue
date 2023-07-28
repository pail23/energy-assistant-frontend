<template>
  <div
    v-if="
      device.supported_power_modes && device.supported_power_modes.length > 1
    "
    class="mt-2 w-full items-center rounded-md bg-base-200 p-2"
  >
    <select
      v-model="power_mode"
      class="select w-full"
      @change="onChange($event)"
    >
      <option
        v-for="mode in device.supported_power_modes"
        :key="mode"
        :value="mode"
      >
        {{ t('power_mode.' + mode) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { IDeviceInfo } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const power_mode = ref('device_controlled');

interface Props {
  device: IDeviceInfo;
}

const props = defineProps<Props>();

const onChange = function (event) {
  console.log(event.target.value);
  console.log('power mode: ' + power_mode.value);
};

onMounted(() => {
  power_mode.value = props.device.power_mode;
  console.log('power mode: ' + power_mode.value);
})
</script>
