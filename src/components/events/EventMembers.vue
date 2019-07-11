<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card class="elevation-12">
          <event-edit-toolbar></event-edit-toolbar>

          <v-card-text>
            <v-layout column justify-center>
              <v-list subheader>
                <v-flex xs12>
                  <v-autocomplete
                    v-model="select"
                    :loading="loading"
                    :items="items"
                    :search-input.sync="search"
                    cache-items
                    class="ma-3"
                    flat
                    hide-no-data
                    hide-details
                    label="Search member"
                    solo-inverted
                  ></v-autocomplete>
                </v-flex>
                <v-list-tile v-for="item in items" :key="item.title" avatar @click>
                  <v-list-tile-avatar>
                    <img :src="item.avatar">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-icon :color="item.active ? 'red' : 'grey'">favorite</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn small fab dark color="indigo">
                      <v-icon dark>add</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-layout>
          </v-card-text>
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
      loading: false,
      items: [],
      search: null,
      select: null,
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
      messages: [
        {
          avatar: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
          name: "John Leider",
          title: "Welcome to Vuetify.js!",
          excerpt: "Thank you for joining our community..."
        },
        {
          color: "red",
          icon: "people",
          name: "Social",
          new: 1,
          total: 3,
          title: "Twitter"
        },
        {
          color: "teal",
          icon: "local_offer",
          name: "Promos",
          new: 2,
          total: 4,
          title: "Shop your way",
          exceprt: "New deals available, Join Today"
        }
      ],
      items: [
        {
          active: true,
          title: "Jason Oner",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg"
        },
        {
          active: true,
          title: "Ranee Carlson",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg"
        },
        {
          title: "Cindy Baker",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Ali Connors",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg"
        }
      ],
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

