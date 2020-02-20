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

    <event-form></event-form>

  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import server from "@/repository/server";
import EventForm from "@/components/events/form/EventForm";

export default {
  name: "Test",
  components: {
    EventForm,
  },
  data() {
    return {
      msg: "Hello World",
      processing: false,
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
    },

    nextEventMain() {
      if (this.$refs.eventFormMain.validate()) {
        this.e6 = 2
      }
    }
  }
};
</script>
