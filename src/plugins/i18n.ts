/* eslint-disable @typescript-eslint/no-explicit-any */
import { createI18n } from 'vue-i18n';

/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages';

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: navigator.language.split('-')[0],
  fallbackLocale: 'en',
  missingWarn: false,
  fallbackWarn: false,
  silentTranslationWarn: true,
  messages,
  datetimeFormats: {
    en: {
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      },
    },
    de: {
      long: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      },
    },
  },
});


const $t = i18n.global.t;
const $d = i18n.global.d;
const $n = i18n.global.n;

export { i18n, $t, $d, $n };
