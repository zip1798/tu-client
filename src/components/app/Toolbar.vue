<template>
 <div>
    <v-app-bar
      color="blue-grey  accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>      
    </v-app-bar>

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

  </div>

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
