<template>
  <v-content id="home" py-0>
    <v-progress-linear
      :indeterminate="true"
      :height="2"
      color="blue"
      class="ma-0"
      :active="getProcessing"
    ></v-progress-linear>
    <router-view/>
  </v-content>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getProcessing"])
  }
};
</script>
