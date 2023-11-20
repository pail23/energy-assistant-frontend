<template>
  <div>
    <v-toolbar color="transparent" :title="home.name" />
    <v-divider />
    <div class="flex min-h-screen w-full justify-center">
      <div v-if="!connected" class="flex w-full justify-items-center p-4">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 lg:grid-cols-2 p-4 bg-background">
          <PowerFlowCard
            :home-consumption-power="home.power.home_consumption"
            :solar-power="home.power.solar_production"
            unit="W"
          >
          </PowerFlowCard>
          <DevicePowerDistributionCard
            :devices="home.devices"
            :power="home.power.home_consumption"
            :self-sufficiency="home.power.self_sufficiency"
          ></DevicePowerDistributionCard>

          <div v-for="(device, index) in home.devices" :key="index">
            <DeviceCard
              :device="api.getDeviceInfo(device.device_id)"
              :available="device.available"
              :power="device.power"
              :today="device.today"
              :attributes="device.attributes"
            >
            </DeviceCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { devicesAPI } from '@/api/devices.api';
import { api } from '@/api/energyAssistant.api';
import DeviceCard from '@/components/DeviceCard.vue';
import PowerFlowCard from '@/components/PowerFlowCard.vue';
import DevicePowerDistributionCard from '@/components/DevicePowerDistributionCard.vue';

const home = computed(() => {
  return devicesAPI.home;
});

const connected = computed(() => {
  return devicesAPI.state.connected;
});
</script>
