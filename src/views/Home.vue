<template>
  <v-container
    class="height-100"
    style="padding: 0"
    fluid
  >
    <v-card
      tile
      flat
      class="slider-wrap"
    >
      <thumb-slider  />
    </v-card>
    <v-row
      class="data-wrap"
      justify="space-around"
    >
      <v-col class="field " cols="7"> <action-view /> </v-col>
      <v-col class="field text-center" cols="5"> <meta-view /> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ThumbSlider from '../components/main/ThumbSlider.vue';
import MetaView from '../components/main/MetaView.vue';
import ActionView from '../components/main/ActionView.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    ThumbSlider, MetaView, ActionView
  },
}
</script>

<style lang="scss">

.height-100 {
  height: 100% !important;
  max-height: 96vh !important;
  overflow: hidden;
}

.slider-wrap {
  height: 65px;
  outline: 1px solid #efef;
  div {
    height: 100%;
    width: 100%;
    margin-right: 4px;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
.data-wrap {
  height: calc(100% - 65px)
}
.field {
  height: 100%;
  margin-top:10px;
}
</style>
