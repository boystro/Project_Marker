import './assets/main.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.min.css'

import { createApp } from 'vue'
import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config'
import Aura from '@primevue/themes/aura'
import App from './App.vue'
import router from './router'

const primeVueConfig: PrimeVueConfiguration = {
  theme: {
    preset: Aura,
  },
}

const app = createApp(App)

app.use(PrimeVue, primeVueConfig)

app.use(router)

app.mount('#app')
