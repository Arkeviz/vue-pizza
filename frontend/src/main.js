import { createApp } from 'vue'

import { initStore } from '@/stores'
import { initRouter } from '@/router'
import App from '@/App.vue'

createApp(App).use(initStore()).use(initRouter()).mount('#app')
