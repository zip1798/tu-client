import Vue from "vue"
import vuetify from "./plugins/vuetify"
import "./plugins/general"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import {Vue2Storage} from 'vue2-storage'
import { setupBus }  from "./repository/eventBus"


setupBus();

Vue.config.productionTip = false;

Vue.use(Vue2Storage, {
  prefix: 'tu_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 7 * 1000
})


new Vue({
  vuetify,
  router,
  store,
  created() {
    this.$store.dispatch("AUTH_RESTORE");
  },
  render: h => h(App)
}).$mount("#app");
