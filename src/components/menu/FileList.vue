<template>
  <v-list dense>
    <template v-for="(item, index) in items">
      <v-list-group
        v-if="item.items && item.items.length"
        @click="$emit('click', item.name, item.path)"
        :key="index"
        :ref="item.name"
      >
        <template v-slot:activator>
          <v-list-item
            class="pl-1"
          >
            <v-list-item-title
              class="pl-1"
            >
              {{ item.name}}
            </v-list-item-title>
          </v-list-item>
        </template>
        <file-list class="pl-3" :items="item.items" :path="item.path" :root="item.path" />
      </v-list-group>
      <template
        v-else
      >
        <v-list-item
          :key="index"
          :ripple= false
          @click.stop.prevent="click"
        >
          <v-list-item-icon>
            <v-icon
              dense
              color="purple"
            >
              mdi-file-image
            </v-icon>
          </v-list-item-icon>
          <file-item
              :path="item.path"
              :root="root"
              :name="item.name"
            >
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </file-item>
        </v-list-item>
      </template>
    </template>

  </v-list>
</template>

<script>
import FileItem from './FileItem.vue'

export default {
  name: 'FileList',
  props: [
    'items', 'name', 'path', 'root'
  ],
  components: {
    FileItem
  },
  data: () => ({
    value: '',
  }),
  methods: {
    click(e) {
      e.currentTarget.children[1].click()
    }
  },
}
</script>

<style lang="scss">

.v-list-item {

    &:hover {
      cursor: pointer;


    }
    &__icon {
      margin-right: 0px !important;
    }
}

.v-list-group__header {
  padding-left: 18px !important;
}
</style>