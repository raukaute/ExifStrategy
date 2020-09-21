<template>
  <v-card
    height="100%"
    max-heigth="100%"
    flat
  >
    <info-pane />

    <action-pane />

  </v-card>
</template>


<script>
import InfoPane from './InfoPane.vue';
import ActionPane from './ActionPane';

export default {
  name: 'ActionView',
  components: {
    InfoPane, ActionPane
  }
}
</script>

<style  lang="scss">

.row-action-info {
  height: 50%;
  padding-bottom: 5px;
  overflow-y: hidden;
}
.header-info {
  position: sticky;
  top: 0;
  font-weight: 600;
  color: #273849;
  text-align: left;
  padding: 0 .75rem .75em;
  margin-bottom: 2.25em;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: .089em;
  background-color: white;
  z-index: 10;
}
.file-info-wrap {
  display: flex;
  flex-direction: column;
  height: 80%;
  justify-content: space-between;
}
.file-info-row {
  display: flex;
}
.file-info-item {
  flex-basis: auto;
  min-width: 24%;
  margin-left: 2em;

  .info-value {
    position: relative;
    padding-bottom: .75em;
    width: 120px;
    box-shadow: inset 0 -3px 0 0 #bdb;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all .5s ease;
    }

  span {
    height: 50%;
    display: block;

    &.v-subheader {
      position: relative;
      bottom: 0;
      padding: 0 !important;
      color: #424242;
      opacity: .6;
    }
  }
}
</style>