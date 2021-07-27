import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
import { store } from "./store/store";

Vue.use(ViewUI);

axios.defaults.baseURL = "https://localhost:64536/";
Vue.config.productionTip = false;
export const eventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
