<template>
  <div class="flex min-h-screen w-full justify-center">
    <div
      v-if="!connected"
      class="grid w-full grid-cols-1 justify-items-center p-4"
    >
      <span class="loading loading-dots loading-lg py-2"></span>
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
            :power="device.power"
            :today="device.today"
            :attributes="device.attributes"
          >
          </DeviceCard>
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
