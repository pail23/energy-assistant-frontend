<template>
  <div class="flex h-full min-h-screen w-full justify-center p-4">
    <div v-if="!connected" class="grid w-full grid-cols-1 justify-items-center">
      <span class="loading loading-dots loading-lg py-2"></span>
    </div>
    <div v-else>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <PowerFlowCard
          :home-consumption-power="home.power.home_consumption"
          :solar-power="home.power.solar_production"
          unit="W"
        >
        </PowerFlowCard>
        <DevicePowerDistributionCard
          :devices="home.devices"
        ></DevicePowerDistributionCard>
        <HomeCard :name="home.name" :power="home.power"></HomeCard>

        <div v-for="(device, index) in home.devices" :key="index">
          <DeviceCard
            :device="api.getDeviceInfo(device.device_id)"
            :power="device.power"
            :today="device.today"
          >
          </DeviceCard>
        </div>
        <div v-for="(device, index) in home.heat_pumps" :key="index">
          <HeatPumpCard
            :device="api.getDeviceInfo(device.device_id)"
            :power="device.power"
            :today="device.today"
            :actual-temperature="device.actual_temperature"
            :state="device.state"
          >
          </HeatPumpCard>
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
import HeatPumpCard from '@/components/HeatPumpCard.vue';
import HomeCard from '@/components/HomeCard.vue';
import PowerFlowCard from '@/components/PowerFlowCard.vue';
import DevicePowerDistributionCard from '@/components/DevicePowerDistributionCard.vue';

const home = computed(() => {
  return devicesAPI.home;
});

const connected = computed(() => {
  return devicesAPI.state.connected;
});
</script>
