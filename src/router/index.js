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
    name: 'Главная',
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
    name: 'Проекты',
    component: () => import('../views/project/Projects.vue')
  },
  {
    path: '/projects/:id/kanban',
    name: 'Доска',
    props: true,
    component: () => import('../views/project/Kanban.vue')
  },
  {
    path: '/projects/create',
    name: 'Создать проект',
    component: () => import('../views/project/CreateProject.vue')
  },
  {
    path: '/projects/edit/:id',
    name: 'Редактировать проект',
    props: true,
    component: () => import('../views/project/CreateProject.vue')
  },
  {
    path: '/projects/:id',
    name: 'Просмотр проекта',
    props: true,
    component: () => import('../views/project/Project.vue')
  },
  {
    path: '/projects/:project_id/tasks/create',
    name: 'Добавить карточку',
    props: true,
    component: () => import('../views/project/CreateTask')
  },
  {
    path: '/projects/:project_id/tasks/:task_id',
    name: 'Карточка',
    props: true,
    component: () => import('../views/project/Task')
  },
  {
    path: '/projects/:project_id/tasks-list',
    name: 'Карточки',
    props: true,
    component: () => import('../views/project/TasksList')
  },
  {
    path: '/projects/:project_id/tasks/:task_id/edit',
    name: 'Редактирование карточки',
    props: true,
    component: () => import('../views/project/CreateTask')
  },
  {
    path: '/profile',
    name: 'Профиль',
    component: () => import('../views/profile/Show')
  },
  {
    path: '/edit-profile',
    name: 'Редактировать профиль',
    component: () => import('../views/profile/Edit')
  },
  {
    path: '*',
    redirect: "/"
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!store.getters['auth/isAuth'] && (to.path !== '/login' && to.path !== '/register')) {
    next('/login');
  }
  next()
});

export default router