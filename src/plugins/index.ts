// Register all plugins here
import type { App } from 'vue'
import router from '../router'
import pinia from './pinia'
import vuetify from './vuetify'
import prepare from './mswjs'

export async function registerPlugins(app: App) {
  await prepare().then(() => {
    app
      .use(vuetify)
      .use(router)
      .use(pinia)
  })
}
