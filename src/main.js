import Vue from 'vue'
import App from './App.vue'
import axios from './plugins/axios'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'es6-promise/auto'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

config.searchPseudoElements = true;

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuelidate);
Vue.use(Vuex);

Vue.prototype.$http = axios

Vue.prototype.$fontAwesome = library;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
