<template>
  <v-card class="elevation-2 md:ma-4 w-full rounded-md">
    <v-card-text>
      <v-table class="sm:ma-4 border">
        <thead class="bg-primary">
          <tr>
            <th class="col-energy pa-6 py-3">
              {{ $t('sessionlog.start') }}
            </th>
            <th class="col-energy pa-6 py-3">
              {{ $t('sessionlog.duration') }}
            </th>
            <!--    <th class="px-6 py-3 col-energy">{{ $t('sessionlog.text') }}</th>-->
            <th class="col-energy pa-6 py-3">
              {{ $t('consumed_solar_energy') }}
            </th>
            <th class="col-energy pa-6 py-3">
              {{ $t('consumed_energy') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(entry, index) in sessionLog"
            :key="index"
            class="odd:bg-surface even:bg-subgroup border-b text-center"
          >
            <td class="px-6 py-4">
              {{ $d(new Date(entry.start + 'Z'), 'long') }}
            </td>
            <td class="px-6 py-4">
              {{ formatTimeSpan(entry) }}
            </td>
            <!--            

            <td class="px-6 py-4">
              {{ entry.text }}
            </td> -->
            <td class="px-6 py-4">
              <span v-if="entry.consumed_energy != 0">
                {{ ((entry.solar_consumed_energy / entry.consumed_energy) * 100).toFixed(0) }}%
              </span>
            </td>
            <td class="px-6 py-4">
              {{ formatNumberWithUnit(entry.consumed_energy, 'kWh') }}
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import type { ISessionLogEntry } from '@/api/types';
import { formatNumberWithUnit, formatDuration } from '@/utils';
import { $t, $d } from '@/plugins/i18n';

interface Props {
  sessionLog: ISessionLogEntry[];
}

function formatTimeSpan(entry): string {
  const end = new Date(entry.end + 'Z').getTime();
  const start = new Date(entry.start + 'Z').getTime();
  let diff = end - start;
  return formatDuration(diff / 1000);
}

defineProps<Props>();
</script>

<style scoped>
tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.3);
}

.col-energy {
  min-width: 9rem; /* min-w-36 and w-36 equivalent */
}
</style>
