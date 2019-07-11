<template>
  <v-app>
    <core-toolbar/>

    <core-drawer/>

    <core-view/>

    <core-footer/>

    <v-snackbar :value="getSuccessMessage" :bottom="true" :timeout="0" color="success">
      {{ getSuccessMessage }}
      <v-btn color="white" flat @click="clearMessages">Close</v-btn>
    </v-snackbar>

    <v-snackbar :value="getError" :bottom="true" :timeout="0" color="error">
      {{ getError }}
      <v-btn color="white" flat @click="clearMessages">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import CoreDrawer from "@/components/core/Drawer";
import CoreFooter from "@/components/core/Footer";
import CoreToolbar from "@/components/core/Toolbar";
import CoreView from "@/components/core/View";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    CoreDrawer: CoreDrawer,
    CoreFooter: CoreFooter,
    CoreToolbar: CoreToolbar,
    CoreView: CoreView
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
