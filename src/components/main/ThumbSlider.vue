<template>
<div ref="sliderWrap">
<swiper :options="settings">
  <swiper-slide
    v-for="(thumbnail, index) in thumbnails"
    :key="index.toString()"
  >
    <div class="flex-col">
      <img
        :src="`data:image/png;base64,${thumbnail}`"
        style="padding-top:8px; margin-left:2px; align-self: center"
      />
    </div>
  </swiper-slide>
</swiper>
</div>
</template>

<script>

import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'

export default {
  name: "ThumbSlider",
   components: {
    Swiper, SwiperSlide
  },
  data() {
    return {
      settings: {
        slidesPerView: 16,
        freeMode: true,
        centerSlides: false,
        grabCursor: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
          },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
    }
  },
  computed: {
    ...mapGetters([
      'thumbnails'
    ])
  },
  mounted() {
    this.$nextTick(() => {
      const cont = this.$refs.sliderWrap
      // console.log(cont)
      this.$store.commit('SET_PREVIEW_CONT_HEIGHT', cont.offsetHeight)
    })
  }
}
</script>

<style lang="scss">
.swiper-pagination-progressbar {
  margin-bottom: 10px;
}
.swiper-button-next,
.swiper-button-prev {
  color: #212121;
  background-color: white;
}
</style>