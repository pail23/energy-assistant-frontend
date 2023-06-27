/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from '../router';
import { VueQueryPlugin } from 'vue-query';
import { i18n } from './i18n';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(router);
  app.use(VueQueryPlugin);
  app.use(i18n);
}
