<template>
    <v-card width="400" style="margin: 20px">
        <v-card-item>
            <v-card-title>{{ name }}
            </v-card-title>

        </v-card-item>

        <v-card-text>
            <v-row class="d-flex align-center fill-width">
                <v-col cols="2">
                    <v-icon :icon="icon" />
                </v-col>
                <v-col cols="10">
                    <p>Verbrauch: {{ state }} W</p>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>

const props = defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  state: { type: Number, required: true },
})
</script>