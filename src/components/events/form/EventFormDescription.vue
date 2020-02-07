<template>
    <v-flex xs12>
        <h3 class="mt-4">{{ label }}</h3>     
        <tiptap-vuetify 
        :toolbar-attributes="{ color: 'grey' }"
        :value="getEvent[name]" 
        @change="setField(name)"
        :extensions="extensions" 
        :placeholder="placeholder" />

        <v-divider class="my-4"></v-divider>
    </v-flex>
</template>

<script>
import { mapGetters, mapMutations } from "vuex"
import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, CodeBlock, Paragraph, BulletList, OrderedList,
  ListItem, Link, Blockquote, HardBreak, HorizontalRule, History
} from 'tiptap-vuetify'

export default {
  components: {
    TiptapVuetify 
  },
  props: ["name", "label", "placeholder"],
  data () {
    return {
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
    }
  },
  computed: {
    ...mapGetters(["getEvent"]),
  },
  methods: {
    ...mapMutations(["SET_EVENT_FIELD"]),
    setField(field) {
        return value => this.SET_EVENT_FIELD({fld: field, val: value})
    },
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