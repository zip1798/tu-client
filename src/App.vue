<template>
  <v-app>
          <app-toolbar/>
          <app-navigation/>
          <app-view/>
          <app-footer/>

  </v-app>
</template>

<script>
import AppToolbar from "@/components/app/Toolbar";
import AppNavigation from "@/components/app/Navigation";
import AppView from "@/components/app/View";
import AppFooter from "@/components/app/Footer";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    AppToolbar: AppToolbar,
    AppFooter: AppFooter,
    AppNavigation: AppNavigation,
    AppView: AppView
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
