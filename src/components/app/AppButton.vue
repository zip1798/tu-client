<template>
    <!-- https://material.io/resources/icons/?style=baseline -->
    <v-btn text large class="ma-2"  @click="$listeners.click">
        <slot />
    </v-btn>
</template>

<script>

export default {
  name: 'BaseBtn'
}

</script>