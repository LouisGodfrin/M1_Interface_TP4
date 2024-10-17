import { createApp } from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';

const app = createApp(App);

// Use both Vuex store and Vue Router
app.use(store);   // Use the store with Vuex
app.use(router);  // Use the router

app.mount('#app');
