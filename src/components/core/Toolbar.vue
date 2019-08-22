<template>
  <v-toolbar app flat>
    <v-toolbar-side-icon class="hidden-md-and-up" @click="toggleDrawer"/>
    <v-container mx-auto py-0>
      <v-layout>
        <!-- <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />-->
        <v-btn
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          class="ml-0 hidden-sm-and-down"
          flat
          @click="onClick($event, item)"
        >{{ link.text }}</v-btn>
        <test-navigation></test-navigation>
        <v-spacer/>
        <v-btn v-if="!isAuth" to="/login" flat outline>
          Log in
        </v-btn>
        <v-btn v-if="!isAuth" to="/register" flat >
          Register
        </v-btn>
        
        <auth-navigation v-if="isAuth"></auth-navigation>
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";
import AuthNavigation from "../user/AuthNavigation";
import TestNavigation from "../user/TestNavigation";

export default {
  components: {
    AuthNavigation,
    TestNavigation
  },
  computed: {
    ...mapGetters(["links", "isAuth", "getProcessing"])
  },

  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.href);
    }
  }
};
</script>
