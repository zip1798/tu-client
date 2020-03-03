<template>
  <div>
    <v-footer
      absolute
      class="font-weight-medium"
      app
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>

    <v-snackbar :value="getSuccessMessage" :bottom="true" :timeout="0" color="success">
      {{ getSuccessMessage }}
      <v-btn color="white" text @click="clearMessages">Close</v-btn>
    </v-snackbar>

    <v-snackbar :value="getError" :bottom="true" :timeout="0" color="error">
      {{ getError }}
      <v-btn color="white" text @click="clearMessages">Close</v-btn>
    </v-snackbar>

  </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSuccessMessage", "getError"])
  },
  methods: {
    clearMessages() {
      this.$store.dispatch("CLEAR_MESSAGES");
    }
  }
};
</script>
