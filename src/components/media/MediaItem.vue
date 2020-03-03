<template>

<v-card
    class="mx-auto my-5"
  >
    <v-icon size="128" v-if="getMedia==null">image</v-icon>
    <v-img :src="getMedia.full_url" v-if="getMedia!=null" height="300px"></v-img>

    <v-card-actions>
      <slot name="action"></slot>
    </v-card-actions>
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

