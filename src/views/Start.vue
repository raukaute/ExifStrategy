<template>
  <v-container
    class="fill-height"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        icon
        class="mx-auto"
        @click="start"
      >
        <v-icon size="80">mdi-folder-multiple-outline</v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Start',
  data() {
    return {
      openDialog: true,
    }
  },
  methods: {
    start: function() {
      this.$store.dispatch('openFileBrowser')
        .then(() => this.$router.push('Home'))
    },
  }
}
</script>

<style>

</style>