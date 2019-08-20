<template>
  <v-container id="events" tag="section" grid-list-xl>
    <base-subheading>Tensegrity Events</base-subheading>

    <div style="height: 350px;" v-if="getProcessing == 'LOAD_EVENT_ITEM'">
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
            <v-card-actions>
              <v-btn icon @click.prevent="TOOGLE_INTERESTED()" v-if="isAuth">
                <v-icon :color="getEvent.is_interested ? 'red' : 'grey'" >favorite</v-icon>
              </v-btn>
              
              <social-btn :url="'event/info/${getEvent.id}'" :title="getEvent.title" :description="getEvent.title"></social-btn>

              <v-btn flat @click.prevent="goToEdit">
                <v-icon>edit</v-icon>
                Edit
              </v-btn>
              <v-btn flat>
                <v-icon>delete</v-icon>
                Delete
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn flat color="blue-grey" class="white--text" :to="`/event/feedback/1`">Feedback
                <v-badge right color="red">
                  <template v-slot:badge>
                    <span>6</span>
                  </template>
                  <v-icon right dark>feedback</v-icon>
                </v-badge>
              </v-btn>
            </v-card-actions>
            <v-card-text
              class="body-2"
              v-html="getEvent.brief"
            ></v-card-text>
            <v-card-text class="body-1" v-html="getEvent.description"></v-card-text>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import SocialBtn from "@/components/base/SocialBtn"
import router from "@/router";


export default {
  props: ['id'],
  data: () => ({

  }),
  components: {
    SocialBtn
  },
  computed: {
    ...mapGetters(["getEvent", "getProcessing", "isAuth"]),
  },
  methods: {
    ...mapActions(['LOAD_EVENT_ITEM', 'TOOGLE_INTERESTED']),
    goToEdit() {
      router.push('/event/edit/'+this.getEvent.id)
    }
  }, // methods
  mounted() {
    this.LOAD_EVENT_ITEM(this.id)
  }
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