<template>
  <div
    class="dropdown-list__wrap"
    :style="{width:width, display:display}"
    @click="active = !active"
  >
    <span
      class="dropdown-list__label flex-row"
      :class="{open: active && this.items.length}"
    >{{ label }}
    <v-icon v-if="!isFolder">mdi-menu-down</v-icon>
    </span>
    <ul
      v-if="active && !isFolder"
      class="drop-list"
    >
      <li
        v-for="(item, index) in  items"
        :key="index"
      >
        <span
          style="font-size:.8em"
        > {{ item.name }} </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'DropDownList',
  props: {
    width: {
      type: String,
      default: '25%'
    },
    display:{
      type: String,
      default: 'block'
    },
    label: {
      type: String,
      required: true,
      default: 'Folder'
    },
    items: {
      type: [Array, String],
      required: false,
    },
    isFolder: {
      type: Boolean,
      default: false,
    }
  },
  data(){
    return {
      active: false
    }
  }
}
</script>

<style lang="scss">
.dropdown-list {
  &__wrap{
  position: relative;
  padding: 0 12px;
  border-radius: .4em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .012);
  }

  &__label {

    &.open {

      i{
        transform: rotate(180deg);
      }
    }

  }
}
</style>