<template>
  <v-container>
    
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Create Event</v-toolbar-title>
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
                    name="show_event_date"
                    label="Event Date"
                    type="text"
                    v-model="model.show_event_date"
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
              <v-radio-group v-model="model.category" row>
                <template v-slot:label>
                  <div>
                    <strong>Category</strong>
                  </div>
                </template>
                <v-radio value="regular">
                  <template v-slot:label>
                    <div>Regular practice</div>
                  </template>
                </v-radio>
                <v-radio value="unregular">
                  <template v-slot:label>
                    <div>Unregular practice</div>
                  </template>
                </v-radio>
                <v-radio value="seminar">
                  <template v-slot:label>
                    <div>Seminar</div>
                  </template>
                </v-radio>
                <v-radio value="other">
                  <template v-slot:label>
                    <div>Other</div>
                  </template>
                </v-radio>
              </v-radio-group>

              <v-radio-group v-model="model.status" row>
                <template v-slot:label>
                  <div>
                    <strong>Status</strong>
                  </div>
                </template>
                <v-radio value="pending">
                  <template v-slot:label>
                    <div>Pending</div>
                  </template>
                </v-radio>
                <v-radio value="public">
                  <template v-slot:label>
                    <div>Public</div>
                  </template>
                </v-radio>
                <v-radio value="hidden">
                  <template v-slot:label>
                    <div>Hidden</div>
                  </template>
                </v-radio>
                <v-radio value="deleted">
                  <template v-slot:label>
                    <div>Deleted</div>
                  </template>
                </v-radio>
              </v-radio-group>


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


              <media-select :media_id="model.media_id"></media-select>

            </v-form>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="createEvent"
              :disabled="getProcessing || !valid"
            >Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MediaSelect from "../media/MediaSelect"
import { mapGetters, mapActions } from "vuex"

export default {
  name: "EventForm",
  data() {
    return {
      model: {
        id: null,
        user_id: null,
        title: null,
        place: null,
        category: null,
        status: null,
        event_date: null,
        show_event_date: null,
        brief: null,
        description: null,
        is_allow_online: true,
        media_id: null
      },
      event_date_modal: false,
      valid: false,

      requireRules: [v => !!v || "Please enter value"]
    };
  },
  // mounted(){},
  components: {
    MediaSelect
  },
  computed: {
    ...mapGetters(["getProcessing"]),
    event_date() {
      return this.model.event_date;
    }
  },
  methods: {
    ...mapActions(['CREATE_EVENT']),
    createEvent() {
      this.CREATE_EVENT(this.model)
    },
  }, // methods
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