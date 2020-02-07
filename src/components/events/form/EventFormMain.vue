<template>
    <v-flex xs12 sm12 md12 mb-3>

        <v-text-field
            prepend-icon="title"
            name="title"
            label="Title"
            type="text"
            :rules="titleRules"
            :value="getEvent.title"
            @change="setField('title')"
            required
        ></v-text-field>

        <v-text-field
            prepend-icon="place"
            name="place"
            label="Place"
            type="text"
            :value="getEvent.place"
            @change="setField('place')"
            :rules="placeRules"
            required
        ></v-text-field>
        
        <v-text-field
            prepend-icon="event"
            name="date"
            label="Event Date"
            type="text"
            :value="getEvent.date"
            @change="setField('date')"
            :rules="titleRules"
            required
        ></v-text-field>

        <v-dialog
            ref="dialog"
            v-model="is_show_menu_expire_date"
            persistent
            width="290px"
        >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formated_expire_from"
                label="Picker in dialog"
                prepend-icon="event"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable :first-day-of-week="1" locale="uk">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="is_show_menu_expire_date = false">Cancel</v-btn>
                <v-btn text color="primary" @click="setExpireFromField(date)">OK</v-btn>
            </v-date-picker>
        </v-dialog>
        
    </v-flex>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import Date from "@/repository/date";

export default {
  data () {
    return {
      is_show_menu_expire_date: false,  
      date: '',
      titleRules: [
        v => !!v || "Please enter value"
      ],
      placeRules: [
        v => !!v || "Please enter value"
      ]
    }
  },
  computed: {
    ...mapGetters(["getEvent"]),
    formated_expire_from() {
        return Date.format(this.getEvent.expire_from)
    }
  },
  methods: {
    ...mapMutations(["SET_EVENT_FIELD"]),
    setField(field) {
        return value => this.SET_EVENT_FIELD({fld: field, val: value})
    },
    setExpireFromField(date) {
        this.is_show_menu_expire_date = false
        this.SET_EVENT_FIELD({fld: 'expire_from', val: date })
    },
  }
}
</script>

<style lang="css" scoped>
</style>