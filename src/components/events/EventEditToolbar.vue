<template>
  <v-tabs>
    <v-tab :to="`/home`">Comments</v-tab>
    <v-tab :to="`/home`">For participant</v-tab>
    <v-tab :to="`/event/edit/:id`">Update Evevent</v-tab>
    <v-tab :to="`/event/sendmail/:id`">Send email to members</v-tab>
    <v-tab :to="`/event/members/:id`">Event Memebers</v-tab>
    <v-tab :to="`/event/invite/:id`">Invite to Event</v-tab>
  </v-tabs>
</template>
