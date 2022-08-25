import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { TroisJSVuePlugin } from 'troisjs';
import mitt from 'mitt';

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.$emitter = emitter

app.use(router);
app.use(TroisJSVuePlugin);
app.use(mitt);
app.mount('#app')
