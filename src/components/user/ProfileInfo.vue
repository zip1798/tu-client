<template>
  <v-container>
    <v-row >
          <base-subheading>Profile Info</base-subheading>
    </v-row >

    <v-row >
      <v-col cols="12" md="3" >
        <v-row justify="center" align="start">
          <img
            v-if="getProfile.icon"
            :src="getProfile.icon"
            height="200px"
            dark
            class="ma-5"
          />
          <v-icon
            v-if="!getProfile.icon"
            class="ma-5"
            size="200">account_circle</v-icon>
        </v-row>
      </v-col>

      <v-col cols="12" md="9">
        <v-card class="mx-auto">
          <v-list two-line>
            <v-list-item>
              <v-list-item-icon><v-icon>person</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ getProfile.name }}</v-list-item-title>
                <v-list-item-subtitle>Name</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon><v-icon>mail</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ getProfile.email }}</v-list-item-title>
                <v-list-item-subtitle>E-mail</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon><v-icon>phone</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ getProfile.phone }}</v-list-item-title>
                <v-list-item-subtitle>Phone</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>

            <v-list-item>
              <v-list-item-icon><v-icon>location_on</v-icon></v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ getProfile.city }}</v-list-item-title>
                <v-list-item-subtitle>City</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider inset></v-divider>
          </v-list>

          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text :to="'/profile/edit'">Change Profile Data</v-btn>
              <v-btn text :to="'/password/change'">Change Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProfileInfo",
  data() {
    return {
      email: "",
      name: "",
      phone: "",
      city: ""
    };
  },
  computed: {
    ...mapGetters([
      "isAuth",
      "getProfile",
      "getProcessing",
      "getError",
      "getToken"
    ])
  },
  methods: {
    ...mapActions(["LOAD_PROFILE"])
  },
  created() {
    this.LOAD_PROFILE();
  }
};
</script>

<style scoped></style>
