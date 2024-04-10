<template>
  <div>
    <v-toolbar color="transparent" :title="home.name" />
    <v-divider />
    <div class="flex min-h-screen w-full justify-center">
      <div v-if="!connected" class="flex w-full justify-items-center p-4">
        <v-progress-circular indeterminate color="primary" />
      </div>
      <div v-else>
        <div class="bg-background grid grid-cols-1 p-4 lg:grid-cols-2">
          <PowerFlowCard
            :home-consumption-power="home.power.home_consumption"
            :solar-power="home.power.solar_production"
            unit="W"
          />
          <DevicePowerDistributionCard
            :devices="home.devices"
            :power="home.power.home_consumption"
            :self-sufficiency="home.power.self_sufficiency"
          />
          <ConsumptionCard
            :self-sufficiency="home.power.self_sufficiency"
            :self-consumption="home.power.self_consumption"
            :self-sufficiency-today="home.today.self_sufficiency"
            :self-consumption-today="home.today.self_consumption"
          />
          <div v-for="(device, index) in home.devices" :key="index">
            <DeviceCard
              :device="api.getDeviceInfo(device.device_id)"
              :available="device.available"
              :power="device.power"
              :today="device.today"
              :attributes="device.attributes"
            />
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
import ConsumptionCard from '@/components/ConsumptionCard.vue';

const home = computed(() => {
  return devicesAPI.home;
});

const connected = computed(() => {
  return devicesAPI.state.connected;
});
</script>
