import Vue from 'vue'
import App from './App.vue'
import {router} from "./router"
import {store} from "./store"
import { i18n } from './i18n'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
  i18n
}).$mount('#app')
