<template>
  <v-container>
    <v-layout row wrap>
      <event-item></event-item>

      <v-flex xs12 sm12 md12>
        <v-timeline align-top dense>
          <v-timeline-item fill-dot class="white--text mb-5" color="orange" large>
            <template v-slot:icon>
              <span>JL</span>
            </template>
            <v-text-field
              v-model="input"
              hide-details
              flat
              label="Leave a feedback..."
              solo
              @keydown.enter="comment"
            >
              <template v-slot:append>
                <v-btn class="mx-0" depressed @click="comment">Post</v-btn>
              </template>
            </v-text-field>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <template v-slot:icon>
              <v-avatar>
                <img src="http://i.pravatar.cc/64">
              </v-avatar>
            </template>

            <v-layout wrap pt-3>
              <v-flex xs2>
                <span class="caption grey--text">15 apr 13:12</span>
                <br>
                <span class="caption grey--text text-truncate">Name of member</span>
              </v-flex>
              <v-flex xs9>
                <div
                  class="body-1 mb-2"
                >Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</div>
              </v-flex>
              <v-flex xs1>
                <v-btn text icon color="red">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item color="teal lighten-3" small>
            <template v-slot:icon>
              <v-avatar>
                <img src="http://i.pravatar.cc/64">
              </v-avatar>
            </template>

            <v-layout wrap pt-3>
              <v-flex xs2>
                <span class="caption grey--text">15 apr 13:12</span>
                <br>
                <span class="caption grey--text text-truncate">Name of member</span>
              </v-flex>
              <v-flex xs9>
                <div
                  class="body-1 mb-2"
                >Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,</div>
              </v-flex>
              <v-flex xs1>
                <v-btn text icon color="red">
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EventItem from "./EventItem.vue";

export default {
  data: () => ({}),
  components: {
    EventItem: EventItem
  }
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.75;
  position: absolute;
  width: 100%;
}
</style>