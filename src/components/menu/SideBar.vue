<template>
  <v-navigation-drawer
    class="justify-end"
    height="100%"
    app
    clipped
    permanent
    stateless
    color="#FAFAFA"
  >
    <v-navigation-drawer
      permanent
      stateless
    >
      <v-card v-if="fileTree">
        <v-list-group @click="setFolder(rootFolder, fileTree.path)" dense>
          <template v-slot:activator>
            <v-list-item-title

            >{{ rootFolder }}</v-list-item-title>
          </template>
          <file-list @click="setFolder"  :items="fileTree.items" :path="fileTree.path" :root="fileTree.path" />
        </v-list-group>
      </v-card>
    </v-navigation-drawer>
    <v-img
      v-if="previewImage"
      :src="`data:image/png;base64,${previewImage}`"
      class="mx-auto"
      height="200px"
      contain
      eager
    ></v-img>
  </v-navigation-drawer>
</template>

<script>
import FileList from './FileList.vue'
// import tree from './tree.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'SideBar',
  components: {
    FileList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      previewImage:'getPreviewImage',
      fileTree: 'fileTree',
      rootFolder: 'rootFolder'
      })
  },
  methods: {
    setFolder: function(name, path){
      this.$store.commit('UPDATE_ACTIVE_FOLDER', {name, path})
    }
  }
}
</script>

<style lang="scss">
.v-navigation-drawer{

  &__content {
    display: flex !important;
  flex-direction: column;
  justify-content: space-between !important;

  .v-responsive {
    flex-grow: 0 !important;
    overflow-y: auto;
  }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar {
      width: 4px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      background-color:#212121;
    }
  }
}

</style>>