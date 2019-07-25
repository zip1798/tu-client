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
              
              <v-text-field
                prepend-icon="lock"
                name="new_password_confirmation"
                label="New Password Confirmation"
                id="new_password_confirmation"
                type="password"
                v-model="new_password_confirmation"
                :rules="passwordConfirmRules"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn small flat :to="'/profile/info'">Profile Info</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="passwordChange" :disabled="getProcessing || !valid">Change Password</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "PasswodrChange",
  data() {
    return {
      old_password: null,
      new_password: null,
      new_password_confirmation: null,
      valid: false,
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
    ...mapGetters(['isAuth', 'getUser', 'getProcessing', 'getError']),            
  },
  methods: {
    ...mapActions(['CHANGE_PASSWORD']),
    passwordChange() {
      this.CHANGE_PASSWORD({
        old_password: this.old_password,
        new_password: this.new_password,
        new_password_confirmation: this.new_password_confirmation
      });
    }
  }
};
</script>

<style scoped></style>
