<template>
  <v-app>
          <app-toolbar/>
          <app-view/>
          <app-footer/>

  </v-app>
</template>

<script>
import AppToolbar from "@/components/app/Toolbar";
import AppView from "@/components/app/View";
import AppFooter from "@/components/app/Footer";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    AppToolbar,
    AppFooter,
    AppView
  },
  data() {
    return {
      //
    };
  },
  computed: {
    ...mapGetters(["getError", "getSuccessMessage"])
  },
  methods: {
    clearMessages() {
      this.$store.dispatch("CLEAR_MESSAGES");
    }
  }
};
</script>
