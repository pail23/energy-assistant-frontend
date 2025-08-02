<template>
  <v-card class="elevation-2 ma-4 pa-4 rounded-md">
    <v-card-text>
      <v-form>
        <v-text-field v-model="name" :label="$t('settings.name')" type="input" />
        <v-text-field
          v-model="icon"
          :label="$t('settings.device_icon')"
          type="text"
          placeholder="mdi-home"
          hint="e.g., mdi-home, mdi-car, mdi-heat-pump"
          persistent-hint
        />
        <div
          v-if="
            type === 'homeassistant' ||
            type === 'readonly-homeassistant' ||
            type === 'homeassistant' ||
            type === 'readonly-homeassistant' ||
            type === 'homeassistant' ||
            type === 'sg-ready-heat-pump' ||
            'heating' in config ||
            'water' in config
          "
        >
          <v-divider />
          <p class="config-subtitle">
            {{ $t('settings.home_assistant_entity_ids') }}
          </p>
          <v-text-field
            v-if="type === 'homeassistant' || type === 'readonly-homeassistant'"
            v-model="power"
            :label="$t('settings.power')"
            type="text"
          />
          <v-text-field
            v-if="type === 'homeassistant' || type === 'readonly-homeassistant'"
            v-model="energy"
            :label="$t('settings.energy')"
            type="text"
          />
          <v-text-field
            v-if="type === 'homeassistant' || type === 'sg-ready-heat-pump'"
            v-model="output"
            :label="$t('settings.output')"
            type="text"
          />

          <!-- SG Ready Heat Pump specific fields -->
          <div v-if="type === 'sg-ready-heat-pump'">
            <!-- Heating Section -->
            <p class="text-subtitle-2 mt-4 mb-2">
              {{ $t('settings.heating') }}
            </p>
            <v-text-field
              v-model="heatingState"
              :label="$t('settings.state')"
              type="text"
              placeholder="sensor.heating_state"
              hint="Entity ID for heating state"
              persistent-hint
              class="mb-2"
            />
            <v-text-field
              v-model="heatingEnergy"
              :label="$t('settings.energy')"
              type="text"
              placeholder="sensor.heating_energy"
              hint="Entity ID for heating energy"
              persistent-hint
              class="mb-2"
            />
            <v-text-field
              v-model="heatingTemperature"
              :label="$t('settings.temperature')"
              type="text"
              placeholder="sensor.heating_temperature"
              hint="Entity ID for heating temperature"
              persistent-hint
              class="mb-2"
            />

            <!-- Water Section -->
            <p class="text-subtitle-2 mt-4 mb-2">
              {{ $t('settings.water') }}
            </p>
            <v-text-field
              v-model="waterState"
              :label="$t('settings.state')"
              type="text"
              placeholder="sensor.water_state"
              hint="Entity ID for water heating state"
              persistent-hint
              class="mb-2"
            />
            <v-text-field
              v-model="waterEnergy"
              :label="$t('settings.energy')"
              type="text"
              placeholder="sensor.water_energy"
              hint="Entity ID for water heating energy"
              persistent-hint
              class="mb-2"
            />
            <v-text-field
              v-model="waterTemperature"
              :label="$t('settings.temperature')"
              type="text"
              placeholder="sensor.water_temperature"
              hint="Entity ID for water temperature"
              persistent-hint
            />
          </div>
        </div>

        <!-- EVCC specific fields -->
        <div v-if="type === 'evcc'">
          <v-divider />
          <p class="config-subtitle">
            {{ $t('settings.evcc_configuration') }}
          </p>
          <v-text-field
            v-model="loadPointName"
            :label="$t('settings.load_point_name')"
            type="text"
            placeholder="e.g., wallbox, car_charger"
            hint="Name of the EVCC load point"
            persistent-hint
          />
        </div>

        <div
          v-if="
            'nominal_power' in config ||
            'nominal_duration' in config ||
            'switch_on_delay' in config ||
            'switch_off_delay' in config ||
            'min_on_duration' in config ||
            'max_on_per_day' in config ||
            'store_sessions' in config
          "
        >
          <v-divider />
          <p class="config-subtitle">
            {{ $t('settings.configuration') }}
          </p>

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
          <v-checkbox
            v-if="'store_sessions' in config"
            v-model="store_sessions"
            :label="$t('settings.store_sessions')"
          />
        </div>
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
  <v-card v-if="Object.keys(readOnlyConfig).length > 0" class="pa-4 ma-4 elevation-2 rounded-md">
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
  icon: string;
  type: string;
  power: string;
  energy: string;
  output: string;
  load_point_name?: string;
  heating?: {
    state: string;
    energy: string;
    temperature: string;
  };
  water?: {
    state: string;
    energy: string;
    temperature: string;
  };
  nominal_power: number; // in Watts
  nominal_duration: number; // in seconds
  switch_on_delay: number; // in seconds
  switch_off_delay: number; // in seconds
  min_on_duration: number; // in seconds
  max_on_per_day: number; // in seconds
  store_sessions: boolean;
}

