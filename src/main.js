// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MainMasterPage from "./layout/MainMasterPage.vue";

import App from './App.vue'
import router from './router'
//--- 18n ----
import i18n from './plugins/i18n'
// import { useI18n } from 'vue-i18n'

//--- FontAwesome ---
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons */
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(fab, fas, far)
//-----------------
const app = createApp(App)

app.component('MainMasterPage',MainMasterPage)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
