<template>
  <v-toolbar dark color="primary">
    <v-toolbar-title>Update Event</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat :to="`/event/edit/:id`">General Info</v-btn>
      <v-btn flat :to="`/event/sendmail/:id`">Send email</v-btn>
      <v-btn flat :to="`/event/members/:id`">Partisipants</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>