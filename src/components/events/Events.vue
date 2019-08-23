<template>
  <v-container id="events" tag="section" grid-list-xl>
    <base-subheading>Tensegrity Events</base-subheading>

    <event-item  v-for="event in getGeneralEventList" :key="`event-${event.id}`" :event="event" ></event-item>
  </v-container>
</template>


<script>
import EventItem from "./EventItem.vue";
import { mapGetters, mapActions } from "vuex"

export default {
  data: () => ({}),
  components: {
    EventItem: EventItem
  },
  computed: {
    ...mapGetters(["getProcessing", "getGeneralEventList"]),
  },
  methods: {
    ...mapActions(["LOAD_GENERAL_EVENT_LIST"]),
  },
  mounted() {
    this.LOAD_GENERAL_EVENT_LIST();
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
