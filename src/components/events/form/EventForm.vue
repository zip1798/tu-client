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
            <v-btn color="primary mx-2" tile @click="nextStep">Next</v-btn>
          </div>
        </v-stepper-content>

<!-- 2 Options step -->        
        <v-stepper-step :complete="valid_option_form" step="2">Event Options</v-stepper-step>
        <v-stepper-content step="2">
          <v-form v-model="valid_option_form" ref="eventFormOptions">
            <event-form-options />
          </v-form>
          <div>
            <v-btn color="primary mx-2" tile @click="prevStep">Prev</v-btn>
            <v-btn color="primary mx-2" tile @click="nextStep">Next</v-btn>
          </div>
        </v-stepper-content>

<!-- 3 Brief step -->        
        <v-stepper-step :complete="valid_brief_form" step="3">Brief Description</v-stepper-step>
        <v-stepper-content step="3">
          <v-form v-model="valid_brief_form" ref="eventBrief">
            <event-form-description :name="'brief'" :label="'Brief'" :placeholder="'Brief'" />
          </v-form>
          <div>
            <v-btn color="primary mx-2" tile @click="prevStep">Prev</v-btn>
            <v-btn color="primary mx-2" tile @click="nextStep">Next</v-btn>
          </div>
        </v-stepper-content>

<!-- 4 Descriptin step -->        
        <v-stepper-step :complete="valid_description_form" step="4">Event description</v-stepper-step>
        <v-stepper-content step="4">
          <v-form v-model="valid_description_form" ref="eventDescription">
            <event-form-description
              :name="'description'"
              :label="'Description'"
              :placeholder="'Description'"
            />
          </v-form>
          <div>
            <v-btn color="primary mx-2" tile @click="prevStep">Prev</v-btn>
            <v-btn color="primary mx-2" tile @click="nextStep">Next</v-btn>
          </div>
        </v-stepper-content>

<!-- 5 Image step -->        
        <v-stepper-step step="5">Main image of event</v-stepper-step>
        <v-stepper-content step="5">
          <media-select :media_id="getEvent.media_id" :category="`event`" />

          <div>
            <v-btn color="primary mx-2" tile @click="prevStep">Prev</v-btn>
            <v-btn color="primary mx-2" tile @click="nextStep">Next</v-btn>
          </div>
        </v-stepper-content>

<!-- 6 Preview step -->        
        <v-stepper-step step="6">Preview</v-stepper-step>
        <v-stepper-content step="6">


          <div>
            <v-btn color="primary mx-2" tile @click="prevStep">Prev</v-btn>
            <slot name="finish-action"></slot>
          </div>
        </v-stepper-content>

      </v-stepper>
    </v-form>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import server from "@/repository/server";
import EventFormMain from "@/components/events/form/EventFormMain";
import EventFormOptions from "@/components/events/form/EventFormOptions";
import EventFormDescription from "@/components/events/form/EventFormDescription";
import MediaSelect from "@/components/media/MediaSelect";

export default {
  name: "EventForm",
  
  components: {
    EventFormMain,
    EventFormOptions,
    EventFormDescription,
    MediaSelect
  },

  data() {
    return {
      current_step: 1,
      valid_main_form: false,
      valid_option_form: true,
      valid_brief_form: false,
      valid_description_form: false,
      valid_image_form: false,
    };
  },

  computed: {
    ...mapGetters(["getUser", "getEvent"])
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
            this.current_step = 5;
          }
          break;
        default:
          break;
      }
    },

    prevStep() {

    },
  }

};
</script>
