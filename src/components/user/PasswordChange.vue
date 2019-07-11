<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Password Change Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-alert :value="error" type="warning">{{ error }}</v-alert>
            <v-form v-model="valid">
              <v-text-field
                prepend-icon="lock"
                name="old_password"
                label="Old Password"
                id="old_password"
                type="password"
                v-model="old_password"
                :rules="passwordRules"
                required
              ></v-text-field>
              
              <v-text-field
                prepend-icon="lock"
                name="new_password"
                label="New Password"
                id="new_password"
                type="password"
                v-model="new_password"
                :rules="passwordRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat :to="'/profile/info'">Profile Info</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="signup" :disabled="processing || !valid">Change Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "PasswodrChange",
  data() {
    return {
      old_password: null,
      new_password: null,
      valid: false,
      passwordRules: [
        v => !!v || "Please enter password",
        v => (v && v.length >= 6) || "Password is too short - min 6 simbols"
      ]
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
  methods: {
    signup() {
      //   this.$store.dispatch("SIGNUP", {
      //     email: this.email,
      //     password: this.password,
      //     name: this.name,
      //     phone: this.phone,
      //     city: this.city,
      //     is_subscribe_events: this.is_subscribe_events,
      //     is_subscribe_news: this.is_subscribe_news
      //   });
    }
  }
};
</script>

<style scoped></style>
