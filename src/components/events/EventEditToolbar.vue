<template>
  <v-tabs show-arrows>
    <v-tab :to="`/event/info/:id`">Event page</v-tab>
    <v-tab :to="`/home`">Comments</v-tab>
    <v-tab :to="`/home`">For participant</v-tab>
    <v-tab :to="`/event/edit/:id`">Update Event</v-tab>
    <v-tab :to="`/event/delete/:id`">Delete Event</v-tab>
    <v-tab :to="`/event/sendmail/:id`">Send email to members</v-tab>
    <v-tab :to="`/event/members/:id`">Event Memebers</v-tab>
    <v-tab :to="`/event/invite/:id`">Invite to Event</v-tab>
  </v-tabs>
</template>
