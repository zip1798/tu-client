<template>
    <v-dialog v-model="dialog" persistent width="600" height="400">
    <template v-slot:activator="{ on }">
        <base-btn v-on="on">Select new Image</base-btn>
    </template>
    <media-select-list :category="category">
        <template #action="">
            <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </template>
    </media-select-list>
    </v-dialog>
</template>

<script>
import MediaSelectList from "@/components/media/MediaSelectList";

export default {
  props: ['category'],

  components: {
    MediaSelectList
  },

  data() {
    return {
      dialog: false,
    };
  },

}
</script>
