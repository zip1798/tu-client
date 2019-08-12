import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/base";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {Vue2Storage} from 'vue2-storage'
import { setupBus }  from "./repository/eventBus"
import VuetifyDialog from 'vuetify-dialog' // https://vaadin.com/directory/component/yariksavvuetify-dialog / https://codesandbox.io/s/ppx57r3nnj?from-embed
import "vuetify-dialog/dist/vuetify-dialog.min.css"


setupBus();

Vue.config.productionTip = false;

Vue.use(Vue2Storage, {
  prefix: 'tu_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 7 * 1000
})

Vue.use(VuetifyDialog)

new Vue({
  router,
  store,
  created() {
    this.$store.dispatch("AUTH_RESTORE");
  },
  render: h => h(App)
}).$mount("#app");
