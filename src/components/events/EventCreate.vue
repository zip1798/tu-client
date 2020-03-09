<template>
  <v-container>
    <v-row >
          <base-subheading>Create Event</base-subheading>
    </v-row >
    <v-layout row wrap>
      <event-form>
        <template #finish-action>
          <v-btn color="primary mx-2" tile @click.prevent="CREATE_EVENT" :disabled="getProcessing">Create Event</v-btn>
        </template>
      </event-form>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import EventForm from "@/components/events/form/EventForm";

export default {
  data() {
    return {
    };
  },
  components: {
    EventForm,
  },
  computed: {
    ...mapGetters(["getProcessing", "getSelectedMediaID", "getEvent"]),
  },
  methods: {
    ...mapActions(['CREATE_EVENT']),
  }, // methods


};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>