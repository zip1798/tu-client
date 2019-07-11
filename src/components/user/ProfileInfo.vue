<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Profile Info</v-toolbar-title>
        </v-toolbar>

        <v-card>
          <v-list three-line>
            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Name</v-list-tile-sub-title>
                <v-list-tile-title>{{ name }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                <v-list-tile-title>{{ email }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Phone</v-list-tile-sub-title>
                <v-list-tile-title>{{ phone}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>location_on</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-sub-title>City</v-list-tile-sub-title>
                <v-list-tile-title>{{ city }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-card-actions>
            <v-btn small flat :to="'/profile/edit'">Change Profile Data</v-btn>
            <v-btn small flat :to="'/password/change'">Change Password</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "ProfileInfo",
  data() {
    return {
      email: 'test@google.com',
      name: "John Smith",
      phone: "+380 (67) 111122",
      city: "Bucha"
    };
  },
  computed: {
    error() {
      return false; // this.$store.getters.getError;
    },
    processing() {
      return false; // this.$store.getters.getProcessing;
    },
    isUserAuthentificated() {
      return false; // this.$store.getters.isUserAuthentificated;
    }
  },
  watch: {
    isUserAuthentificated(val) {
      //   if (val === true) {
      //     this.$router.push("/");
      //   }
    }
  },
  methods: {}
};
</script>

<style scoped></style>
