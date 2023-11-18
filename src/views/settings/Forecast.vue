<template>
  <v-card class="m-4 max-w-sm elevation-6">
    <v-card-title>{{$t('settings.forecast_create_model')}}</v-card-title>
    <v-card-item>
      {{$t('settings.forecast_create_model_text') }}
      <v-progress-linear
        v-if="isCreating"
        indeterminate
        class="m-2"
      ></v-progress-linear>
    </v-card-item>

    <v-card-actions>
      <v-btn class="m-2" @click="CreateModel">
        {{$t('settings.forecast_create')}}
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="m-4 max-w-sm elevation-6">
    <v-card-title>{{$t('settings.forecast_tune_model')}}</v-card-title>
    <v-card-item>
      {{$t('settings.forecast_tune_model_text')}}

      <v-progress-linear
        v-if="isTuning"
        indeterminate
        class="m-2"
      ></v-progress-linear>
    </v-card-item>
    <v-card-actions>
      <v-btn class="m-2" @click="TuneModel">
       {{ $t('settings.forecast_tune')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { api } from '@/api/energyAssistant.api';
import { ref } from 'vue';


const isCreating = ref(false);
const isTuning = ref(false);

const CreateModel = async function () {
  isCreating.value = true;
  await api.createModel();
  isCreating.value = false;
};

const TuneModel = async function () {
  isTuning.value = true;
  await api.tuneModel();
  isTuning.value = false;
};
</script>
