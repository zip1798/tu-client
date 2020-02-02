<template>
 <div>
    <v-app-bar
      color="blue-grey  accent-4"
      flat
      dark
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click="toogleNav"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs>
          <v-tab 
          v-for="(link, i) in mainLinks" 
          :key="`tab-${i}`"
          :to="link.to"
          >{{ link.title }}</v-tab>
          <test-navigation></test-navigation>
        </v-tabs>
      </template>      
    </v-app-bar>

    <v-navigation-drawer 
    app 
    clipped
    :expand-on-hover="openned_nav"
    permanent
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        
        <v-spacer/>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in navLinks"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>

</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";
import TestNavigation from "../user/TestNavigation";

export default {
   data () {
      return {
        openned_nav: false,
      }
  },
  components: {
    TestNavigation
  },
  computed: {
    ...mapGetters(["navLinks", "mainLinks", "getProcessing"])
  },

  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();

      if (item.to || !item.href) return;

      this.$vuetify.goTo(item.href);
    },
    toogleNav() {
      this.openned_nav = !this.openned_nav
    }
  }
};
</script>
