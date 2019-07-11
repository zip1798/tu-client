<template>
  <v-container id="events" tag="section" grid-list-xl>
    <base-subheading>My Events</base-subheading>

    <event-item></event-item>
    <event-item></event-item>
    <event-item></event-item>
    <event-item></event-item>
    <event-item></event-item>
    <event-item></event-item>
  </v-container>
</template>


<script>
import EventItem from "./EventItem.vue";

export default {
  data: () => ({
  }),
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