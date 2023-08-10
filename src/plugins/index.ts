/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import router from './router';
import { i18n } from './i18n';
import vuetify from './vuetify';
import breakpoint from './breakpoint';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app.use(vuetify);
  app.use(router);
  app.use(i18n);
  app.use(breakpoint)
}
