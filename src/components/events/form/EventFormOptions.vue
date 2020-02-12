<template>
    <v-layout row wrap>
        
        <v-flex xs11 sm11 class="offset-xs1">
          <v-radio-group 
            :value="getEvent.status" 
            :rules="statusRules"
            @change="setField('status')"
            label="Status"
            row
          >
            <v-radio  
              v-for="status_item in eventConfig.statuses" 
              :value="status_item.name"
              :key="`status-${status_item.name}`"
              >
              <template v-slot:label><div>{{ status_item.title }}</div></template>
            </v-radio>
          </v-radio-group>
        </v-flex>  

        <v-flex xs11 sm11 class="offset-xs1 mb-3">
          <v-switch
                :input-value="getEvent.is_allow_online"
                label="Allow online"
                color="indigo darken-3"
                hide-details
                @change="setField('is_allow_online')"
              ></v-switch>
          <v-switch
                :input-value="getEvent.is_open_registration"
                label="Allow registration on site"
                color="indigo darken-3"
                @change="setField('is_open_registration')"
                hide-details
              ></v-switch>
          <v-switch
                :input-value="getEvent.is_private"
                label="Partisipation only via invite"
                color="indigo darken-3"
                @change="setField('is_private')"
                hide-details
              ></v-switch>
        </v-flex>  

    </v-layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import eventConfig from "@/config/events";

export default {
  data () {
    return {
      statusRules: [
        v => !!v || "Please enter value",
        v => ['draft', 'public', 'archive'].indexOf(v) != -1 || "Unknown status",
      ]
    }
  },
  computed: {
    ...mapGetters(["getEvent"]),
    eventConfig() {
      return eventConfig
    }
  },
  methods: {
    ...mapMutations(["SET_EVENT_FIELD"]),
    setField(field) {
        return value => this.SET_EVENT_FIELD({fld: field, val: value})
    },
  }
}
</script>

<style lang="css" scoped>
</style>