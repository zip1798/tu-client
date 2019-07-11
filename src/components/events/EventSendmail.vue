<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card class="elevation-12">
          <event-edit-toolbar></event-edit-toolbar>

          <v-card-text>
            <v-form v-model="valid">
              <v-textarea
                name="description"
                box
                label="Text email"
                auto-grow
                v-model="model.description"
              ></v-textarea>

              <!-- wysiwyg v-model="description" / -->
              <v-radio-group v-model="category" row>
                <template v-slot:label>
                  <div>
                    <strong>Addressant</strong>
                  </div>
                </template>

                <v-radio value="Google">
                  <template v-slot:label>
                    <div>Partisipants</div>
                  </template>
                </v-radio>
                <v-radio value="Duckduckgo">
                  <template v-slot:label>
                    <div>Favorits</div>
                  </template>
                </v-radio>
              </v-radio-group>
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
import EventEditToolbar from "./EventEditToolbar.vue";
// import * as eventHelper from '../helpers/event'

export default {
  name: "EventSendmail",
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
    EventEditToolbar: EventEditToolbar
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
    form_title() {
      // switch(this.mode) {
      // 	case 'edit' :
      // 		return 'Update Event';
      // }
      return "Update Event";
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
      this.model = {};
    } // clearForm
  }, // methods
  watch: {},
  created() {}
};
</script>

