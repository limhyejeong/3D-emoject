import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EditEmotion from '../views/EditEmotion.vue';
import CreateView from '../views/CreateView.vue';
import InputEmoji from '../views/InputEmoji.vue';
import InputName from '../views/InputName.vue';
import InputContents from '../views/InputContents.vue';
import LoadingAnimation from '../views/LoadingAnimation.vue';
import OutputView from '../views/OutputView.vue';
import ListView from '../views/ListView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
    // component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
  },
  {
    path: '/create',
    name: 'createemotion',
    component: CreateView
  },
  {
    path: '/emoji',
    name: 'inputemoji',
    component: InputEmoji,
  },
  {
    path: '/name',
    name: 'inputname',
    component: InputName,
    meta: { transition: 'slide' }
  },
  {
    path: '/contents',
    name: 'inputcontents',
    component: InputContents,
    meta: { transition: 'slide' }
  },
  {
    path: '/creating',
    name: 'LoadingAnimation',
    component: LoadingAnimation,
  },
  {
    path: '/output',
    name: 'OutputView',
    component: OutputView,
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
