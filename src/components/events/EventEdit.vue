<template>
  <v-container>

    <v-row >
          <base-subheading>Update Event</base-subheading>
    </v-row >
    <event-edit-toolbar></event-edit-toolbar>
    <v-layout row wrap>
      <event-form>
        <template #finish-action>
          <v-btn color="primary mx-2" tile @click.prevent="submit" :disabled="getProcessing">Update Event</v-btn>
        </template>
      </event-form>
    </v-layout>



    <!-- 
		https://www.froala.com/wysiwyg-editor/examples
		https://github.com/hifarer/vueditor
		https://github.com/chmln/vue-wysiwyg
		https://github.com/mbouclas/tinymce-vue-2
		https://www.npmjs.com/package/vue-wysiwyg
    -->
  </v-container>
</template>

<script>
import EventEditToolbar from "./EventEditToolbar.vue"
import EventForm from "@/components/events/form/EventForm";
import { mapGetters, mapActions } from "vuex"


export default {
  data() {
    return {

    };
  },
  // mounted(){},
  props: ['id'],
  components: {
    EventEditToolbar,
    EventForm
  },
  computed: {
    ...mapGetters(["getProcessing", "getEvent"]),
  },
  methods: {
    ...mapActions(['LOAD_EVENT_ITEM', 'UPDATE_EVENT']),
    submit() {
      this.UPDATE_EVENT(this.model)
    },
  }, // methods
  created() {
    this.LOAD_EVENT_ITEM(this.id);
    // this.$bus.$on('loaded_event', data => this.initEvent(data));
  },
  mounted() {
    // this.initEvent(this.getEvent);
  },
  beforeDestroy() {
    // this.$bus.$off('loaded_event');
  },

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