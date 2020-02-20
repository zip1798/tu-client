<template>
    <v-card>
    <v-card-title class="headline">Select uploaded image</v-card-title>
    <v-card-text>
      <v-row  key="0">
        <v-col cols="4">
          <v-card
          class="d-flex align-center justify-center"
          color="grey lighten-4" flat tile min-height="125">
            <upload-btn accept="image/*" large flat icon maxWidth="200" @file-update="imageUploaded">
              <template slot="icon">
                <v-icon>cloud_upload</v-icon>
              </template>
            </upload-btn>
          </v-card>
        </v-col>

        <v-col cols="4"
        v-for="(media, mediaIdx) in getMediaList"
        :key="`media-${media.id}`"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 6 : 0">
              <v-img
              :src="media.full_thumbnail_url"
              :lazy-src="media.full_thumbnail_url"
              aspect-ratio="1"
              height="125"
              class="grey darken-4"
              >
                <v-btn small absolute class="mb-7 mr-0" dark fab bottom right color="red lighten-1"
                @click.prevent="deleteMedia(media.id)" v-if="getRole == 'admin' && hover"
                >
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn small absolute class="mb-7 mr-12" dark fab bottom right color="red lighten-1"
                @click.prevent="selectMedia(media.id)"
                v-if="hover">
                  <v-icon>done</v-icon>
                </v-btn>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="text-xs-center" v-if="getPageCount > 1">
        <v-pagination v-model="page" :length="getPageCount"></v-pagination>
      </div>
      <slot name="action"></slot>
    </v-card-actions>
    </v-card>

</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import UploadButton from 'vuetify-upload-button' // https://www.npmjs.com/package/vuetify-upload-button

export default {

  data () {
    return {
      image: null,
      image_name: null,
      page: 1
    }
  },

  props: ['media_id', 'category', 'target'], // target - one | set
  methods: {
    ...mapActions(['CREATE_IMAGE_MEDIA', 'LOAD_MEDIA_LIST', 'SELECT_MEDIA', 'SET_PAGE', 'SET_SUCCESS_MESSAGE', 'DELETE_MEDIA']),
    ...mapMutations(['PUSH_TO_MEDIA_SET']),
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
    },

    selectMedia(media_id) {
        switch(this.target) {
            case 'set':
                this.PUSH_TO_MEDIA_SET(media_id)
            break
            default:
                this.SELECT_MEDIA(media_id)
        }
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
