<template>
  <div id="home">
  <v-parallax
    height="300"
    dark
    src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
  >
  <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
      <h4 class="subheading">Build your application today!</h4>
    </v-layout>
  </v-parallax>
      <!-- <articles>
      <banner />
    </articles>-->
    <events/>
    <!-- <subscribe /> -->
    <!-- <social /> -->
  </div>
</template>

<script>
import Events from "@/components/events/Events";

export default {
  name: "Home",

  components: {
    Events: Events
    // Articles: () => import('@/components/home/Articles'),
    // Banner: () => import('@/components/home/Banner'),
    // Social: () => import('@/components/home/Social'),
    // Subscribe: () => import('@/components/home/Subscribe')
  }
};
</script>
