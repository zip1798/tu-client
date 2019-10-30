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
	            <div v-html="getEvent.html_after_registration"></div>
            </v-card-text>

            <v-card-actions>

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
  data: () => ({}),
  computed: {
    ...mapGetters(["getEvent", "getProcessing", "getItemProcessing"]),
  },
  methods: {
    ...mapActions(['LOAD_EVENT_ITEM']),

    goToInfo() {
      router.push('/event/info/'+this.getEvent.id)
    }

  }, // methods

  mounted() {
    this.LOAD_EVENT_ITEM(this.id)
  },

};
</script>

<style lang="css" scoped>
</style>