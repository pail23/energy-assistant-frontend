<template>
  <v-card class="elevation-2 ma-4 max-w-sm">
    <v-card-title>{{ $t('settings.forecast_create_model') }}</v-card-title>
    <v-card-item>
      <div class="my-2">
        {{ $t('settings.forecast_create_model_text') }}
      </div>
      <v-text-field v-model="numberOfDays" label="Anzahl Tage" single-line type="number" :rules="dayRules" />
      <v-progress-linear v-if="isCreating" indeterminate class="ma-2" />
    </v-card-item>
    <v-card-item v-if="r2Label != ''">
      {{ r2Label }}
    </v-card-item>

    <v-card-actions>
      <v-btn class="ma-2" @click="CreateModel">
        {{ $t('settings.forecast_create') }}
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="elevation-2 ma-4 max-w-sm">
    <v-card-title>{{ $t('settings.forecast_tune_model') }}</v-card-title>
    <v-card-item>
      {{ $t('settings.forecast_tune_model_text') }}

      <v-progress-linear v-if="isTuning" indeterminate class="ma-2" />
    </v-card-item>
    <v-card-actions>
      <v-btn class="ma-2" @click="TuneModel">
        {{ $t('settings.forecast_tune') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { api } from '@/api/energyAssistant.api';
import { ref } from 'vue';
import { $t } from '@/plugins/i18n';

const isCreating = ref(false);
const isTuning = ref(false);
const r2Label = ref('');
const numberOfDays = ref(10);

const CreateModel = async function () {
  isCreating.value = true;
  try {
    const response = await api.createModel(numberOfDays.value);
    r2Label.value = $t('settings.forecast_r2score') + ' ' + response.data.r2.toFixed(2);
  } catch (error) {
    r2Label.value = $t('settings.forecast_create_model_error');
  } finally {
    isCreating.value = false;
  }
};

const dayRules = [
  (value) => !!value || $t('settings.forecast_field_required'),
  (value) => (!!value && value > 2) || $t('settings.forecast_value_too_small'),
];

const TuneModel = async () => {
  isTuning.value = true;
  await api.tuneModel();
  isTuning.value = false;
};
</script>
