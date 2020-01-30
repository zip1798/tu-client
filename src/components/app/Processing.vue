<template>
</template>

<script>

import { mapGetters, mapActions } from "vuex"

export default {

  name: 'Processing',

  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(["getEvent"]),
  },
  
}
</script>
