<template>
  <v-container id="test" tag="section">

    <media-item>
        <template #action>
          <v-spacer></v-spacer>
          <media-select-btn :category="`event`">ssasdfasdf</media-select-btn>
        </template>
    </media-item>

    <event-edit-toolbar></event-edit-toolbar>

    <v-divider></v-divider>
    <v-btn color="blue" text  @click.prevent="showMessage">Rise Message</v-btn>
    <v-btn color="red" text  @click.prevent="showError">Rise Error</v-btn>
    <v-btn color="green" text  @click.prevent="showConfirm">Rise Confirm Window</v-btn>
    <v-btn text  @click.prevent="sendTest">Send Test get request</v-btn>

    <v-checkbox v-model="processing" label="Processing"></v-checkbox>
    {{ getUser.name }}



    <v-row no-gutters>
      <v-col cols="12" md="4">


    <v-img
      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
      height="300px"
      dark
      class="ma-5"
    >
      <v-row class="fill-height">
        <v-spacer></v-spacer>

        <v-card-title class="white--text pl-12 pt-12">
          <div class="display-1 pl-12 pt-12">Ali Conners</div>
        </v-card-title>
      </v-row>
    </v-img>


      </v-col>

      <v-col cols="12" md="8">



 <v-card
    class="mx-auto"
  >
    <v-list two-line>
      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-phone</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>(650) 555-1234</v-list-item-title>
          <v-list-item-subtitle>Mobile</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>(323) 555-6789</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>mdi-message-text</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-email</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>aliconnors@example.com</v-list-item-title>
          <v-list-item-subtitle>Personal</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action></v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>ali_connors@example.com</v-list-item-title>
          <v-list-item-subtitle>Work</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset></v-divider>

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">mdi-map-marker</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>1400 Main Street</v-list-item-title>
          <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-card-actions>
        <v-spacer></v-spacer>
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>


      </v-col>
    </v-row>



    <v-divider></v-divider>

    <v-skeleton-loader
            v-if="loading"
            class="mb-6"
            type="card-avatar, article, actions"
    ></v-skeleton-loader>

    <event-form>
      
    </event-form>

  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import server from "@/repository/server"
import EventForm from "@/components/events/form/EventForm"
import EventEditToolbar from "@/components/events/EventEditToolbar.vue"
import MediaItem from "@/components/media/MediaItem"
import MediaSelectBtn from "@/components/media/MediaSelectButton"


export default {
  name: "Test",
  components: {
    EventForm,
    EventEditToolbar,
    MediaItem,
    MediaSelectBtn
  },
  data() {
    return {
      loading: false,
      msg: "Hello World",
      processing: false,
    };
  },
  watch: {
    processing: function(newProcessing) {
      this.$store.dispatch("SET_PROCESSING", newProcessing);
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getEvent']),            
  },
  methods: {
    showMessage() {
      this.$store.dispatch("SET_SUCCESS_MESSAGE", "One World");
    },
    showError() {
      this.$store.dispatch("SET_ERROR", "-- error --");
    },

    showConfirm() {
      this.$dialog.confirm({
        text: 'Do you really want to exit?',
        title: 'Warning'
      }).then((v) => alert('This is Sparta ' + v))
    },

    sendTest() {
        server.get('test', () => {
//          console.log('Respond test')
//          console.log(respond)
        })
    },

    nextEventMain() {
      if (this.$refs.eventFormMain.validate()) {
        this.e6 = 2
      }
    }
  }
};
</script>
