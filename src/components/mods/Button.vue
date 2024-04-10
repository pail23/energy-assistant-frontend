<template>
  <v-btn v-bind="btnProps" variant="plain">
    <!-- Dynamically inherit slots from parent -->
    <template v-for="(_value, name) in $slots as unknown" #[name]>
      <slot :name="name"></slot>
    </template>
  </v-btn>
</template>

<script lang="ts">
//import { ButtonProps } from '@/plugins/api/interfaces';
import { computed } from 'vue';

export interface IconProps {
  height?: string;
  width?: string;
  size?: number;
  icon?: string;
  color?: string;
}

export interface ButtonProps {
  height?: string;
  width?: string;
  ripple?: boolean;
  class?: string;
  size?: number;
  icon?: string;
  iconOptions?: IconProps; //Experimental
}

export default {
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value: string) => {
        const allowedVariants = ['plain', 'default', 'responsive', 'icon', 'list'];
        return allowedVariants.includes(value);
      },
    },
  },
  setup(props, _ctx) {
    const btnDefault = {};

    const btnResponsive = computed(() => ({
      ...btnDefault,
      class: 'v-btn--variant-responsive',
      ripple: true,
      icon: true,
      style:
        'height: min(calc(100vw - 40px), calc(100vh - 340px)); width: min(calc(100vw - 40px), calc(100vh - 340px));',
    }));

    const btnIcon = computed(() => ({
      ...btnDefault,
      ripple: false,
    }));

    const btnList = computed(() => ({
      ...btnDefault,
      density: 'comfortable',
    }));

    const btnProps = computed<ButtonProps>(() => {
      const variant = props.variant;
      switch (variant) {
        case 'default':
          return btnDefault;
        case 'plain':
          return btnDefault;
        case 'responsive':
          return btnResponsive.value;
        case 'icon':
          return btnIcon.value;
        case 'list':
          return btnList.value;
        default:
          return btnDefault;
      }
    });

    return { btnProps };
  },
};
</script>

<style>
.v-btn--variant-responsive > .v-btn__content {
  height: 100%;
  width: calc(100vw);
}

.v-btn--variant-responsive > .v-btn__content > .responsive-icon-holder-btn {
  height: 100%;
  width: 100%;
}
</style>
