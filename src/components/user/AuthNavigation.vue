<template>
<v-menu offset-y  open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" flat outline>
              <v-icon right dark>account_circle</v-icon>
              Profile
            </v-btn>

          </template>
          <v-list>
            <v-list-tile
                    v-for="(user_link, i) in userLinks"
                    :key="i"
                    :to="user_link.to"
            >
              <v-list-tile-title>{{ user_link.text }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-tile @click.prevent="AUTH_LOGOUT">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>

        </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

  name: 'AuthNavigation',

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(["userLinks"])
  },
  methods: {
  	...mapActions(["AUTH_LOGOUT"])
  }

}
</script>

<style lang="css" scoped>
</style>