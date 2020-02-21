<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12" v-if="!isAuth">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login </v-toolbar-title>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small text :to="'/register'">Register</v-btn>
            <v-btn small text :to="'/password/reset'">Reset password</v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" @click.prevent="signup" :disabled="getProcessing || !valid">Login</v-btn>
          </v-card-actions>
        </v-card>

        <v-card class="elevation-12" v-if="isAuth">
          <v-card-actions>
            <v-btn color="primary" @click.prevent="AUTH_LOGOUT">Logout</v-btn>
          </v-card-actions>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      valid: false,
      emailRules: [
        v => !!v || "Please enter email",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Wrong email"
      ],
      passwordRules: [
        v => !!v || "Please enter password",
        v => (v && v.length >= 6) || "Password is too short - min 6 simbols"
      ]
    };
  },
  computed: {
    ...mapGetters(['isAuth', 'getUser', 'getProcessing', 'getError']),            
  },
  methods: {
    ...mapActions(['AUTH_LOGOUT', 'LOGIN']),
    signup() {
      this.LOGIN({
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style scoped></style>
