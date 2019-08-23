<template>
  <v-layout row wrap>
    <!-- <v-flex xs12 sm12>
        <v-card>
          <v-btn absolute bottom right fab>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-img
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          ></v-img>
        </v-card>
        <v-card>
          <v-card-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <span class="grey--text">Number 10</span>
              <br>
              <span>Whitehaven Beach</span>
              <br>
              <span>Whitsunday Island, Whitsunday Islands</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
    </v-flex>-->
    <v-flex xs12 sm12>
      <v-hover>
        <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
          <v-img
            class="white--text"
            height="200px"
            :src="event.full_url"
            v-if="event.full_url"
          >
<!--             <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out black darken-1 v-card--reveal white--text pa-3"
                style="height: 50%;"
                v-html="event.brief"
              ></div>
            </v-expand-transition>
 -->
          </v-img>

          <v-card-title>
            <div>
              <h3 class="headline mb-0"><router-link :to="`/event/info/${event.id}`">{{ event.title }}</router-link></h3>
              <span class="grey--text">{{ event.event_date}}</span>
              <br>
              <span>{{ event.place }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn icon @click.prevent="TOOGLE_INTERESTED(event.id)" v-if="isAuth">
              <v-icon :color="event.is_interested ? 'red' : 'grey'">favorite</v-icon>
            </v-btn>

            <social-btn :url="`event/info/${event.id}`" :title="event.title" :description="event.title"></social-btn>

            <v-spacer></v-spacer>
            <v-btn flat :to="`/event/info/${event.id}`">More details</v-btn>
          </v-card-actions>
          <v-card-text>
            <div v-html="event.brief"></div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import SocialBtn from "@/components/base/SocialBtn"

export default {
  data: () => ({}),
  props: ['event'],
  computed: {
      ...mapGetters(["isAuth"]),
  },
  components: {
    SocialBtn
  },
  methods: {
      ...mapActions(['TOOGLE_INTERESTED']),
  }, // methods

};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.75;
  position: absolute;
  width: 100%;
}
</style>