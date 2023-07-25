<template>
  <div class="card bg-base-100">
    <table
      class="m-4 border-collapse border border-slate-300 bg-base-100 text-left text-sm text-gray-500 dark:text-gray-400"
    >
      <thead class="bg-base-200">
        <tr>
          <th class="min-w-36 px-6 py-3">{{ t('sessionlog.start') }}</th>
          <th class="min-w-36 px-6 py-3">{{ t('sessionlog.end') }}</th>
          <th class="min-w-36 px-6 py-3">{{ t('sessionlog.text') }}</th>
          <th class="w-36 px-6 py-3">
            {{ t('consumed_solar_energy') }}
          </th>
          <th class="w-36 px-6 py-3">{{ t('consumed_energy') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in sessionLog"
          :key="index"
          class="border-b text-center odd:bg-base-100 even:bg-base-200"
        >
          <td class="px-6 py-4">
            {{ d(new Date(entry.start), longFormat) }}
          </td>
          <td class="px-6 py-4">
            {{ d(new Date(entry.end), longFormat) }}
          </td>
          <td class="px-6 py-4">
            {{ entry.text }}
          </td>
          <td class="px-6 py-4">
            {{ formatNumberWithUnit(entry.solar_consumed_energy, 'kWh') }}
          </td>
          <td class="px-6 py-4">
            {{ formatNumberWithUnit(entry.consumed_energy, 'kWh') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup>
import { ISessionLogEntry } from '@/api/energyAssistant.api';
import { useI18n } from 'vue-i18n';
import { formatNumberWithUnit } from '@/utils';

const { t, d } = useI18n();

const longFormat = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

interface Props {
  sessionLog: ISessionLogEntry[];
}

defineProps<Props>();
</script>
