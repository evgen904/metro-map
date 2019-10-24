import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import ClickOutside from "./directive/click-outside";
Vue.directive("click-outside", ClickOutside);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
