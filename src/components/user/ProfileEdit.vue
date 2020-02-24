<template>
  <v-container>

    <v-row >
          <base-subheading>Edit Profile</base-subheading>
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
        <v-row justify="center" align="start">
          <upload-btn accept="image/*" large flat maxWidth="200" @file-update="updateAvatar">
            <template slot="icon">
              <v-icon>cloud_upload</v-icon>
            </template>
            Upload Avatar
          </upload-btn>
        </v-row>
      </v-col>

      <v-col cols="12" md="9">
        <v-card class="mx-auto pa-5">
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

          <v-card-actions>
            <v-btn text :to="'/profile/info'">Profile Info</v-btn>
            <v-btn text :to="'/password/change'">Chang password</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.prevent="editProfile" :disabled="getProcessing || !valid">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UploadButton from 'vuetify-upload-button' // https://www.npmjs.com/package/vuetify-upload-button

export default {
  name: "ProfileEdit",
  data() {
    return {
      email: null,
      valid: false,
      name: null,
      phone: null,
      city: null,
      // is_subscribe_events: false,
      // is_subscribe_news: false,

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
  components: {
    'upload-btn': UploadButton
  },
  computed: {
    ...mapGetters(['isAuth', 'getProfile', 'getProcessing', 'getError', 'getToken']),            
  },
  methods: {
    ...mapActions(['LOAD_PROFILE', 'UPDATE_PROFILE', 'UPDATE_AVATAR']),
    initProfile(data) {
      this.email = data.email;
      this.name = data.name;
      this.phone = data.phone;
      this.city = data.city;
    },
    editProfile() {
      this.UPDATE_PROFILE({
        email: this.email,
        name: this.name,
        phone: this.phone,
        city: this.city
      })
    },
    updateAvatar(file) {
      this.UPDATE_AVATAR(file)
/*      let formData = new FormData();
      formData.append('file', file);
      console.log(arguments)
      console.log(file)
      console.log(formData)

      axios.post( '/single-file', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
        }
      ) 
*/    }
  },
  created() {
    this.LOAD_PROFILE();
    this.$bus.$on('loaded_profile', data => this.initProfile(data));
  },
  mounted() {
    this.initProfile(this.getProfile);
  },
  beforeDestroy() {
    this.$bus.$off('loaded_profile');
  },
};
</script>

<style scoped></style>
