<template>
  <v-container fluid fill-height>
    <v-layout row align-center justify-center>
      <v-flex xs12 sm8>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Profile Info</v-toolbar-title>
        </v-toolbar>

        <v-card>
            <v-flex xs12 align-center justify-center layout text-xs-center>
              <v-avatar size="150" color="grey lighten-4" class="my-3">
                  <img v-if="getProfile.icon" :src="getProfile.icon" alt="avatar">
                  <v-icon v-if="!getProfile.icon" size="150">account_circle</v-icon>
              </v-avatar>
            </v-flex>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>person</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Name</v-list-tile-sub-title>
                <v-list-tile-title>{{ getProfile.name }} </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Email</v-list-tile-sub-title>
                <v-list-tile-title>{{ getProfile.email }} </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>phone</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-sub-title>Phone</v-list-tile-sub-title>
                <v-list-tile-title>{{ getProfile.phone}} </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider inset></v-divider>

            <v-list-tile @click>
              <v-list-tile-action>
                <v-icon>location_on</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-sub-title>City</v-list-tile-sub-title>
                <v-list-tile-title>{{ getProfile.city }} </v-list-tile-title>
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ProfileInfo",
  data() {
    return {
      email: '',
      name: "",
      phone: "",
      city: ""
    };
  },
  computed: {
    ...mapGetters(['isAuth', 'getProfile', 'getProcessing', 'getError', 'getToken']),            
  },
  methods: {
    ...mapActions(['LOAD_PROFILE'])
  },
  created() {
    this.LOAD_PROFILE();
  }
};
</script>

<style scoped></style>
