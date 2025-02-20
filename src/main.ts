import { createApp, defineAsyncComponent } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import Toasted from '@/plugins/toasted.js';
import '@/assets/scss/main.scss';

const app = createApp(App);

const globalComponentsPaths = import.meta.glob('@/components/global/**/*.vue');

Object.entries(globalComponentsPaths).forEach(([path, module]) => {
  // "./components/SvgIcon.vue" -> "SvgIcon"
  const componentName = path?.split('/').pop().replace(/\.vue$/, '');

  app.component(componentName, defineAsyncComponent(module));
});

app.use(createPinia());
app.use(router);
app.use(Toasted);
app.mount('#app');