// global refs
const router = useRouter();
const config = ref({});
const readOnlyConfig = ref({});
const name = ref<string>('');
const icon = ref<string>('');
const type = ref<string>('');
const power = ref<string>('');
const energy = ref<string>('');
const output = ref<string>('');

// EVCC specific fields
const loadPointName = ref<string>('');

// SG Ready Heat Pump entity IDs
const heatingState = ref<string>('');
const heatingEnergy = ref<string>('');
const heatingTemperature = ref<string>('');
const waterState = ref<string>('');
const waterEnergy = ref<string>('');
const waterTemperature = ref<string>('');

const nominal_power = ref<number>(0);
const nominal_duration = ref<number>(0);
const switch_on_delay = ref<number>(0);
const switch_off_delay = ref<number>(0);
const min_on_duration = ref<number>(0);
const max_on_per_day = ref<number>(0);
const store_sessions = ref<boolean>(false);
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
      icon.value = data['icon'] || '';
      type.value = data['type'];
      power.value = data['power'];
      energy.value = data['energy'];
      output.value = data['output'];

      // Load EVCC specific field
      loadPointName.value = data['load_point_name'] || '';

      // Load heat pump specific entity IDs if they exist
      if (data['heating']) {
        heatingState.value = data['heating']['state'] || '';
        heatingEnergy.value = data['heating']['energy'] || '';
        heatingTemperature.value = data['heating']['temperature'] || '';
      }
      if (data['water']) {
        waterState.value = data['water']['state'] || '';
        waterEnergy.value = data['water']['energy'] || '';
        waterTemperature.value = data['water']['temperature'] || '';
      }
      nominal_power.value = parseFloat(data['nominal_power']) * 1.0;
      nominal_duration.value = parseFloat(data['nominal_duration']) / 60; // convert seconds to minutes
      switch_on_delay.value = parseFloat(data['switch_on_delay']) / 60;
      switch_off_delay.value = parseFloat(data['switch_off_delay']) / 60;
      min_on_duration.value = parseFloat(data['min_on_duration']) / 60;
      max_on_per_day.value = parseFloat(data['max_on_per_day']) / 60;
      store_sessions.value = data['store_sessions'] === true || data['store_sessions'] === 'true';

      const configurableKeys = new Set<string>([
        'id',
        'name',
        'icon',
        'type',
        'power',
        'energy',
        'output',
        'load_point_name',
        'heating',
        'water',
        'nominal_power',
        'nominal_duration',
        'switch_on_delay',
        'switch_off_delay',
        'min_on_duration',
        'max_on_per_day',
        'store_sessions',
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
    icon: icon.value,
    type: type.value,
    energy: type.value === 'homeassistant' || type.value === 'readonly-homeassistant' ? energy.value : '',
    power: type.value === 'homeassistant' || type.value === 'readonly-homeassistant' ? power.value : '',
    output: type.value === 'homeassistant' || type.value === 'sg-ready-heat-pump' ? output.value : '',
    load_point_name: type.value === 'evcc' ? loadPointName.value : undefined,
    nominal_power: +nominal_power.value, // the + operator converts the value to a number
    nominal_duration: nominal_duration.value * 60, // convert minutes to seconds
    switch_on_delay: switch_on_delay.value * 60,
    switch_off_delay: switch_off_delay.value * 60,
    min_on_duration: min_on_duration.value * 60,
    max_on_per_day: max_on_per_day.value * 60,
    store_sessions: store_sessions.value,
  };

  // Add heat pump specific nested objects if device type is sg-ready-heat-pump
  if (type.value === 'sg-ready-heat-pump') {
    values.heating = {
      state: heatingState.value,
      energy: heatingEnergy.value,
      temperature: heatingTemperature.value,
    };
    values.water = {
      state: waterState.value,
      energy: waterEnergy.value,
      temperature: waterTemperature.value,
    };
  }
  console.log('Saving device config: ', values);
  await api.saveDeviceConfig(props.deviceId!, values);

  router.push({ name: 'devicessettings' });
};
</script>
<style scoped>
.config-subtitle {
  font-family: 'JetBrains Mono Medium';
  font-size: 1.2rem;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}
</style>
