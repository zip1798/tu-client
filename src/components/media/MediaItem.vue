<template>
  <v-card
    class="d-flex align-center justify-center"
    color="grey lighten-5"
    flat
    tile
    min-height="300"
  >
    <v-icon size="128" v-if="getMedia==null">image</v-icon>
    <v-img :src="getMedia.full_url" v-if="getMedia!=null"></v-img>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getMedia"])
  }
};
</script>

