<template>
  <v-container>
    <!-- 
		https://www.froala.com/wysiwyg-editor/examples
		https://github.com/hifarer/vueditor
		https://github.com/chmln/vue-wysiwyg
		https://github.com/mbouclas/tinymce-vue-2
		https://www.npmjs.com/package/vue-wysiwyg
    -->
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ form_title }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                prepend-icon="title"
                name="title"
                label="Title"
                type="text"
                v-model="model.title"
                :rules="requireRules"
                required
              ></v-text-field>

              <v-text-field
                prepend-icon="place"
                name="place"
                label="Place"
                type="text"
                v-model="model.place"
                :rules="requireRules"
                required
              ></v-text-field>

              <v-layout row wrap>
                <v-flex xs12 sm4 md4>
                  <v-dialog
                    ref="dialog"
                    v-model="event_date_modal"
                    :return-value.sync="model.event_date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="model.event_date"
                        label="Date end of showing on site"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="model.event_date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="event_date_modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(model.event_date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 sm8 md8>
                  <v-text-field
                    prepend-icon="event"
                    name="event_time_title"
                    label="Event Date"
                    type="text"
                    v-model="model.event_time_title"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-textarea
                name="brief"
                box
                label="Brief description"
                auto-grow
                v-model="model.brief"
              ></v-textarea>

              <v-textarea
                name="description"
                box
                label="Full description"
                auto-grow
                v-model="model.description"
              ></v-textarea>

              <!-- wysiwyg v-model="description" / -->
              <v-radio-group v-model="category" row>
                <template v-slot:label>
                  <div>
                    <strong>Category</strong>
                  </div>
                </template>
                <v-radio value="Google">
                  <template v-slot:label>
                    <div>Regular practice</div>
                  </template>
                </v-radio>
                <v-radio value="Duckduckgo">
                  <template v-slot:label>
                    <div>Unregular practice</div>
                  </template>
                </v-radio>
                <v-radio value="seminar">
                  <template v-slot:label>
                    <div>Seminar</div>
                  </template>
                </v-radio>
              </v-radio-group>

              <v-radio-group v-model="status" row>
                <template v-slot:label>
                  <div>
                    <strong>Status</strong>
                  </div>
                </template>
                <v-radio value="Active">
                  <template v-slot:label>
                    <div>Active</div>
                  </template>
                </v-radio>
                <v-radio value="Hiden">
                  <template v-slot:label>
                    <div>Hiden</div>
                  </template>
                </v-radio>
                <v-radio value="Deleted">
                  <template v-slot:label>
                    <div>Deleted</div>
                  </template>
                </v-radio>
              </v-radio-group>

              <!-- <v-radio-group v-model="prority" row>
                <template v-slot:label>
                  <div>
                    <strong>Priority</strong>
                  </div>
                </template>
                <v-radio value="low">
                  <template v-slot:label>
                    <div>Low</div>
                  </template>
                </v-radio>
                <v-radio value="normal">
                  <template v-slot:label>
                    <div>Normal</div>
                  </template>
                </v-radio>
                <v-radio value="high">
                  <template v-slot:label>
                    <div>High</div>
                  </template>
                </v-radio>
              </v-radio-group>-->
              <v-layout row wrap>
                <v-flex xs12 sm4 md3>
                  <v-switch
                    v-model="model.is_allow_online"
                    label="Allow online"
                    color="indigo darken-3"
                    hide-details
                  ></v-switch>
                </v-flex>
              </v-layout>

              <v-layout row wrap mt-4>
                <v-flex xs12>
                  <upload-btn
                    title="Add Image "
                    accept="image/*"
                    large
                    :fileChangedCallback="imageChanged"
                  >
                    <template slot="icon">
                      <v-icon>add</v-icon>
                    </template>
                  </upload-btn>

                  <v-card v-if="model.image">
                    <v-img :src="model.image" max-height="200" class="grey darken-4" contain></v-img>
                    <v-card-title class="title">{{ model.image_name }}</v-card-title>
                  </v-card>
                </v-flex>
              </v-layout>

              <v-card>
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
                                <v-radio-group v-model="model.media_id" row dark>
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
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="submit"
              :disabled="getProcessing || !valid"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UploadButton from "vuetify-upload-button";
import { mapGetters, mapActions } from "vuex";
// import * as eventHelper from '../helpers/event'

export default {
  name: "EventForm",
  data() {
    return {
      model: {
        id: null,
        title: null,
        place: null,
        event_time_title: null,
        brief: null,
        description: null,
        event_date: null,
        is_allow_online: true,
        is_show: true,
        is_priority: false,
        image: null,
        image_name: null,
        media_id: null
      },
      event_date_modal: false,
      valid: false,

      requireRules: [v => !!v || "Please enter value"]
    };
  },
  // mounted(){},
  components: {
    "upload-btn": UploadButton
  },
  props: {
    mode: {
      type: String,
      required: true
    },
    event: {
      type: Object,
      required: false
    }
  },
  computed: {
    ...mapGetters(["isUserAuthenticated", "getError", "getProcessing"]),
    form_title() {
      // switch(this.mode) {
      // 	case 'edit' :
      // 		return 'Update Event';
      // }
      return "Create Event";
    },
    event_date() {
      return this.model.event_date;
    }
  },
  methods: {
    submit() {
      // this.$store.dispatch('SET_EVENT', {data: this.model, mode: this.mode})
      // if (this.mode == 'create') {
      // 	this.clearForm()
      // }
    },
    imageChanged(file) {
      /*
		const fr = new FileReader ()
		fr.readAsDataURL(file)
		fr.addEventListener('load', () => {
			this.imageUrl = fr.result
			this.imageFile = file 
			this.imageName = file.name
		})
		//*/
      // let storageRef = firebase.storage().ref();
      // storageRef.child('event_images/' + file.name).put(file).then((snapshot)  => {
      // 	snapshot.ref.getDownloadURL().then((downloadURL) => {
      // 		console.log('File available at', downloadURL);
      // 	this.model.image = downloadURL
      // 	this.model.image_name = file.name
      // 	});
      // });
    }, // imageChanged
    clearForm() {
      this.model = {
        id: null,
        title: null,
        place: null,
        event_time_title: null,
        brief: null,
        description: null,
        event_date: null,
        is_allow_online: true,
        is_show: true,
        is_priority: false,
        image: null,
        image_name: null,
        media_id: null
      };
    } // clearForm
  }, // methods
  watch: {
    event(event) {
      // if (event && event.id != this.model.id) {
      // 	this.model = {
      // 	  id: event.id,
      // 	  title: event.title,
      // 	  place: event.place,
      // 	  event_time_title: event.event_time_title,
      // 	  brief: event.brief,
      // 	  description: event.description,
      // 	  event_date:  eventHelper.formatFirebaseTimestamp(event.event_date),
      // 	  is_allow_online: event.is_allow_online,
      // 	  is_show: event.is_show,
      // 	  is_priority: event.is_priority,
      // 	  image: event.image,
      // 	  image_name: event.image_name,
      // 	  media_id: event.media_id,
      // 	}
      // }
    },
    event_date(val) {
      // if (!this.model.event_time_title) {
      //     this.model.event_time_title = eventHelper.getEventTimeTitleFromDate(val)
      // }
    }
  },
  created() {
    // if (this.event && this.event.id != this.model.id) {
    // 	this.model = {
    // 	  id: this.event.id,
    // 	  title: this.event.title,
    // 	  place: this.event.place,
    // 	  event_time_title: this.event.event_time_title,
    // 	  brief: this.event.brief,
    // 	  description: this.event.description,
    // 	  event_date: eventHelper.formatFirebaseTimestamp(this.event.event_date),
    // 	  is_allow_online: this.event.is_allow_online,
    // 	  is_show: this.event.is_show,
    // 	  is_priority: this.event.is_priority,
    // 	  image: this.event.image,
    // 	  image_name: this.event.image_name,
    // 	  media_id: this.event.media_id,
    // 	}
    // }
  }
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>