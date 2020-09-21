<template>
  <div
    @click.stop.prevent="handleClick"
    :class="{active : isActive}"
    class="file-text"
    style="-webkit-app-region: no-drag;"
    :title="this.name"
  >
    <slot></slot>
  </div>
</template>

<script>
import EventBus from '@/util/EventBus.js';

export default {
  name: 'FileItem',
  props: [
    'path', 'root', 'name'
  ],
  data: () => ({
    isActive: false
  }),
  mounted() {
    EventBus.$on('deactivate', () => {
      this.isActive = false;
    })
  },
  beforeDestroy() {
    EventBus.$off('deactivate', () => {
      this.isActive
    })
  },
  methods: {
    handleClick(e) {
      if (!e.ctrlKey) EventBus.$emit('deactivate');

      this.isActive = true
      this.handleImageUpdates();
      this.updateActiveFiles(e.ctrlKey)
    },
    // check if this is faster when async
    handleImageUpdates() {
      this.$store.dispatch('updateExif', this.path);
      this.$store.dispatch('updateFilePreview', this.path);
      this.$store.dispatch('updateFolderPreview', this.root);
    },

    updateActiveFiles: function(ctrlKey) {
      this.$store.commit('UPDATE_FILE_LIST',{
        ctrlKey,
        name: this.name,
        path: this.path
      })
    }
  },

}
</script>

<style lang="scss">
.active {
  color: #42b983;
}
.file-text {
  height: 100%;
  width: 100%;
}
</style>