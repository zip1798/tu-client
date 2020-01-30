import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
// import "vuetify/src/stylus/app.styl";
import VuetifyDialog from 'vuetify-dialog' // https://vaadin.com/directory/component/yariksavvuetify-dialog / https://codesandbox.io/s/ppx57r3nnj?from-embed
import "vuetify-dialog/dist/vuetify-dialog.min.css"
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import 'tiptap-vuetify/dist/main.css'


Vue.use(Vuetify, {
  theme: {
    primary: "#CBAA5C",
    secondary: "#083759"
  },
  iconfont: "mdi"
});

const vuetify = new Vuetify();

Vue.use(TiptapVuetifyPlugin, {
  vuetify,  
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'md'
})

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

export default vuetify