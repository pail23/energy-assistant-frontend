<template>
  <v-card class="elevation-2 ma-4 pa-4 rounded-md">
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" :label="$t('settings.name')" type="input" />
        <v-text-field v-if="'power' in config" v-model="power" :label="$t('settings.power')" type="text" />
        <v-text-field v-if="'energy' in config" v-model="energy" :label="$t('settings.energy')" type="text" />
        <v-text-field v-if="'output' in config" v-model="output" :label="$t('settings.output')" type="text" />

        <v-text-field
          v-if="'nominal_power' in config"
          v-model="nominal_power"
          :label="$t('settings.nominal_power') + ' [W]'"
          type="number"
        />
        <v-text-field
          v-if="'nominal_duration' in config"
          v-model="nominal_duration"
          :label="$t('settings.nominal_duration') + ' [min]'"
          type="number"
        />
        <v-text-field
          v-if="'switch_on_delay' in config"
          v-model="switch_on_delay"
          :label="$t('settings.switch_on_delay') + ' [min]'"
          type="number"
        />
        <v-text-field
          v-if="'switch_off_delay' in config"
          v-model="switch_off_delay"
          :label="$t('settings.switch_off_delay') + ' [min]'"
          type="number"
        />
        <v-text-field
          v-if="'min_on_duration' in config"
          v-model="min_on_duration"
          :label="$t('settings.min_on_duration') + ' [min]'"
          type="number"
        />
        <v-text-field
          v-if="'max_on_per_day' in config"
          v-model="max_on_per_day"
          :label="$t('settings.max_on_per_day') + ' [min]'"
          type="number"
        />
        <v-btn block color="primary" @click="submit">
          {{ $t('settings.save') }}
        </v-btn>
      </v-form>
      <br />
      <v-btn block @click="router.back()">
        {{ $t('close') }}
      </v-btn>
    </v-card-text>
  </v-card>
  <br />
  <v-card class="pa-4 ma-4 elevation-2 rounded-md">
    <v-card-title>Values which can only be edit in the energy_assistant.yaml file</v-card-title>
    <v-card-text>
      <v-table class="ma-4 rounded-md border">
        <tbody>
          <tr v-for="(value, key) in readOnlyConfig" :key="key" class="border text-left">
            <td class="border px-6 py-4">
              {{ key }}
            </td>
            <td class="border px-6 py-4">
              {{ value }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { api } from '@/api/energyAssistant.api';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { $t } from '@/plugins/i18n';

interface IDeviceConfigParams {
  name: string;
  power: string;
  energy: string;
  output: string;
  nominal_power: number; // in Watts
  nominal_duration: number; // in seconds
  switch_on_delay: number; // in seconds
  switch_off_delay: number; // in seconds
  min_on_duration: number; // in seconds
  max_on_per_day: number; // in seconds
}

// global refs
const router = useRouter();
const config = ref({});
const readOnlyConfig = ref({});
const name = ref<string>('');
const power = ref<string>('');
const energy = ref<string>('');
const output = ref<string>('');

const nominal_power = ref<number>(0);
const nominal_duration = ref<number>(0);
const switch_on_delay = ref<number>(0);
const switch_off_delay = ref<number>(0);
const min_on_duration = ref<number>(0);
const max_on_per_day = ref<number>(0);
// props
const props = defineProps<{
  deviceId?: string;
}>();

// watchers

watch(
  () => props.deviceId,
  async (val) => {
    if (val) {
      console.log('Edit Device: ' + val);
      const data = await api.getDeviceConfig(val);
      config.value = data;
      name.value = data['name'];
      power.value = data['power'];
      energy.value = data['energy'];
      output.value = data['output'];
      nominal_power.value = parseFloat(data['nominal_power']) * 1.0;
      nominal_duration.value = parseFloat(data['nominal_duration']) / 60; // convert seconds to minutes
      switch_on_delay.value = parseFloat(data['switch_on_delay']) / 60;
      switch_off_delay.value = parseFloat(data['switch_off_delay']) / 60;
      min_on_duration.value = parseFloat(data['min_on_duration']) / 60;
      max_on_per_day.value = parseFloat(data['max_on_per_day']) / 60;

      const configurableKeys = new Set<string>([
        'name',
        'power',
        'energy',
        'output',
        'nominal_power',
        'nominal_duration',
        'switch_on_delay',
        'switch_off_delay',
        'min_on_duration',
        'max_on_per_day',
      ]);
      const readOnlyKeys = Object.keys(data).filter((k) => !configurableKeys.has(k));
      const readOnlyValues = {};
      readOnlyKeys.forEach((key) => {
        readOnlyValues[key] = data[key];
      });
      readOnlyConfig.value = readOnlyValues;
    }
  },
  { immediate: true },
);

// methods
const submit = async function () {
  const values: IDeviceConfigParams = {
    name: name.value,
    // energy: energy.value,
    power: power.value,
    output: output.value,
    nominal_power: +nominal_power.value, // the + operator converts the value to a number
    nominal_duration: nominal_duration.value * 60, // convert minutes to seconds
    switch_on_delay: switch_on_delay.value * 60,
    switch_off_delay: switch_off_delay.value * 60,
    min_on_duration: min_on_duration.value * 60,
    max_on_per_day: max_on_per_day.value * 60,
  };
  console.log('Saving device config: ', values);
  await api.saveDeviceConfig(props.deviceId!, values);

  router.push({ name: 'devicessettings' });
};
</script>
