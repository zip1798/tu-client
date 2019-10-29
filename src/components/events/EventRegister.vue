<template>
	<v-container id="events" tag="section" grid-list-xl>
    <base-subheading>Registration on event</base-subheading>

    <div style="height: 350px;" v-if="getItemProcessing('LOAD_EVENT_ITEM')">
     <v-layout
      align-center
      column
      justify-center
      row fill-height
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-layout>
    </div>



    <v-layout row wrap v-if="getEvent.title">
      <v-flex xs12 sm12>
        <v-hover>
          <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
            <v-img
              class="white--text"
              height="200px"
              :src="getEvent.media_url"
            >

             <v-layout
              align-start
              column
              justify-end
              fill-height
            >
              <h1 class="display-2 font-weight-thin mb-3 ml-5">{{ getEvent.title }}</h1>
              <h4 class="subheading  ml-5">{{ getEvent.place }} - <span class="font-weight-thin">{{ getEvent.event_date }}</span></h4>
            </v-layout>

            </v-img>

            <v-card-title>
              <div>
                <h3 class="headline mb-0">{{ getEvent.title }}</h3>
                <span class="grey--text">{{ getEvent.event_date }}</span>
                <br>
                <span>{{ getEvent.place }}</span>
              </div>
            </v-card-title>
            <v-card-text>
	            <v-form v-model="valid">
					<v-text-field
						prepend-icon="person"
						name="name"
						label="Name"
						type="text"
						v-model="name"
						:rules="nameRules"
						required
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

					<v-textarea
						name="comments"
						label="Comments"
						v-model="comments"
						hint="Hint text"
					></v-textarea>

				</v-form>
            </v-card-text>

            <v-card-actions>
              <v-btn flat block large
              color="primary"
              @click.prevent="submit"
              :disabled="!!getProcessing || !valid"
              >Register on Event</v-btn>
            </v-card-actions>


          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import router from "@/router";


export default {
  props: ['id'],
  data: () => ({
      name: null,
      email: null,
      valid: false,
      phone: null,
      city: null,
      comments: null,

      nameRules: [v => !!v || "Please enter your Name"],
      emailRules: [
        v => !!v || "Please enter email",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Wrong email"
      ],

  }),
  components: {
  },
  computed: {
    ...mapGetters(["getEvent", "getProcessing", "getItemProcessing", "getProfile"]),
  },
  methods: {
    ...mapActions(['SILENT_LOAD_PROFILE', 'REGISTER_EVENT', 'LOAD_EVENT_ITEM']),

    goToInfo() {
      router.push('/event/info/'+this.getEvent.id)
    },

    initProfile(data) {
      this.name = data.name
      this.email = data.email
      this.city = data.city
    },
    clearForm() {
      this.name = null
      this.email = null
      this.city = null
    }, // clearForm
    submit() {
        this.REGISTER_EVENT({
          event_id: this.id,
		      name: this.name,
		      email: this.email,
		      city: this.city,
		      commetns: this.commetns
        })
    }
  }, // methods

  created() {
    this.SILENT_LOAD_PROFILE();
    this.$bus.$on('loaded_profile', data => this.initProfile(data));
  },
  mounted() {
    this.initProfile(this.getProfile);
    this.LOAD_EVENT_ITEM(this.id)
  },
  beforeDestroy() {
    this.$bus.$off('loaded_event');
  },

};
</script>

<style lang="css" scoped>
</style>