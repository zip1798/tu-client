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
            <v-btn small flat :to="'/register'">Register</v-btn>
            <v-btn small flat :to="'/login'">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="resetPassword"
              :disabled="getProcessing || !valid"
            >Reset Password</v-btn>
          </v-card-actions>
        </v-card>

        <!-- Set new password -->
        <v-card class="elevation-12" v-if="!token">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Set New Password Form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid_password">

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat :to="'/register'">Register</v-btn>
            <v-btn small flat :to="'/login'">Login</v-btn>
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
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Reset Password",
  props:['token'],
  data() {
    return {
      email: null,
      valid: false,
      valid_password: false,
      emailRules: [
        v => !!v || "Please enter email",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Wrong email"
      ]
    };
  },
  computed: {
    ...mapGetters(['isAuth', 'getUser', 'getProcessing', 'getError']),            
  },
  methods: {
    ...mapActions(['AUTH_LOGOUT', 'RESET_PASSWORD']),
    resetPassword() {
      RESET_PASSWORD({email: this.email});
    },
    setNewPassword() {
      // todo
    }
  }
};
</script>

<style scoped></style>
