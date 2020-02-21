<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <!-- Send reset mail -->
        <v-card class="elevation-12" v-if="!token">
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
            <v-btn small text :to="'/register'">Register</v-btn>
            <v-btn small text :to="'/login'">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="resetPassword"
              :disabled="getProcessing || !valid"
            >Reset Password</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Set new password -->
        <v-card class="elevation-12" v-if="token">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Set New Password Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid_password">
              <v-text-field
                prepend-icon="lock"
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                :rules="passwordRules"
                required
              ></v-text-field>

              <v-text-field
                prepend-icon="lock"
                name="password_confirm"
                label="Confirm Password"
                id="password_confirm"
                type="password"
                v-model="password_confirm"
                :rules="passwordConfirmRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small text :to="'/register'">Register</v-btn>
            <v-btn small text :to="'/login'">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="setNewPassword"
              :disabled="getProcessing || !valid_password"
            >Set New Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ResetPassword",
  props: ["token"],
  data() {
    return {
      email: null,
      password: null,
      password_confirm: null,
      valid: false,
      valid_password: false,
      emailRules: [
        v => !!v || "Please enter email",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Wrong email"
      ],
      passwordRules: [
        v => !!v || "Please enter password",
        v => (v && v.length >= 6) || "Password is too short - min 6 simbols"
      ],
      passwordConfirmRules: [
        v => !!v || "Please enter password confirmation",
        v => (v && v == this.password) || "Wrong confirmation of password"
      ]
    };
  },
  computed: {
    ...mapGetters(["isAuth", "getUser", "getProcessing", "getError"])
  },
  methods: {
    ...mapActions(["AUTH_LOGOUT", "RESET_PASSWORD", "SET_NEW_PASSWORD"]),
    resetPassword() {
      this.RESET_PASSWORD({ email: this.email });
    },
    setNewPassword() {
      this.SET_NEW_PASSWORD({
        token: this.token,
        password: this.password,
        password_confirm: this.password_confirm
      });
    }
  }
};
</script>

<style scoped></style>
