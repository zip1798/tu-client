<template>
  <v-container>
    
    <v-divider></v-divider>

    <v-form>
      <v-stepper v-model="current_step" vertical>

<!-- 1 Main step -->        
        <v-stepper-step :complete="valid_main_form" step="1">Main data</v-stepper-step>
        <v-stepper-content step="1">
          <v-form v-model="valid_main_form" ref="eventFormMain">
            <event-form-main />
          </v-form>
          <div>
            <base-btn @click="nextStep">Next <v-icon dark right>mdi-chevron-right</v-icon></base-btn>
          </div>
        </v-stepper-content>

<!-- 2 Options step -->        
        <v-stepper-step :complete="valid_option_form" step="2">Event Options</v-stepper-step>
        <v-stepper-content step="2">
          <v-form v-model="valid_option_form" ref="eventFormOptions">
            <event-form-options />
          </v-form>
          <div>
            <base-btn @click="prevStep"><v-icon dark>mdi-chevron-left</v-icon> Prev</base-btn>
            <base-btn @click="nextStep">Next <v-icon dark right>mdi-chevron-right</v-icon></base-btn>
          </div>
        </v-stepper-content>

<!-- 3 Brief step -->        
        <v-stepper-step :complete="valid_brief_form" step="3">Brief Description</v-stepper-step>
        <v-stepper-content step="3">
          <v-form ref="eventBrief">
            <event-form-description :name="'brief'" :label="'Brief'" :placeholder="'Brief'" />
          </v-form>
          <div>
            <base-btn @click="prevStep"><v-icon dark>mdi-chevron-left</v-icon> Prev</base-btn>
            <base-btn @click="nextStep">Next <v-icon dark right>mdi-chevron-right</v-icon></base-btn>
          </div>
        </v-stepper-content>

<!-- 4 Descriptin step -->        
        <v-stepper-step :complete="valid_description_form" step="4">Event description</v-stepper-step>
        <v-stepper-content step="4">
          <v-form ref="eventDescription">
            <event-form-description
              :name="'description'"
              :label="'Description'"
              :placeholder="'Description'"
            />
          </v-form>
          <div>
            <base-btn @click="prevStep"><v-icon dark>mdi-chevron-left</v-icon> Prev</base-btn>
            <base-btn @click="nextStep">Next <v-icon dark right>mdi-chevron-right</v-icon></base-btn>
          </div>
        </v-stepper-content>

<!-- 5 Image step -->        
        <v-stepper-step :complete="valid_media" step="5">Main image of event</v-stepper-step>
        <v-stepper-content step="5">
          <media-item>
              <template #action>
                <v-spacer></v-spacer>
                <media-select-btn :cateogry="`event`"></media-select-btn>
              </template>
          </media-item>

          <div>
            <base-btn @click="prevStep"><v-icon dark>mdi-chevron-left</v-icon> Prev</base-btn>
            <base-btn @click="nextStep">Next <v-icon dark right>mdi-chevron-right</v-icon></base-btn>
          </div>
        </v-stepper-content>

<!-- 6 Preview step -->        
        <v-stepper-step step="6">Preview</v-stepper-step>
        <v-stepper-content step="6">


          <div>
            <base-btn @click="prevStep"><v-icon dark>mdi-chevron-left</v-icon> Prev</base-btn>
            <slot name="finish-action"></slot>
          </div>
        </v-stepper-content>

      </v-stepper>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import EventFormMain from "@/components/events/form/EventFormMain"
import EventFormOptions from "@/components/events/form/EventFormOptions"
import EventFormDescription from "@/components/events/form/EventFormDescription"
import MediaItem from "@/components/media/MediaItem"
import MediaSelectBtn from "@/components/media/MediaSelectButton"

export default {
  name: "EventForm",
  
  props: ['form_title'],

  components: {
    EventFormMain,
    EventFormOptions,
    EventFormDescription,
    MediaItem,
    MediaSelectBtn
  },

  data() {
    return {
      current_step: 1,
      valid_main_form: false,
      valid_option_form: true,
      valid_image_form: false,
    };
  },

  computed: {
    ...mapGetters(["getUser", "getEvent", "getMedia"]),
      valid_brief_form() {
        return this.getEvent.brief != ""
      },
      valid_description_form() {
        return this.getEvent.description != ''
      },
      valid_media() {
        if (!this.getMedia) {
          return false
        }
        return this.getMedia.id != ''
      },
  },

  methods: {
    nextStep() {
      switch (this.current_step) {
        case 1:
          if (this.$refs.eventFormMain.validate()) {
            this.current_step = 2
          }
          break;
        case 2:
          if (this.$refs.eventFormOptions.validate()) {
            this.current_step = 3
          }
          break;
        case 3:
          if (this.$refs.eventBrief.validate()) {
            this.current_step = 4
          }
          break;
        case 4: 
          if(this.$refs.eventDescription.validate()) {
            this.current_step = 5
          }
          break;
        case 5:
          this.current_step++
          break;
        default:
          break;
      }
    },

    prevStep() {
      if (this.current_step != 1) {
        this.current_step--
      }
    },
  }

};
</script>
