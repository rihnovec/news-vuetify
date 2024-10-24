import vuetify from './vuetify'
import {createPinia} from 'pinia'
import router from '../router/index'

import type { App } from 'vue'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(router)
  app.use(createPinia())
}
