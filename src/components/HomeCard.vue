<template>
  <div class="card m-4 w-80 bg-base-100 p-4 shadow-xl sm:w-96">
    <div class="card-body w-full">
      <div class="grid w-full">
        <div>
          <span class="mdi mdi-home pr-2 text-3xl"></span>

          <span class="text-left text-lg font-bold">{{ name }} </span>
        </div>
        <div class="items-center">
          <div class="mb-4">
            <p class="text-left">
              {{ t('home_card.solar_production')
              }}<span class="float-right">{{
                formatNumberWithUnit(power.solar_production, 'W')
              }}</span>
            </p>
          </div>
          <div class="italic">{{ t('consumption') }}</div>
          <div class="mb-4 mt-2">
            <SelfSufficiencyBar
              :self-sufficiency="power.self_sufficiency"
              :consumed-energy="power.home_consumption"
              :consumed-solar-energy="solar_consumption_power"
              unit="W"
            ></SelfSufficiencyBar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import SelfSufficiencyBar from './SelfSufficiencyBar.vue';
import { IHomePower } from '@/api/device';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t } = useI18n();

interface Props {
  name: string;
  power: IHomePower;
}

const props = defineProps<Props>();

const solar_consumption_power = computed(() => {
  return (props.power.self_sufficiency * props.power.home_consumption) / 100;
});
</script>
