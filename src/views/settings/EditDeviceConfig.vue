<template>
  <v-card class="p-4 m-4 rounded-md elevation-2">
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="name"
          :label="$t('settings.name')"
          type="input"
        />
        <v-text-field
          v-model="nominal_power"
          :label="$t('settings.nominal_power')"
          type="number"
        />
        <v-text-field
          v-model="switch_on_delay"
          :label="$t('settings.switch_on_delay')"
          type="number"
        />
        <v-btn
          block
          color="primary"
          @click="submit"
        >
          {{ $t('settings.save') }}
        </v-btn>
      </v-form>
      <br>
      <v-btn
        block
        @click="router.back()"
      >
        {{ $t('close') }}
      </v-btn>
    </v-card-text>
  </v-card>
  <br>
  <v-card class="p-4 m-4 rounded-md elevation-2">
    <v-card-title>Values which can only be edit in the energy_assistant.yaml file</v-card-title>
    <v-card-text>
      <v-table class="m-4 border rounded-md">
        <tbody>
          <tr
            v-for="(value, key) in readOnlyConfig"
            :key="key"
            class="text-left border"
          >
            <td class="px-6 py-4 border">
              {{ key }}
            </td>
            <td class="px-6 py-4 border">
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

// global refs
const router = useRouter();
const config = ref({});
const readOnlyConfig = ref({})
const name = ref<string>("")
const nominal_power = ref<number>(0)
const switch_on_delay = ref<number>(0)

// props
const props = defineProps<{
    deviceId?: string;
}>();

// watchers

watch(
    () => props.deviceId,
    async (val) => {
        if (val) {
            console.log("Edit Device: " + val)
            const data = await api.getDeviceConfig(val);
            config.value = data
            name.value = data["name"];
            nominal_power.value = data["nominal_power"];
            const configurableKeys = new Set<string>(['id', 'name', 'type', 'nominal_power']);
            const readOnlyKeys = Object.keys(data).filter((k) => !configurableKeys.has(k));
            const readOnlyValues = {};
            readOnlyKeys.forEach(key => { readOnlyValues[key] = data[key] });
            readOnlyConfig.value = readOnlyValues
        }
    },
    { immediate: true },
);


// methods
const submit = async function () {
    const values = {
        "name": name.value,
        "nominal_power": nominal_power.value
    }
    await api.saveDeviceConfig(props.deviceId!, values);

    router.push({ name: 'devicessettings' });
};

</script>