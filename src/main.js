import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

// import  './assets/tailwind.css';
// import './assets/js/main.js'
import { registerGlobalComponents } from './utils/import';
import Loading from 'vue3-loading-screen'


import Vuex from 'vuex';

import storeConfig from './store';

export const store = new Vuex.Store(storeConfig);

const app = createApp(App);

app.use(router);
app.use(store)

// loading screen custom
app.use(Loading, {
  bg: '#ffffff',
  slot: `
    <div class="px-5 py-3 bg-gray-800 rounded">
      <h3 class="text-3xl text-black"><i class="fas fa-spinner fa-spin"></i>Welcome to Lazy Perfume!</h3>
      <h3 class="text-3xl text-black text-center"></i>Chờ chút nhé...!</h3>
    </div>
  `
})
registerGlobalComponents(app);
app.mount('#app');
