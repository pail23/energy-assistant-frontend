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
        <div v-if="showEntityIdsSection">
          <v-divider />
          <p class="config-subtitle">
            {{ $t('settings.home_assistant_entity_ids') }}
          </p>
          <v-text-field v-if="isHomeAssistantDevice" v-model="power" :label="$t('settings.power')" type="text" />
          <v-text-field v-if="isHomeAssistantDevice" v-model="energy" :label="$t('settings.energy')" type="text" />
          <v-text-field
            v-if="isHomeAssistantDevice || isHeatPumpDevice"
            v-model="output"
            :label="$t('settings.output')"
            type="text"
          />

          <!-- SG Ready Heat Pump specific fields -->
          <div v-if="isHeatPumpDevice">
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
        <div v-if="isEvccDevice">
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

        <div v-if="showConfigSection">
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
        <!-- Readonly Home Assistant YAML Configuration -->
        <div v-if="isReadOnlyHomeAssistantDevice">
          <div class="mb-4">
            <label class="v-label text-subtitle-1 mb-2">{{ $t('settings.yaml_config_label') }}</label>
            <textarea
              v-model="yamlConfig"
              placeholder="# Additional YAML configuration
# Example:
# manufacturer: v-zug
# model: Adora TS WP"
              class="v-textarea"
              rows="6"
              style="
                width: 100%;
                padding: 12px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-family: monospace;
                resize: vertical;
              "
            />
            <div class="text-caption text-medium-emphasis mt-1">
              Enter additional YAML configuration for this device
            </div>
          </div>
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
  <v-card v-if="hasReadOnlyConfig" class="pa-4 ma-4 elevation-2 rounded-md">
    <v-card-title>Values which can not be edited in the UI</v-card-title>
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
  <div v-if="yamlParseError" style="color: red; margin-bottom: 1em">
    {{ yamlParseError }}
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/api';
import type { ConfigValueType } from '@/api/types';
import { watch, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { $t } from '@/plugins/i18n';
import * as yaml from 'js-yaml';

interface IDeviceConfigData {
  [key: string]: unknown;
  name?: string;
  icon?: string;
  type?: string;
  power?: string;
  energy?: string;
  output?: string;
  load_point_name?: string;
  heating?: {
    state?: string;
    energy?: string;
    temperature?: string;
  };
  water?: {
    state?: string;
    energy?: string;
    temperature?: string;
  };
  nominal_power?: number | string;
  nominal_duration?: number | string;
  switch_on_delay?: number | string;
  switch_off_delay?: number | string;
  min_on_duration?: number | string;
  max_on_per_day?: number | string;
  store_sessions?: boolean | string;
}

interface IDeviceConfigParams {
  [key: string]: ConfigValueType | undefined | { [key: string]: string };
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

// Readonly Home Assistant YAML config
const yamlConfig = ref<string>('');
const yamlParseError = ref('');

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

// computed properties
const isHomeAssistantDevice = computed(() => type.value === 'homeassistant' || type.value === 'readonly-homeassistant');

const isHeatPumpDevice = computed(() => type.value === 'sg-ready-heat-pump');

const isEvccDevice = computed(() => type.value === 'evcc');

const isReadOnlyHomeAssistantDevice = computed(() => type.value === 'readonly-homeassistant');

const showEntityIdsSection = computed(
  () => isHomeAssistantDevice.value || isHeatPumpDevice.value || 'heating' in config.value || 'water' in config.value,
);

const showConfigSection = computed(
  () =>
    'nominal_power' in config.value ||
    'nominal_duration' in config.value ||
    'switch_on_delay' in config.value ||
    'switch_off_delay' in config.value ||
    'min_on_duration' in config.value ||
    'max_on_per_day' in config.value ||
    'store_sessions' in config.value,
);

const hasReadOnlyConfig = computed(() => Object.keys(readOnlyConfig.value).length > 0);

// helper functions
const loadDeviceData = (data: IDeviceConfigData) => {
  name.value = data['name'] || '';
  icon.value = data['icon'] || '';
  type.value = data['type'] || '';
  power.value = data['power'] || '';
  energy.value = data['energy'] || '';
  output.value = data['output'] || '';

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

  nominal_power.value = parseFloat(data['nominal_power']?.toString() || '0') * 1.0;
  nominal_duration.value = parseFloat(data['nominal_duration']?.toString() || '0') / 60; // convert seconds to minutes
  switch_on_delay.value = parseFloat(data['switch_on_delay']?.toString() || '0') / 60;
  switch_off_delay.value = parseFloat(data['switch_off_delay']?.toString() || '0') / 60;
  min_on_duration.value = parseFloat(data['min_on_duration']?.toString() || '0') / 60;
  max_on_per_day.value = parseFloat(data['max_on_per_day']?.toString() || '0') / 60;
  store_sessions.value = data['store_sessions'] === true || data['store_sessions'] === 'true';
};

const setupReadOnlyConfig = (data: IDeviceConfigData) => {
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

  // Populate YAML editor for readonly-homeassistant devices
  if (type.value === 'readonly-homeassistant' && Object.keys(readOnlyValues).length > 0) {
    try {
      yamlConfig.value = yaml.dump(readOnlyValues, { indent: 2 });
    } catch (error) {
      console.warn('Failed to convert readonly config to YAML:', error);
      yamlConfig.value = '# Failed to load existing configuration\n';
    }
  } else {
    yamlConfig.value = '';
  }
};

// watchers

watch(
  () => props.deviceId,
  async (val) => {
    if (val) {
      console.log('Edit Device: ' + val);
      const data = (await api.getDeviceConfig(val)) as IDeviceConfigData;
      config.value = data;
      loadDeviceData(data);
      setupReadOnlyConfig(data);
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
    energy: isHomeAssistantDevice.value ? energy.value : '',
    power: isHomeAssistantDevice.value ? power.value : '',
    output: isHomeAssistantDevice.value || isHeatPumpDevice.value ? output.value : '',
    load_point_name: isEvccDevice.value ? loadPointName.value : undefined,
    nominal_power: +nominal_power.value, // the + operator converts the value to a number
    nominal_duration: nominal_duration.value * 60, // convert minutes to seconds
    switch_on_delay: switch_on_delay.value * 60,
    switch_off_delay: switch_off_delay.value * 60,
    min_on_duration: min_on_duration.value * 60,
    max_on_per_day: max_on_per_day.value * 60,
    store_sessions: store_sessions.value,
  };

  // Add heat pump specific nested objects if device type is sg-ready-heat-pump
  if (isHeatPumpDevice.value) {
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

  // Merge YAML configuration for readonly-homeassistant devices
  if (isReadOnlyHomeAssistantDevice.value && yamlConfig.value.trim()) {
    try {
      const yamlData = yaml.load(yamlConfig.value) as Record<string, unknown>;
      if (yamlData && typeof yamlData === 'object') {
        Object.assign(values, yamlData);
        yamlParseError.value = ''; // Clear any previous error
      }
    } catch (error) {
      console.error('Failed to parse YAML configuration:', error);
      // You might want to show an error message to the user here
      yamlParseError.value = 'YAML configuration is invalid. Please check your syntax.';
    }
  } else {
    yamlConfig.value = '';
    yamlParseError.value = '';
  }

  console.log('Saving device config: ', values);
  await api.saveDeviceConfig(props.deviceId!, values as Record<string, ConfigValueType>);

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
