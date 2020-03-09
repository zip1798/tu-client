<template>
    <v-flex xs12 sm12 md12 mb-3>

        <v-text-field
            prepend-icon="title"
            name="title"
            label="Title"
            type="text"
            :rules="titleRules"
            :value="getEvent.title"
            v-model="title"
            @change="SET_EVENT_FIELD({fld: 'title', val: title })"
            required
        ></v-text-field>

        <v-text-field
            prepend-icon="place"
            name="place"
            label="Place"
            type="text"
            :value="getEvent.place"
            v-model="place"
            @change="SET_EVENT_FIELD({fld: 'place', val: place })"
            :rules="placeRules"
            required
        ></v-text-field>
        
        <v-text-field
            prepend-icon="event"
            name="date"
            label="Event Date"
            type="text"
            :value="getEvent.date"
            v-model="date"
            @change="SET_EVENT_FIELD({fld: 'date', val: date })"
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
            <v-date-picker v-model="exp_date" scrollable :first-day-of-week="1" locale="uk">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="is_show_menu_expire_date = false">Cancel</v-btn>
                <v-btn text color="primary" @click="setExpireFromField(exp_date)">OK</v-btn>
            </v-date-picker>
        </v-dialog>
        
    </v-flex>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import Date from "@/repository/date";

export default {
  props: ["id"],
  data () {
    return {
      is_show_menu_expire_date: false,  
      exp_date: '',
      title: '',
      date: '',
      place: '',
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
    setTitleField(value) {
        this.SET_EVENT_FIELD({fld: 'title', val: value })
    },
    setExpireFromField(date) {
        this.is_show_menu_expire_date = false
        this.SET_EVENT_FIELD({fld: 'expire_from', val: date })
    },
    initForm() {
      this.title = this.getEvent.title
      this.place = this.getEvent.place
      this.date = this.getEvent.date
      this.exp_date = this.getEvent.exp_date
    }
  },

  created() {
    if (this.id) {
      this.LOAD_EVENT_ITEM(this.id)
      this.$bus.$on('loaded_event', () => this.initForm())
    }
  },

  mounted() {
    this.initForm()
  },

  beforeDestroy() {
    this.$bus.$off('loaded_event')
  }
}
</script>

<style lang="css" scoped>
</style>