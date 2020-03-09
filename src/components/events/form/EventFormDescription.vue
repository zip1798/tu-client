<template>
  <div>
      <v-flex xs12>
          <h3 class="mt-4">{{ label }}</h3>
          <tiptap-vuetify
          :toolbar-attributes="{ color: 'grey' }"
          v-model="value"
          :rules="requiredRules"
          :extensions="extensions"
          :placeholder="placeholder" />

          <v-divider class="my-4"></v-divider>
      </v-flex>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import { TiptapVuetify, Heading, Bold, Italic, BulletList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History} from 'tiptap-vuetify'

export default {
  components: {
    TiptapVuetify 
  },
  props: ["id", "fld", "label", "placeholder"],
  data () {
    return {
      value: "",
      requiredRules: [
        v => !!v || "Please enter value"
      ],

      extensions: [
        // you can specify options for extension
        new Heading({
          levels: [1]
        }),
        new Bold(),
        new Italic(),
        // new Strike(),
        // new Underline(),
        // new Code(),
        // new CodeBlock(),
        // new Paragraph(),
        new BulletList(),
        // new OrderedList(),
        new ListItem(),
        new Link(),
        new Blockquote(),
        new HardBreak(),
        new HorizontalRule(),
        new History()
      ],
    }
  },

  computed: {
    ...mapGetters(["getEvent"]),
  },

  methods: {
    ...mapMutations(["SET_EVENT_FIELD"]),
    initForm() {
      this.value = this.getEvent[this.fld]
    }
  },

  watch: {
    value(new_value) {
      this.SET_EVENT_FIELD({fld: this.fld, val: new_value})
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

<style lang="css">
.tiptap-vuetify-editor__content {
  min-height: 300px;
}
.tiptap-vuetify-editor__content {
  max-height: 300px;
}
</style>