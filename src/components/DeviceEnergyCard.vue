<template>
    <div class="p-4 m-4 shadow-xl card w-80 sm:w-96 bg-base-100">
        <div>
            <div class="grid w-full">
                <div>
                    <span class="text-3xl mdi pr-2" :class="icon"></span>
                    <span class="text-lg font-bold text-left">{{ measurement.name }}</span>
                </div>

                <div class="items-center">
                    <div class="italic">{{ t('consumption') }} </div>
                    <SelfSufficiencyBar :self_sufficiency=self_sufficiency :consumed_energy=measurement.consumed_energy
                        :consumed_solar_energy=measurement.solar_consumed_energy></SelfSufficiencyBar>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import SelfSufficiencyBar from './SelfSufficiencyBar.vue'
import {IDeviceMeasurementDifference} from '@/api/measurement.api.ts'

import { useI18n } from 'vue-i18n'

const {t} = useI18n();

interface Props {
    icon: string
    measurement: IDeviceMeasurementDifference
}

const props = defineProps<Props>()

const self_sufficiency = computed(() => {
    return props.measurement.consumed_energy != 0 ? props.measurement.solar_consumed_energy / props.measurement.consumed_energy : 0.0
});
</script>