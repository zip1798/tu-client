<template>
  <v-container id="test" tag="section">
    <v-divider></v-divider>
    <v-btn color="blue" text  @click.prevent="showMessage">Rise Message</v-btn>
    <v-btn color="red" text  @click.prevent="showError">Rise Error</v-btn>
    <v-btn color="green" text  @click.prevent="showConfirm">Rise Confirm Window</v-btn>
    <v-btn text  @click.prevent="sendTest">Send Test get request</v-btn>

    <v-checkbox v-model="processing" label="Processing"></v-checkbox>
    {{ getUser.name }}
    <v-divider></v-divider>





  <v-form>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <media-select
          :media_id="getEvent.media_id"
          :category="`event`"
        />

        <event-form-main />
        <div>
          <v-btn color="primary" tile @click="e6 = 2">Next</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

      <v-stepper-content step="2">
        <event-form-options />
        <div>
          <v-btn color="primary mx-2" tile @click="e6 = 1">Prev</v-btn>
          <v-btn color="primary mx-2" tile @click="e6 = 3">Next</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

      <v-stepper-content step="3">
        <event-form-description 
          :name="'brief'"
          :label="'Brief'"
          :placeholder="'Brief'"
        />
        <div>
          <v-btn color="primary mx-2" tile @click="e6 = 2">Prev</v-btn>
          <v-btn color="primary mx-2" tile @click="e6 = 4">Next</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 4" step="4">Event description</v-stepper-step>

      <v-stepper-content step="4">
        <event-form-description 
          :name="'description'"
          :label="'Description'"
          :placeholder="'Description'"
        />
        <div>
          <v-btn color="primary mx-2" tile @click="e6 = 3">Prev</v-btn>
          <v-btn color="primary mx-2" tile @click="e6 = 5">Next</v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-step  step="5">Main image of event</v-stepper-step>
      <v-stepper-content step="5">
        <media-select 
        :media_id="getEvent.media_id" 
        :category="`event`" 
        />

        <div>
          <v-btn color="primary mx-2" tile @click="e6 = 4">Prev</v-btn>
          <v-btn color="primary mx-2" tile @click="e6 = 1">Next</v-btn>
        </div>
      </v-stepper-content>

    </v-stepper>
  </v-form>


  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import server from "@/repository/server";
import EventFormMain from "@/components/events/form/EventFormMain";
import EventFormOptions from "@/components/events/form/EventFormOptions";
import EventFormDescription from "@/components/events/form/EventFormDescription";
import MediaSelect from "@/components/media/MediaSelect"

export default {
  name: "Test",
  components: {
    EventFormMain,
    EventFormOptions,
    EventFormDescription,
    MediaSelect
  },
  data() {
    return {
      e6: 1,
      msg: "Hello World",
      processing: false,
      model: {
        id: null,
        user_id: null,
        title: null,
        place: null,
        category: 'unregular',
        status: 'draft',
        event_date: null,
        show_date: null,
        brief: null,
        description: null,
        is_allow_online: false,
        is_open_registration: false,
        html_after_registration: '',
        media_id: null
      }
    };
  },
  watch: {
    processing: function(newProcessing, oldProcessing) {
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
        server.get('test', (respond) => {
          console.log('Respond test')
          console.log(respond)
        })
    }
  }
};
</script>
