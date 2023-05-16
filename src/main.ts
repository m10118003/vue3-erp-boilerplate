import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import '@/scss/index.scss';
import '@/scss/layout.scss';
import '@/css/index.css';

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist';

import { setElIcons } from './setup';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import 'tailwindcss/tailwind.css';


// import './assets/main.css'

library.add(fas, far, fab);

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component;
    // app.component(key, component); // 引入時會出現 Component "..." has already been registered, 如果有問題再拉回來
}
const storee = createPinia();
storee.use(piniaPluginPersist);


app.use(router);
app.use(storee);

// 設置element pluse
app.use(ElementPlus);
// 設置icon
setElIcons(app);
// 設置 font-awesome-icon
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
