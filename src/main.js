import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import  './assets/tailwind.css';
import { registerGlobalComponents } from './utils/import';
const app = createApp(App);

app.use(router);
registerGlobalComponents(app);
app.mount('#app');
