<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Reset Password Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                prepend-icon="person"
                name="email"
                label="Email"
                type="email"
                v-model="email"
                :rules="emailRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat :to="'/register'">Register</v-btn>
            <v-btn small flat :to="'/login'">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="signup"
              :disabled="processing || !valid"
            >Reset Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: "Reset Password",
  data() {
    return {
      email: null,
      valid: false,
      emailRules: [
        v => !!v || "Please enter email",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Wrong email"
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
      //   this.$store.dispatch("SIGNIN", {
      //     email: this.email,
      //     password: this.password
      //   });
    }
  }
};
</script>

<style scoped></style>
