<template>
  <v-app>
    <v-app-bar
      app
      color="#202124"
      height="36px"
      dense
      clipped-left
      elevation="0"
      style="-webkit-app-region: drag"
    >
      <file-menu />
      <v-spacer></v-spacer>
      <!-- <div
        class="wc-box"
        style="-webkit-app-region: no-drag;">
        <div @click="minimize" class="minimize"></div>
        <div @click="resize"  class="maximize"></div>
        <div @click="close" class="close"></div>
      </div> -->
    </v-app-bar>

    <side-bar />

      <v-content>
        <router-view>
          <Home />
        </router-view>
      </v-content>

  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from '@/views/Home.vue';
import FileMenu from '@/components/menu/FileMenu.vue';
import SideBar from '@/components/menu/SideBar.vue'
const { ipcRenderer } = require('electron');
export default Vue.extend({
  name: 'App',
  components: {
    FileMenu, Home, SideBar
  },
  methods: {
    close: function() {
      ipcRenderer.send('command:close')
    },
    minimize: function() {
      ipcRenderer.send('command:minimize')
  },
    resize: function() {
    ipcRenderer.send('command:resize')
    }
  },
})
</script>

<style lang="scss">
 ::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #FFF;
}
::-webkit-scrollbar {
  width: 0px;
  background-color: #FFF;

  &::hover {
    width: 8px;
  }
}
::-webkit-scrollbar-thumb {
  background-color:#212121;
}


html, body {
  height: 100%;
  width: 100%;
  box-sizing: border-box;

}

.wc-box {
  position: absolute;
  top: calc(50% - 13px);
  right: 10px;
}

.wc-box div {
  position: relative;
  float: left;
  width: 28px;
  height: 28px;
}

.wc-box div:before,
.wc-box div:after {
  top: 30%;
  right: 30%;
  bottom: 30%;
  left: 30%;
  content: " ";
  position: absolute;
  border-color: #CCCCCC;
  border-style: solid;
  border-width: 0 0 2px 0;
}

.wc-box .minimize:before {
  border-bottom-width: 2px;
}

.wc-box .maximize:before {
  border-width: 1px 1px 2px 1px;
}

.wc-box .close:before,
.wc-box .close:after {
  bottom: 50%;
  top: 50%;
}

.wc-box .close:before {
  transform: rotate(45deg);
}

.wc-box .close:after {
  transform: rotate(-45deg);
}

.wc-box div:hover {
  background-color: #CCCCCC;
}

.wc-box .close:hover {
  background-color: #E04343;
}

.wc-box div:hover:after,
.wc-box div:hover:before {
  border-color: #333333;
}

.wc-box .close:hover:after,
.wc-box .close:hover:before {
  border-color: #FFFFFF;
}
.v-application .primary--text { /*! color: #1867c0 !important; */
 color: #212121 !important;
}

</style>
