<template>
  <v-container>
    <v-row >
          <base-subheading>Event Members</base-subheading>
    </v-row >

    <event-edit-toolbar></event-edit-toolbar>

    <v-row class="mr-2 mb-5">
      <v-icon large color="grey" @click="next">mdi-bell-outline</v-icon>
      <v-icon large color="blue-grey accent-4" @click="next">mdi-bell</v-icon>

      <v-icon large color="grey">mdi-email-outline</v-icon>
      <v-icon large color="blue-grey accent-4">mdi-email</v-icon>

      <v-icon large color="grey">mdi-ballot-outline</v-icon>
      <v-icon large color="blue-grey accent-4">mdi-ballot</v-icon>

      <v-icon large color="grey">mdi-account-plus-outline</v-icon>
      <v-icon large color="blue-grey accent-4">mdi-account-plus</v-icon>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-row >



  <v-simple-table fixed-header>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" width="30"><v-checkbox></v-checkbox></th>
          <th class="text-left" width="40"></th>
          <th class="text-left">Name</th>
          <th class="text-left">Calories</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in desserts" :key="item.name">
          <td>
            <v-checkbox></v-checkbox>
          </td>
          <td>
            <v-avatar size="32">
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.calories }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>



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

      requireRules: [v => !!v || "Please enter value"],



        search: '',
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],


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

