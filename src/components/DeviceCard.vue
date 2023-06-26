<template>
    <div class="p-4 m-4 shadow-xl card w-80 sm:w-96 bg-base-100">
        <div>
            <div class="grid w-full grid-cols-1">
                <div>
                    <span class="text-3xl mdi pr-2" :class="icon"></span> <span class="text-lg font-bold text-left">{{ name }}</span>
                </div>
                <div class="items-center">
                    <div class="text-left">{{ t('consumption') }} <span class="float-right">{{ formatNumberWithUnit(power, "W") }}</span></div>
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


const {t} = useI18n();



interface Props {
    name: string
    icon: string
    power: number
    today: IEnergy,
}

defineProps<Props>()
</script>