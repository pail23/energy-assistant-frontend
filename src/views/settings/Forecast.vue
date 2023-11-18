<template>
  <v-card class="m-4 max-w-sm elevation-6">
    <v-card-title>Create forecast model</v-card-title>
    <v-card-item>
      Create the load forcast model based on historical data.
      <v-progress-linear
        v-if="isCreating"
        indeterminate
        class="m-2"
      ></v-progress-linear>
    </v-card-item>

    <v-card-actions>
      <v-btn class="m-2" @click="CreateModel">
        Create load forecast model
      </v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="m-4 max-w-sm elevation-6">
    <v-card-title>Tune forecast model</v-card-title>
    <v-card-item>
      Tune the load forcast model in order to optimize the forecast quality.
      This might take some time.
      <v-progress-linear
        v-if="isTuning"
        indeterminate
        class="m-2"
      ></v-progress-linear>
    </v-card-item>
    <v-card-actions>
      <v-btn class="m-2" @click="TuneModel"> Tune load forecast model </v-btn>
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
  let model = await api.createModel();
  isCreating.value = false;
};

const TuneModel = async function () {
  isTuning.value = true;
  let model = await api.tuneModel();
  isTuning.value = false;
};
</script>
