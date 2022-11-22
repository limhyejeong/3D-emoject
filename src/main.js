import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';
import jQuery from 'jquery';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(jQuery);
app.mount('#app')