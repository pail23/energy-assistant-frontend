<template>
  <v-card class="m-4 max-w-sm elevation-6">
    <v-card-title>{{ $t('settings.forecast_create_model') }}</v-card-title>
    <v-card-item>
      {{ $t('settings.forecast_create_model_text') }}
      <v-progress-linear
        v-if="isCreating"
        indeterminate
        class="m-2"
      ></v-progress-linear>
    </v-card-item>
    <v-card-item v-if="r2Label != ''">
      {{ r2Label }}
    </v-card-item>

    <v-card-actions>
      <v-btn class="m-2" @click="CreateModel">
        {{ $t('settings.forecast_create') }}
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="m-4 max-w-sm elevation-6">
    <v-card-title>{{ $t('settings.forecast_tune_model') }}</v-card-title>
    <v-card-item>
      {{ $t('settings.forecast_tune_model_text') }}

      <v-progress-linear
        v-if="isTuning"
        indeterminate
        class="m-2"
      ></v-progress-linear>
    </v-card-item>
    <v-card-actions>
      <v-btn class="m-2" @click="TuneModel">
        {{ $t('settings.forecast_tune') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { api } from '@/api/energyAssistant.api';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const isCreating = ref(false);
const isTuning = ref(false);
const r2Label = ref('');

const CreateModel = async function () {
  isCreating.value = true;
  const response = await api.createModel();
  isCreating.value = false;
  r2Label.value =
    t('settings.forecast_r2score') + ' ' + response.data.r2.toFixed(2);
};

const TuneModel = async function () {
  isTuning.value = true;
  await api.tuneModel();
  isTuning.value = false;
};
</script>
