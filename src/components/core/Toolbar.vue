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
        <v-spacer/>
        <v-btn v-if="!isAuth" to="/login" flat outline>
          Log in
        </v-btn>
        <v-btn v-if="!isAuth" to="/register" flat >
          Register
        </v-btn>

        <!--<v-menu offset-y  open-on-hover>-->
          <!--<template v-slot:activator="{ on }">-->
            <!--<v-btn v-on="on" flat outline>-->
              <!--Sign in-->
            <!--</v-btn>-->

          <!--</template>-->
          <!--<v-list>-->
            <!--<v-list-tile-->
                    <!--v-for="(user_link, j) in userLinks"-->
                    <!--:key="j"-->
                    <!--:to="user_link.to"-->
            <!--&gt;-->
              <!--<v-list-tile-title>{{ user_link.text }}</v-list-tile-title>-->
            <!--</v-list-tile>-->
          <!--</v-list>-->
        <!--</v-menu>-->
      </v-layout>
    </v-container>
  </v-toolbar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["links", "userLinks", "isAuth"])
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
