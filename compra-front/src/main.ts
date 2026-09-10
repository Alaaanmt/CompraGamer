import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';
import { useRoute, useRouter } from 'vue-router';

const app = createApp(App);
const pinia = createPinia();

// Agregar $route y $router como propiedad global
app.config.globalProperties.$route = useRoute();
app.config.globalProperties.$router = useRouter();

app.use(pinia);
app.use(router);
app.mount('#app');
