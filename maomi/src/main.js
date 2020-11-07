import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

import Scroller from '@/components/Scroller'

import Loading from '@/components/Loading'
Vue.prototype.axios = axios
Vue.component('Scroller', Scroller)
Vue.component('Loading', Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
