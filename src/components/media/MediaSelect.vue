<template>

	  <v-card>

		<v-layout row wrap mt-4>
		<v-flex xs12>
      <v-card class="my-5" v-if="getSelectedMedia">
         <v-img :src="getSelectedMedia.full_url"></v-img>
      </v-card>
      
      <p class="text-xs-center title font-weight-light my-5" v-if="getSelectedMedia == null">No image</p>

		</v-flex>
		</v-layout>

    <v-container grid-list-sm fluid>
      <div class="title font-weight-light mb-3">Choose image for event from library</div>
      <v-layout row wrap>
        <v-flex v-for="(media, mediaIdx) in getMediaList" :key="`media-${media.id}`" xs4 d-flex>
          <v-hover>
            <v-card flat tile 
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 12 : 2}`"
            >
            <v-card-text>
              
              <v-img
                :src="media.full_thumbnail_url"
                :lazy-src="media.full_thumbnail_url"
                aspect-ratio="1"
                class="grey lighten-2"
              >
<!-- 
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
                      <v-radio label="Select Image" :value="media.id"></v-radio>
                    </v-radio-group>
                  </div>
                </v-expand-transition>
 -->              
              </v-img>
            </v-card-text>
            <v-card-actions>
              <v-btn 
                flat 
                :color="getSelectedMediaID == media.id ? 'red' : 'blue'"
                @click.prevent="SELECT_MEDIA(media.id)"
                >Select</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click.prevent="deleteMedia(media.id)"><v-icon>delete</v-icon></v-btn>
            </v-card-actions>
            </v-card>

          </v-hover>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="text-xs-center" v-if="getPageCount > 1">
      <v-pagination v-model="page" :length="getPageCount"></v-pagination>
    </div>
    
    <v-divider></v-divider>
    <upload-btn
      title="Upload new Image to library "
      accept="image/*"
      large
      @file-update="imageUploaded"
    >
      <template slot="icon">
        <v-icon>add</v-icon>
      </template>
    </upload-btn>
    
  </v-card>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UploadButton from 'vuetify-upload-button' // https://www.npmjs.com/package/vuetify-upload-button

export default {

  name: 'MediaSelect',

  data () {
    return {
    	image: null,
    	image_name: null,
    	page: 1
    }
  },

  props: ['media_id', 'category'],
  methods: {
    ...mapActions(['CREATE_IMAGE_MEDIA', 'LOAD_MEDIA_LIST', 'SELECT_MEDIA', 'SET_PAGE', 'SET_SUCCESS_MESSAGE']),
  	imageUploaded(file) {
      this.CREATE_IMAGE_MEDIA({
        file: file,
        category: this.category
      })
  	},

    deleteMedia(media_id) {
      this.$dialog.confirm({
        text: 'Do you really want to delete this butify image?',
        title: 'Please confirm'
      }).then((v) => {
        if (v) {
          this.SET_SUCCESS_MESSAGE('This is Sparta! Media will be deleted, anywhere !')
        }
      })
    }
  },
  components: {
  	'upload-btn': UploadButton
  },
  computed: {
    ...mapGetters(['getSelectedMedia', 'getSelectedMediaID', 'getMediaList', 'getPageCount']),            
  },
  mounted() {
    this.LOAD_MEDIA_LIST();
  },
  watch: {
    page(newValue, oldValue) {
      this.SET_PAGE(newValue)
    },
    media_id(newValue, oldValue) {
      this.SELECT_MEDIA(newValue)
    }
  }

}
</script>

<style lang="css" scoped>
</style>