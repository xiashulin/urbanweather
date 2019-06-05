// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueLine from 'v-charts/lib/line.common'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.axios = axios

Vue.component(VueLine.name, VueLine)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
