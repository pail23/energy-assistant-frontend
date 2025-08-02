<template>
  <div class="bg-background pa-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
    <div
      v-for="(device, index) in devices"
      :key="index"
    >
      <v-card
        v-if="device.id != '9c0e0865-f3b0-488f-8d3f-b3b0cdda5de7'"
        class="ma-4 elevation-2 max-w-sm"
      >
        <v-card-title>
          <span
            class="mdi pr-2"
            :class="device.icon"
          />
          <span class="">{{ device.name }}</span>
        </v-card-title>
        <v-card-actions>
          <v-btn
            class="ma-2"
            @click="editDevice(device.id)"
          >
            {{ $t('settings.edit_action') }}
          </v-btn>
          <v-btn
            class="ma-2"
            @click="deleteDevice(device.id)"
          >
            {{ $t('settings.delete_action') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- Delete Device Dialog -->
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card>
        <v-card-text> Please remove the device manually from the config file. </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            block
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add Device Dialog -->
    <v-dialog
      v-model="addDeviceDialog"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          {{ $t('settings.add_device_dialog_title') }}
        </v-card-title>
        <v-card-text>
          <p class="mb-4">
            {{ $t('settings.add_device_instruction') }}
          </p>
          <v-form
            ref="addDeviceForm"
            v-model="formValid"
          >
            <v-select
              v-model="selectedDeviceType"
              :items="deviceTypes"
              :label="$t('settings.device_type')"
              item-title="text"
              item-value="value"
              required
              :rules="[(v) => !!v || $t('settings.forecast_field_required')]"
              class="mb-4"
            />
            <v-text-field
              v-model="newDeviceName"
              :label="$t('settings.device_name')"
              required
              :rules="[(v) => !!v || $t('settings.forecast_field_required')]"
              maxlength="50"
            />
            <v-text-field
              v-model="newDeviceIcon"
              :label="$t('settings.device_icon')"
              required
              :rules="[(v) => !!v || $t('settings.forecast_field_required')]"
              maxlength="50"
              placeholder="mdi-home"
              hint="e.g., mdi-home, mdi-car, mdi-heat-pump"
              persistent-hint
            />

            <!-- Additional configuration fields for Home Assistant devices -->
            <div v-if="showConfigFields">
              <v-divider class="my-4" />
              <p class="text-subtitle-2 mb-2">
                {{ $t('settings.home_assistant_entity_ids') }}
              </p>
              <v-text-field
                v-model="configPower"
                :label="$t('settings.power')"
                required
                :rules="[(v) => !!v || $t('settings.forecast_field_required')]"
                placeholder="sensor.power_entity"
                hint="Home Assistant entity ID for power measurement"
                persistent-hint
                class="mb-2"
              />
              <v-text-field
                v-model="configEnergy"
                :label="$t('settings.energy')"
                required
                :rules="[(v) => !!v || $t('settings.forecast_field_required')]"
                placeholder="sensor.energy_entity"
                hint="Home Assistant entity ID for energy measurement"
                persistent-hint
                class="mb-2"
              />
              <v-text-field
                v-if="showOutputField"
                v-model="configOutput"
                :label="$t('settings.output')"
                required
                :rules="[(v) => !!v || $t('settings.forecast_field_required')]"
                placeholder="switch.output_entity"
                hint="Home Assistant entity ID for device control"
                persistent-hint
              />
            </div>

            <!-- Additional configuration fields for EVCC devices -->
            <div v-if="showEvccFields">
              <v-divider class="my-4" />
              <p class="text-subtitle-2 mb-2">
                {{ $t('settings.evcc_configuration') }}
              </p>
              <v-text-field
                v-model="configLoadPointName"
                :label="$t('settings.load_point_name')"
                required
                :rules="[(v) => !!v || $t('settings.forecast_field_required')]"
                placeholder="e.g., wallbox, car_charger"
                hint="Name of the EVCC load point"
                persistent-hint
              />
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="addDeviceDialog = false">
            {{ $t('close') }}
          </v-btn>
          <v-btn
            color="primary"
            :disabled="!formValid"
            @click="addDevice"
          >
            {{ $t('settings.add_device') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Floating Action Button -->
    <v-fab
      icon="mdi-plus"
      size="large"
      color="primary"
      location="bottom end"
      :style="{ position: 'fixed', bottom: '100px', right: '20px', zIndex: 1000 }"
      @click="openAddDeviceDialog"
    />
  </div>
</template>

<script lang="ts" setup>
import { api, IDeviceInfo } from '@/api/energyAssistant.api';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { $t } from '@/plugins/i18n';

const router = useRouter();

const devices = ref<IDeviceInfo[]>();
const dialog = ref<boolean>(false);

// Add device dialog state
const addDeviceDialog = ref<boolean>(false);
const formValid = ref<boolean>(false);
const selectedDeviceType = ref<string>('');
const newDeviceName = ref<string>('');
const newDeviceIcon = ref<string>('');

// Additional configuration fields
const configPower = ref<string>('');
const configEnergy = ref<string>('');
const configOutput = ref<string>('');
const configLoadPointName = ref<string>('');

// Computed property to determine which additional fields to show
const showConfigFields = computed(() => {
  return selectedDeviceType.value === 'homeassistant' || selectedDeviceType.value === 'readonly-homeassistant';
});

const showOutputField = computed(() => {
  return selectedDeviceType.value === 'homeassistant';
});

const showEvccFields = computed(() => {
  return selectedDeviceType.value === 'evcc';
});

// Device type options
const deviceTypes = ref([
  {
    text: $t('settings.device_type_home_assistant'),
    value: 'homeassistant',
  },
  {
    text: $t('settings.device_type_home_assistant_readonly'),
    value: 'readonly-homeassistant',
  },
  {
    text: $t('settings.device_type_evcc'),
    value: 'evcc',
  },
  {
    text: $t('settings.device_type_sg_ready_heat_pump'),
    value: 'sg-ready-heat-pump',
  },
]);

const deleteDevice = async function (deviceId: string) {
  await api.deleteDevice(deviceId);
  devices.value = await api.getAllDevices(false);
  dialog.value = true;
  //  alert('Please remove the device manually from the config file.');
};

const editDevice = function (deviceId: string) {
  //if (deviceId in api.devices) {
  // only allow edit if device is alive/available
  router.push(`/settings/editdevice/${deviceId}`);
  //}
};

const openAddDeviceDialog = function () {
  // Reset form
  selectedDeviceType.value = '';
  newDeviceName.value = '';
  newDeviceIcon.value = '';
  configPower.value = '';
  configEnergy.value = '';
  configOutput.value = '';
  configLoadPointName.value = '';
  formValid.value = false;
  addDeviceDialog.value = true;
};

const addDevice = async function () {
  if (formValid.value && selectedDeviceType.value && newDeviceName.value && newDeviceIcon.value) {
    // Check additional field validation for Home Assistant devices
    if (showConfigFields.value) {
      if (!configPower.value || !configEnergy.value) {
        return; // Form validation should prevent this
      }
      if (showOutputField.value && !configOutput.value) {
        return; // Form validation should prevent this
      }
    }

    // Check additional field validation for EVCC devices
    if (showEvccFields.value) {
      if (!configLoadPointName.value) {
        return; // Form validation should prevent this
      }
    }

    try {
      // Build config object
      const config: { [key: string]: string } = {
        icon: newDeviceIcon.value,
      };

      // Add Home Assistant specific fields if applicable
      if (showConfigFields.value) {
        config.power = configPower.value;
        config.energy = configEnergy.value;

        if (showOutputField.value) {
          config.output = configOutput.value;
        }
      }

      // Add EVCC specific fields if applicable
      if (showEvccFields.value) {
        config.load_point_name = configLoadPointName.value;
      }

      // Call the API to add the device
      const deviceId = await api.addDevice(selectedDeviceType.value, newDeviceName.value, config);
      console.log('Device added successfully with ID:', deviceId);

      // Refresh the devices list
      devices.value = await api.getAllDevices(false);

      // Close add dialog
      addDeviceDialog.value = false;

      // Automatically edit the newly created device
      editDevice(deviceId);
    } catch (error) {
      console.error('Failed to add device:', error);
      // Close add dialog - in case of error, just close the dialog
      // In the future, you might want to show an error dialog instead
      addDeviceDialog.value = false;
    }
  }
};

onMounted(async () => {
  devices.value = await api.getAllDevices(false);
});
</script>
