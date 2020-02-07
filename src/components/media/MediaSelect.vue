<template>

	  <div>

		<v-layout row wrap ma-4>
		<v-flex xs12>
        
        <v-card class="mx-lg-auto my-lg-auto">
          <v-card-text style="height: 300px;" class="grey lighten-5 ">
            <v-card class="my-5" v-if="getSelectedMedia">
              <v-img :src="getSelectedMedia.full_url"></v-img>
            </v-card>
            <p
            class="text-xs-center title font-weight-light pa-md-4" 
            v-if="getSelectedMedia == null"
            >No image</p>
          </v-card-text>

          <v-card-text style="height: 50px; position: relative">


            <v-dialog v-model="dialog" persistent width="600" height="400">
      <template v-slot:activator="{ on }">
            <v-btn
              absolute
              dark
              fab
              top
              right
              color="pink"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">Select uploaded image</v-card-title>
        <v-card-text>
        <v-row  key="0">
        <v-col cols="4">
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            >
              <v-btn
              small
              absolute
              class="mb-7"
              dark
              fab
              bottom
              right
              color="red lighten-1"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            </v-img>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card>
            <v-img
              src="https://picsum.photos/350/165?random"
              height="125"
              class="grey darken-4"
            ></v-img>
          </v-card>
        </v-col>
      </v-row>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
    <v-pagination
      v-model="page"
      :length="6"
    ></v-pagination>
          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
          </v-card-text>

            <v-card-actions>

            </v-btn>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
        </v-card>



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
              <v-btn icon @click.prevent="deleteMedia(media.id)" v-if="getRole == 'admin'"><v-icon>delete</v-icon></v-btn>
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
    
  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import UploadButton from 'vuetify-upload-button' // https://www.npmjs.com/package/vuetify-upload-button

export default {

  name: 'MediaSelect',

  data () {
    return {
      dialog: false,
    	image: null,
    	image_name: null,
    	page: 1
    }
  },

  props: ['media_id', 'category'],
  methods: {
    ...mapActions(['CREATE_IMAGE_MEDIA', 'LOAD_MEDIA_LIST', 'SELECT_MEDIA', 'SET_PAGE', 'SET_SUCCESS_MESSAGE', 'DELETE_MEDIA']),
  	imageUploaded(file) {
      this.CREATE_IMAGE_MEDIA({
        file: file,
        category: this.category
      })
  	},

    deleteMedia(media_id) {
      this.$dialog.confirm({
        text: 'Do you really want to delete this butifull image?',
        title: 'Please confirm'
      }).then((v) => {
        if (v) {
          this.DELETE_MEDIA(media_id)
        }
      })
    }
  },
  components: {
  	'upload-btn': UploadButton
  },
  computed: {
    ...mapGetters(['getSelectedMedia', 'getSelectedMediaID', 'getMediaList', 'getPageCount', 'getRole']),            
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