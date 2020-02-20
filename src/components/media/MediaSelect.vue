<template>
  <v-layout row wrap ma-4>
    <v-flex xs12>
      <v-card class="mx-lg-auto my-lg-auto">
        
        <v-card
        class="d-flex align-center justify-center"
        color="grey lighten-5"
        flat
        tile
        min-height="300"
        >
          <v-icon size=128 v-if="getSelectedMedia == null">image</v-icon>
          <v-img :src="getSelectedMedia.full_url" v-if="getSelectedMedia"></v-img>
        </v-card>

        <v-card-text style="height: 50px; position: relative">
          <v-dialog v-model="dialog" persistent width="600" height="400">
            <template v-slot:activator="{ on }">
              <v-btn absolute dark fab top right color="pink" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <media-select-list :media_id="media_id" :category="category">
              <template #action="">
                <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
              </template>
            </media-select-list>
          </v-dialog>
        </v-card-text>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import MediaSelectList from "@/components/media/MediaSelectList";

export default {

  name: 'MediaSelect',

  data () {
    return {
      dialog: false,
    }
  },

  props: ['media_id', 'category'],
  methods: {
    ...mapActions(['SELECT_MEDIA', ]),
  },
  components: {
    'media-select-list': MediaSelectList
  },
  computed: {
    ...mapGetters(['getSelectedMedia', ]),
  },
  watch: {
    media_id(newValue, oldValue) {
      this.SELECT_MEDIA(newValue)
    }
  }

}
</script>

<style lang="css" scoped>
</style>