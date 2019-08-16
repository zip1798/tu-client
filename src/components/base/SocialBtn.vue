<template>
<v-menu open-on-hover>
	<template v-slot:activator="{ on }">
	  <v-btn icon>
	    <v-icon v-on="on">share</v-icon>
	  </v-btn>
	</template>
	<social-sharing :url="full_url" :title="title" :description="description" inline-template>
	  <div>
	    <v-list>
	      <v-list-tile>
	        <v-list-tile-action><network network="email"><v-btn icon><v-icon>email</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="facebook"><v-btn icon><v-icon>mdi-facebook</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="linkedin"><v-btn icon><v-icon>mdi-linkedin</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="pinterest"><v-btn icon><v-icon>mdi-pinterest</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="reddit"><v-btn icon><v-icon>mdi-reddit</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="skype"><v-btn icon><v-icon>mdi-skype</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="telegram"><v-btn icon><v-icon>mdi-telegram</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="twitter"><v-btn icon><v-icon>mdi-twitter</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="vk"><v-btn icon><v-icon>mdi-vk</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	      <v-list-tile>
	        <v-list-tile-action><network network="whatsapp"><v-btn icon><v-icon>mdi-whatsapp</v-icon></v-btn></network></v-list-tile-action>
	      </v-list-tile>
	    </v-list>
	  </div>
	</social-sharing>              
</v-menu>
</template>

<script>

import appConfig from "@/config/app";
import SocialSharing from "vue-social-sharing"

export default {

  name: 'SocialBtn',
  props: ['url', 'title', 'description', 'quote'],
  computed: {
  	full_url() {
  		appConfig.client + this.url
  	}
  },
  components: {
    SocialSharing
  },
  data () {
    return {

    }
  }
}
</script>
