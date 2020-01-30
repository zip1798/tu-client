<template>
<v-menu offset-y  open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" flat outline>
              Test Navigation
            </v-btn>

          </template>
          <v-list>
            <v-list-item 
                    v-for="(link, i) in testLinks"
                    :key="`tets-${i}`"
                    :to="link.to"
            >
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item @click.prevent="AUTH_LOGOUT">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-item>
          </v-list>

        </v-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

  name: 'TestNavigation',

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(["testLinks"])
  },
  methods: {
    ...mapActions(["AUTH_LOGOUT"])
  }

}
</script>

<style lang="css" scoped>
</style>