import Vue from "vue";
import PrimeVue from "primevue/config";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import titleMixin from "@/mixins/title.mixin";

Vue.use(PrimeVue);
Vue.mixin(titleMixin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
