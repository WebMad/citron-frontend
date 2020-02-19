import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios/lib/axios'
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

Vue.prototype.$http = Axios.create({
  // baseURL: 'https://www.asukasan.tk:8282/api/',//`https://citron.webmadness.ru/api/`,
  baseURL: 'http://citron/api/',//`https://citron.webmadness.ru/api/`,
  headers: {}
});

Vue.prototype.$fontAwesome = library;

if (store.getters['auth/isAuth']) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + store.getters['auth/getToken'];
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
