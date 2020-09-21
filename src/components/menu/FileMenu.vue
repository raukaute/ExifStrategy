<template>
  <v-menu
    offset-y
    eager
  >
    <template v-slot:activator="{ on }">
      <v-btn
        text
        color="white"
        elevation="0"
        :ripple= "false"
        v-on="on"
      >
        FILE
      </v-btn>
    </template>
    <v-card tile>
      <v-list
        color="#202124"
        width="130px"
        tile
        elevation="0"
      >
        <v-list-item
          v-for="(fileItem, index) in navigation.file"
          :key="index"
          @click="openFileBrowser"
        >
          <v-list-item-content
            ref="someRef"
          >
            <v-list-item-title
              class="white--text"
            >
              {{ fileItem.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
const { dialog } = require('electron').remote;

export default {
  name: 'FileMenu',
  props: {
  },


   data: () => ({
    navigation: {
      file: [
        {title: 'Add folder'}
      ]
    },
    fileTree: false
  }),

  methods: {
    openFileBrowser() {
      this.$store.dispatch('openFileBrowser')
      .then(() => {
        if (this.$router.currentRoute.name != 'Home')
          this.$router.push('Home')
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.v-menu__content {
  border-radius: 0 !important;
}
.v-list-item:hover {

  .v-list-item__title {
    color: #3fc4ff !important;
  }
}
</style>