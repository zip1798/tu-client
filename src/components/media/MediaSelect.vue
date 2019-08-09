<template>

	  <v-card>

		<v-layout row wrap mt-4>
		<v-flex xs12>
		  <upload-btn
		    title="Add Image "
		    accept="image/*"
		    large
        @file-update="imageUploaded"
		  >
		    <template slot="icon">
		      <v-icon>add</v-icon>
		    </template>
		  </upload-btn>



		  <v-card v-if="image">
		    <v-img :src="image" max-height="200" class="grey darken-4" contain></v-img>
		    <v-card-title class="title">{{ image_name }}</v-card-title>
		  </v-card>
		</v-flex>
		</v-layout>

    <v-container grid-list-sm fluid>
      <v-layout row wrap>
        <v-flex v-for="n in 9" :key="n" xs4 d-flex>
          <v-hover>
            <v-card
              flat
              tile
              class="d-flex"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
            >
              <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-layout fill-height align-center justify-center ma-0>
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </template>

                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out black darken-1 v-card--reveal white--text pa-3"
                    style="height: 30%;"
                  >
                    <v-radio-group v-model="media_id" row dark>
                      <v-radio label="Select Image" :value="`radio-${n}`"></v-radio>
                    </v-radio-group>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-card>

          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="text-xs-center">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
    
  </v-card>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UploadButton from 'vuetify-upload-button' // https://www.npmjs.com/package/vuetify-upload-button

export default {

  name: 'MediaSelect',

  data () {
    return {
    	// media_id: null,
    	image: null,
    	image_name: null,
    	page: 1
    }
  },

  props: ['media_id', 'category'],
  methods: {
    ...mapActions(['CREATE_IMAGE_MEDIA', 'LOAD_MEDIA_LIST', 'SELECT_MEDIA', 'SET_PAGE']),
  	imageUploaded(file) {
      this.CREATE_IMAGE_MEDIA({
        file: file,
        category: this.category
      })
  	}
  },
  components: {
  	'upload-btn': UploadButton
  },
  computed: {
    ...mapGetters(['getSelectedMedia', 'getMediaList']),            
  },
  mounted() {
    this.LOAD_MEDIA_LIST();
  },

}
</script>

<style lang="css" scoped>
</style>