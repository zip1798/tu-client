<template>
  <v-tabs show-arrows>
    <v-tab v-if="hasPerm('read')" :to="url('info')">Event page</v-tab>
    <v-tab v-if="hasPerm('read')" :to="url('comments')">Comments</v-tab>
    <v-tab v-if="hasPerm('participate')" :to="url('for_participants')">For participant</v-tab>
    <v-tab v-if="hasPerm('update')" :to="url('edit')">Update Event</v-tab>
    <v-tab v-if="hasPerm('delete')" :to="url('delete')">Delete Event</v-tab>
    <v-tab v-if="hasPerm('mailing')" :to="url('sendmail')">Send email to members</v-tab>
    <v-tab v-if="hasPerm('update')" :to="url('members')">Event Memebers</v-tab>
    <v-tab v-if="hasPerm('mailing')" :to="url('invite')">Invite to Event</v-tab>
  </v-tabs>
</template>

<script>
import { mapGetters } from "vuex"


export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["getEvent", "getEventPerms"]),
  },
  methods: {
    url(sUrl) {
      return '/event/' + sUrl + '/' + this.getEvent.id
    },

    hasPerm(sPerm) {
      return this.getEventPerms.indexOf(sPerm) != -1;
    }
  }
};
</script>
