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
          <event-edit-toolbar></event-edit-toolbar>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                prepend-icon="title"
                name="title"
                label="Title"
                type="text"
                v-model="model.title"
                :rules="titleRules"
                required
              ></v-text-field>

              <v-text-field
                prepend-icon="place"
                name="place"
                label="Place"
                type="text"
                v-model="model.place"
                :rules="placeRules"
                required
              ></v-text-field>

              <v-layout row wrap>
                <v-flex xs12 sm4 md4>
                  <v-dialog
                    ref="dialog"
                    v-model="show_date_modal"
                    :return-value.sync="model.show_date"
                    persistent
                    lazy
                    full-width
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="model.show_date"
                        label="Date end of showing on site"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="model.show_date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="show_date_modal = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.dialog.save(model.show_date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 sm8 md8>
                  <v-text-field
                    prepend-icon="event"
                    name="event_date"
                    label="Event Date"
                    type="text"
                    v-model="model.event_date"
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <h3 class="mt-4">Brief Desciption</h3>     
              <tiptap-vuetify v-model="model.brief" :extensions="extensions" placeholder="Brief description" />

              <v-divider class="my-4"></v-divider>              

              <h3>Full Desciption</h3>     
              <tiptap-vuetify v-model="model.description" :extensions="extensions" placeholder="Full description" />

              <v-layout row wrap>
                <v-flex xs12 sm4>
                  <v-radio-group v-model="model.category" :rules="categoryRules">
                    <template v-slot:label>
                      <div>
                        <strong>Category</strong>
                      </div>
                    </template>
                    <v-radio v-for="category_item in eventConfig.categories" :value="category_item.name">
                      <template v-slot:label>
                        <div>{{ category_item.title }}</div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-flex>  
                <v-flex xs12 sm4>
                  <v-radio-group v-model="model.status" :rules="statusRules">
                    <template v-slot:label>
                      <div>
                        <strong>Status</strong>
                      </div>
                    </template>
                    <v-radio  v-for="status_item in eventConfig.statuses" :value="status_item.name">
                      <template v-slot:label><div>{{ status_item.title }}</div></template>
                    </v-radio>
                  </v-radio-group>
                </v-flex>  
                <v-flex xs12 sm4>
                  <v-switch
                        v-model="model.is_allow_online"
                        label="Allow online"
                        color="indigo darken-3"
                        hide-details
                      ></v-switch>
                </v-flex>  
              </v-layout>

              <h3 class="mt-4">Main Image</h3>     
              <media-select :media_id="model.media_id" :category="`event`"></media-select>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="submit"
              :disabled="!!getProcessing || !valid"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import EventEditToolbar from "./EventEditToolbar.vue"
import eventConfig from "@/config/events"
import MediaSelect from "../media/MediaSelect"
import { mapGetters, mapActions } from "vuex"
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, CodeBlock, Paragraph, BulletList, OrderedList,
  ListItem, Link, Blockquote, HardBreak, HorizontalRule, History
} from 'tiptap-vuetify'


export default {
  name: "EventForm",
  data() {
    return {
      model: {
        id: null,
        title: null,
        place: null,
        brief: null,
        description: null,
        event_date: null,
        show_date: null,
        is_allow_online: true,
        is_show: true,
        is_priority: false,
        image: null,
        image_name: null,
        media_id: null
      },
      show_date_modal: false,
      valid: false,

      extensions: [
        // you can specify options for extension
        new Heading({
          levels: [1, 2, 3]
        }),
        new Bold(),
        new Italic(),
        new Strike(),
        new Underline(),
        new Code(),
        new CodeBlock(),
        new Paragraph(),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new Link(),
        new Blockquote(),
        new HardBreak(),
        new HorizontalRule(),
        new History()
      ],

      titleRules: [
        v => !!v || "Please enter value"
      ],
      placeRules: [
        v => !!v || "Please enter value"
      ],
      categoryRules: [
        v => !!v || "Please enter value",
        v => ['regular', 'unregular', 'seminar', 'other'].indexOf(v) != -1 || "Unknown category",
      ],
      statusRules: [
        v => !!v || "Please enter value",
        v => ['pending', 'public', 'hidden', 'deleted'].indexOf(v) != -1 || "Unknown status",
      ]


    };
  },
  // mounted(){},
  props: ['id'],
  components: {
    MediaSelect, 
    TiptapVuetify,
    EventEditToolbar: EventEditToolbar
  },
  computed: {
    ...mapGetters(["getProcessing", "getSelectedMediaID", "getEvent"]),
    show_date() {
      return this.model.show_date;
    },
    eventConfig() {
      return eventConfig;
    }
  },
  methods: {
    ...mapActions(['LOAD_EVENT_ITEM', 'UPDATE_EVENT']),
    submit() {
      this.UPDATE_EVENT(this.model)
    },
    initEvent(data) {
      this.model.id = data.id
      this.model.user_id = data.user_id
      this.model.title = data.title
      this.model.place = data.place
      this.model.category = data.category
      this.model.status = data.status
      this.model.event_date = data.event_date
      this.model.show_date = data.show_date
      this.model.brief = data.brief
      this.model.description = data.description
      this.model.is_allow_online = data.is_allow_online
      this.model.media_id = data.media_id
    },
    clearForm() {
      this.model = {
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
        media_id: null
      };
    } // clearForm
  }, // methods
  created() {
    this.LOAD_EVENT_ITEM(this.id);
    this.$bus.$on('loaded_event', data => this.initEvent(data));
  },
  mounted() {
    this.initEvent(this.getEvent);
  },
  beforeDestroy() {
    this.$bus.$off('loaded_event');
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