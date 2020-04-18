import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(BootstrapVue);
Vue.use(VueRouter);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      Vue.prototype.$http.post('auth/logout');
      store.commit('auth/logout');
      next('/login')
    }
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/index.html',
    beforeEnter: (to, from, next) => {
      next('/')
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
/* eslint-disable no-console */
router.beforeEach((to, from, next) => {
  console.log(to.path);
  if (!store.getters['auth/isAuth'] && (to.path !== '/login' && to.path !== '/register')) {
    next('/login');
  }
  next()
});

export default router