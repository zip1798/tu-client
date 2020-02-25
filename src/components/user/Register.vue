<template>
  <v-container fluid fill-height>
    <v-row >
          <base-subheading>Registration form</base-subheading>
    </v-row >

    <v-layout align-start justify-center>
      <v-flex xs12 sm12 md12>
        <v-card v-if="!isAuth">
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                prepend-icon="person"
                name="name"
                label="Name"
                type="text"
                required
                v-model="name"
                :rules="nameRules"
              ></v-text-field>

              <v-text-field
                prepend-icon="mail"
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

              <v-text-field
                prepend-icon="phone"
                name="phone"
                label="Phone"
                type="text"
                v-model="phone"
              ></v-text-field>

              <v-text-field
                prepend-icon="place"
                name="city"
                label="City"
                type="text"
                v-model="city"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn text small :to="'/login'">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" @click.prevent="register" :disabled="getProcessing || !valid">Register</v-btn>
          </v-card-actions>
        </v-card>

        <v-card v-if="isAuth">
          <v-card-actions>
            <v-btn color="primary" @click.prevent="AUTH_LOGOUT">Logout</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      valid: false,
      phone: null,
      city: null,

      nameRules: [v => !!v || "Please enter your Name"],
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
    ...mapGetters(['isAuth', 'getUser', 'getProcessing', 'getError'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['AUTH_LOGOUT', 'REGISTER']),
    register() {
        this.REGISTER({
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
          city: this.city,
        });
    }
  }
};
</script>

<style scoped></style>
