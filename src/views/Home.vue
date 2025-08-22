<template>
  <div>
    <v-toolbar color="transparent" :title="home.name" />
    <v-divider />
    <div class="d-flex min-height-screen w-100 justify-center">
      <div v-if="!connected" class="d-flex w-100 justify-center pa-4">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <div v-else>
        <div class="bg-background pa-4">
          <v-row>
            <v-col cols="12" lg="6">
              <PowerFlowCard
                :home-consumption-power="home.power.home_consumption"
                :solar-power="home.power.solar_production"
                unit="W"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <DevicePowerDistributionCard
                :devices="home.devices"
                :power="home.power.home_consumption"
                :self-sufficiency="home.power.self_sufficiency"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <ConsumptionCard
                :self-sufficiency="home.power.self_sufficiency"
                :self-consumption="home.power.self_consumption"
                :self-sufficiency-today="home.today.self_sufficiency"
                :self-consumption-today="home.today.self_consumption"
              />
            </v-col>
            <v-col v-for="(device, index) in home.devices" :key="index" cols="12" lg="6">
              <DeviceCard
                :device="api.getDeviceInfo(device.device_id)"
                :available="device.available"
                :power="device.power"
                :today="device.today"
                :attributes="device.attributes"
              />
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { api, devicesAPI } from '@/api';
import DeviceCard from '@/components/DeviceCard.vue';
import PowerFlowCard from '@/components/PowerFlowCard.vue';
import DevicePowerDistributionCard from '@/components/DevicePowerDistributionCard.vue';
import ConsumptionCard from '@/components/ConsumptionCard.vue';

const home = computed(() => {
  return devicesAPI.home;
});

const connected = computed(() => {
  return devicesAPI.state.connected;
});
</script>
