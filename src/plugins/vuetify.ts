/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/styles';
import colors from 'vuetify/util/colors';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { md } from 'vuetify/iconsets/md';

// Composables
import { createVuetify } from 'vuetify';

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        md,
        mdi,
      },
    },
    display: {
      mobileBreakpoint: 'md',
      thresholds: {
        xs: 0,
        sm: 340,
        md: 540,
        lg: 800,
        xl: 1280,
      },
    },
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            backgroud: colors.orange.lighten4,
            surface: '#FFFFFF',
            primary: colors.blue.base,
            accent: colors.blue.darken2,
            subgroup: colors.grey.lighten3,
            sun: colors.amber.darken2,
            grid: colors.blue.darken4,
          },
        },
        dark: {
          dark: true,
          colors: {
            backgroud: colors.orange.darken4,
            surface: colors.grey.darken4,
            primary: colors.blue.darken4,
            accent: colors.blue.lighten2,
            subgroup: colors.grey.darken3,
            sun: colors.amber.darken1,
            grid: colors.blue.lighten1,
          },
        },
      },
    },
  },
);
