import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from "./router";
import ViewUI from 'view-design';

// import style
import 'view-design/dist/styles/iview.css';
import {store} from './store/store';

export const eventBus = new Vue();
Vue.use(ViewUI);

axios.defaults.baseURL = "https://localhost:64536/";
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


