// import { mount } from 'cypress/vue'
// import type { DefineComponent } from 'vue'
// import { createApp } from 'vue'
// import { createPinia, setActivePinia } from 'pinia'
// import * as directives from 'vuetify/directives'
// import * as components from 'vuetify/components'
// import { createVuetify } from 'vuetify'
// import App from '../../src/App.vue'
import './commands'
import initMocks from '../../src/plugins/mswjs'
import 'vuetify/styles'

Cypress.on('test:before:run:async', async () => {
  await initMocks()
})

// For component testing

// const app = createApp(App)
// const pinia = createPinia()
// const vuetify = createVuetify({
//   components,
//   directives,
// })
// setActivePinia(pinia)
// vuetify.install(app)
// app.mount('#app')

// function mountWithVuetify(
//   Comp: DefineComponent,
//   options?: Parameters<typeof mount>[1],
// ): Cypress.Chainable {
//   return mount(Comp, {
//     ...options,
//     global: {
//       ...options?.global,
//       plugins: [...(options?.global?.plugins ?? []), vuetify],
//     },
//   })
// }
// function mountWithPinia(
//   Comp: DefineComponent,
//   options?: Parameters<typeof mount>[1],
// ): Cypress.Chainable {
//   return mount(Comp, {
//     ...options,
//     global: {
//       ...options?.global,
//       plugins: [...(options?.global?.plugins ?? []), pinia],
//     },
//   })
// }

// declare global {
//   namespace Cypress {
//     interface Chainable {
//       mount: typeof mount
//       mountWithVuetify: typeof mountWithVuetify
//       mountWithPinia: typeof mountWithPinia
//     }
//   }
// }

// Cypress.Commands.add('mountWithVuetify', mountWithVuetify)
// Cypress.Commands.add('mountWithPinia', mountWithPinia)
// Cypress.Commands.add('mount', mount)
