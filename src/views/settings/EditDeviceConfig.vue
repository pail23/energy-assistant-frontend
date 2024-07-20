<template>¨
    <v-form>
        <v-text-field label="Name" type="input" v-model="name"></v-text-field>
        <v-text-field label="Verbrauch" type="number" v-model="nominal_power"></v-text-field>
        <v-btn block color="primary" @click="submit">
            {{ $t('settings.save') }}
        </v-btn>
    </v-form>
    <br/>
    <v-btn block @click="router.back()">
    {{ $t('close') }}
  </v-btn>
  <br/>
  <p>Details: </p>    
    <ul>
        <li v-for="(value, key) in config">
            {{ key }}: {{ value }}
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { api, IConfig, ConfigValueType } from '@/api/energyAssistant.api';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
// global refs
const router = useRouter();
const config = ref<IConfig>();
const name = ref<string>("")
const nominal_power = ref<number>(0)

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
            config.value = await api.getDeviceConfig(val);
            name.value = config.value["name"];
            nominal_power.value = config.value["nominal_power"];
        }
    },
    { immediate: true },
);


// methods
const submit = async function () {
    /*  values['enabled'] = config.value!.enabled;
      values['name'] = config.value!.name || null;
      api.saveDeviceConfig(props.deviceId!, values);*/
    const values = {
        "name": name.value,
        "nominal_power": nominal_power.value
    }
    await api.saveDeviceConfig(props.deviceId!, values);

    router.push({ name: 'devicessettings' });
};

</script>