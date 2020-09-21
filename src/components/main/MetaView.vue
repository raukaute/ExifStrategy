<template>
  <v-card
    class="card-exif"
    height="100%"
    max-height="100%"
    style="overflow:auto"
    flat
  >
    <v-tabs
      hide-slider
      fixed-tabs
      v-model="model"
      class="fixed-tabs-bar"
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab"
        :ripple =  false
      >
        {{ tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="model"
      transition="false"
    >
      <v-tab-item
        transition="false"
        reverse-transition="false"
        v-for="field in fields"
        :key="field"
      >
          <v-simple-table
            fixed-header
            class="my-4"
          >

            <meta-view-item
              :filteredMetaData = "field == 'All' ? metaData : metaData[field]"
             />
          </v-simple-table>
        </v-tab-item>
      </v-tabs-items>

  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import MetaViewItem from './MetaViewItem.vue'

export default {
  name: 'MetaView',
  components: {
     MetaViewItem
  },
  data() {
    return {
      model: null,
      // @TODO The tabs to show should be configurable in Options
      tabs: ['EXIF', 'ICC', 'MAKER', 'COMP', 'ALL' ],
      fields: ['EXIF', 'ICC_Profile', 'MakerNotes', 'Composite', 'All']
    }
  },
  computed: {
    ...mapGetters([
      'metaData',
    ]),
  },

}
</script>

<style lang="scss">
td, th {
      width: 50%;
  }
.v-slide-group__prev,
.v-slide-group__next
 {
  display: none !important;
}
.fixed-tabs-bar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.v-tab--active {
  color: #42b983 !important;
}

.v-tab{
  justify-content: flex-start !important;
  padding:1em !important;

  &::before {
    background-color: transparent !important;
  }
}

.card-exif {
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

</style>