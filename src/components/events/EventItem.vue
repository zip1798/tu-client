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
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out black darken-1 v-card--reveal white--text pa-3"
                style="height: 50%;"
              >Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</div>
            </v-expand-transition>
          </v-img>

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
            <v-btn icon>
              <v-icon color="red">favorite</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>share</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn flat :to="`/event/info/:id`">More details</v-btn>
            <v-btn flat :to="`/event/feedback/1`">Feedback
              <v-badge right color="red">
                <template v-slot:badge>
                  <span>6</span>
                </template>
                <v-icon right dark>feedback</v-icon>
              </v-badge>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({})
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