<template>
  <div class="card m-4 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div>
      <div class="grid w-full grid-cols-6">
        <div>
          <span class="mdi text-3xl" :class="icon"></span>
        </div>
        <div class="col-span-5">
          <div class="text-left text-lg font-bold">{{ name }}</div>
        </div>

        <div class="col-span-6 items-center">
          <div class="text-left">
            {{ t('consumption') }}
            <span class="float-right">{{
              formatNumberWithUnit(power, 'W')
            }}</span>
          </div>
          <div class="text-left">
            {{ t('temperature') }}
            <span class="float-right"
              >{{ formatNumberWithUnit(actual_temperature, '°C') }}
            </span>
          </div>
          <div class="text-left">
            {{ t('state') }} <span class="float-right">{{ state }}</span>
          </div>
          <SelfSufficiencyBar
            :self_sufficiency="today.self_sufficiency"
            :consumed_energy="today.consumed_energy"
            :consumed_solar_energy="today.consumed_solar_energy"
          ></SelfSufficiencyBar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';
import { IEnergy } from '../api/device';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t } = useI18n();

interface Props {
  name: string;
  icon: string;
  power: number;

  today: IEnergy;
  actual_temperature: number;
  state: string;
}

defineProps<Props>();
</script>
