<template>
  <v-container id="test" tag="section">
    <base-subheading>Test</base-subheading>
    <v-divider></v-divider>
    <v-btn color="blue" flat @click.prevent="showMessage">Rise Message</v-btn>
    <v-btn color="red" flat @click.prevent="showError">Rise Error</v-btn>
    <v-btn color="green" flat @click.prevent="showConfirm">Rise Confirm Window</v-btn>

    <v-checkbox v-model="processing" label="Processing"></v-checkbox>

    {{ getUser.name }}
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "Test",
  data() {
    return {
      msg: "Hello World",
      processing: false
    };
  },
  watch: {
    processing: function(newProcessing, oldProcessing) {
      this.$store.dispatch("SET_PROCESSING", newProcessing);
    }
  },
  computed: {
    ...mapGetters(['getUser']),            
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
    }
  }
};
</script>
