import { createApp } from 'vue'
import App from './Index.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import fontawesomecss from '@fortawesome/fontawesome-free/css/all.min.css'
import fontawesomejs from '@fortawesome/fontawesome-free/js/fontawesome.min'
import vuespinnerjs from 'vue-spinner/dist/vue-spinner.min'

createApp(App)
  .use(store)
  .use(router)
  .use(fontawesomecss)
  .use(fontawesomejs)
  .use(vuespinnerjs)
  .mount('#vtt_meta')
