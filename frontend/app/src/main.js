import Vue from 'vue'
// vuetify
import vuetify from '@/plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
// router
import router from './router.js'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')


