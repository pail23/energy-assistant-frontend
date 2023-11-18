<template>
  <v-card class="m-4 max-w-sm elevation-6">
    <v-card-title>Create forecast model</v-card-title>
    <v-card-item>
      Create the load forcast model based on historical data.
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
    </v-card-item>
    <v-card-actions>
      <v-btn class="m-2" @click="TuneModel"> Tune load forecast model </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { api } from '@/api/energyAssistant.api';

const CreateModel = async function () {
  let model = await api.createModel();
  alert('model created:' + model.data.model);
};

const TuneModel = async function () {
  let model = await api.tuneModel();
  alert('model tuned:' + model.data.model);
};
</script>
