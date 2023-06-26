<template>
    <div class="card w-80 sm:w-96 bg-base-100 shadow-xl m-4 p-4">
        <div>
            <div class="grid grid-cols-6 w-full">
                <div>
                    <span class="mdi text-3xl" :class="icon"></span>
                </div>
                <div class="col-span-5">
                    <div class="text-left font-bold text-lg">{{ name }}
                    </div>
                </div>

                <div class="items-center col-span-6">
                    <div class="text-left">{{ t('consumption') }} <span class="float-right">{{ formatNumberWithUnit(power,
                        "W") }}</span></div>
                    <div class="text-left">{{ t('temperature') }} <span class="float-right">{{
                        formatNumberWithUnit(actual_temperature, "°C") }} </span> </div>
                    <div class="text-left">{{ t('state') }} <span class="float-right">{{ state }}</span> </div>
                    <SelfSufficiencyBar :self_sufficiency=today.self_sufficiency :consumed_energy=today.consumed_energy
                        :consumed_solar_energy=today.consumed_solar_energy></SelfSufficiencyBar>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import SelfSufficiencyBar from './SelfSufficiencyBar.vue'
import { IEnergy } from '../api/device'
import { useI18n } from 'vue-i18n'
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


defineProps<Props>()
</script>