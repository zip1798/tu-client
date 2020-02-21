<template>
  <v-container>
    <v-layout row wrap>
      <event-form>
        <template #finish-action>
          <v-btn color="primary mx-2" tile @click.prevent="createEvent" :disabled="getProcessing">Create Event</v-btn>
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
    ...mapGetters(["getProcessing", "getSelectedMediaID"]),
  },
  methods: {
    ...mapActions(['CREATE_EVENT']),
    createEvent() {
      // todo
      // this.model.media_id = this.getSelectedMediaID
      this.CREATE_EVENT()
    },
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