import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { TroisJSVuePlugin } from 'troisjs';
import { createPinia } from 'pinia';
import mitt from 'mitt';

const pinia = createPinia();
const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.$emitter = emitter

app.use(pinia);
app.use(router);
app.use(TroisJSVuePlugin);
app.use(mitt);
app.mount('#app')
