import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Buefy from "buefy";
import "./assets/scss/app.scss";
import Vuex from "vuex";
import axios from "axios";
import { ClientTable } from "vue-tables-2";

Vue.use(Buefy);
Vue.use(ClientTable);

Vue.use(Vuex, axios);

Vue.config.productionTip = false;
store.dispatch("tryAutoLogin");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
