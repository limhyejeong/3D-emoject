import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddEmotion from '../views/AddEmotion.vue';
import EditEmotion from '../views/EditEmotion.vue';
import ListView from '../views/ListView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/add',
    name: 'addemotion',
    component: AddEmotion
  },
  {
    path: '/emotions/:emotionId',
    name: 'editemotion',
    component: EditEmotion
  },
  {
    path: '/list',
    name: 'listview',
    component: ListView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
