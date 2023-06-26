<template>
    <div class="card w-80 sm:w-96 bg-base-100 shadow-xl m-4 p-4">
        <div class="card-body  w-full">
            <div class="grid grid-cols-6">
                <div>
                    <span class="mdi text-3xl mdi-home"></span>
                </div>
                <span class="text-left font-bold text-lg col-span-5">{{ name }}
                </span>
                <div class="items-center col-span-6">
                    <div class="mb-4">
                        <p class="text-left">{{t('home_card.solar_production')}}<span class="float-right">{{
                            formatNumberWithUnit(power.solar_production, "W") }}</span></p>
                    </div>
                    <div class="italic">{{ t('consumption') }}</div>
                    <div class="mt-2 mb-4">
                        <SelfSufficiencyBar :self_sufficiency=power.self_sufficiency
                            :consumed_energy=power.home_consumption :consumed_solar_energy=solar_consumption_power
                            unit="W"></SelfSufficiencyBar>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import SelfSufficiencyBar from './SelfSufficiencyBar.vue'
import { IHomePower } from '@/api/device'
import { useI18n } from 'vue-i18n'
import { formatNumberWithUnit } from '@/utils';



const {t} = useI18n();


interface Props {
    name: string
    power: IHomePower,
}

const props = defineProps<Props>()


const solar_consumption_power = computed(() => {
    return props.power.self_sufficiency * props.power.home_consumption / 100
})



</script>
