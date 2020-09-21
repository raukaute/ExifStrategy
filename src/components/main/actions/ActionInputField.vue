<template>
  <div
    class="input-target__wrap"
  >
    <label for="target">
      <input
        id="target"
        type="text"
        :value="picked ? picked : value"
        @input="(e) => this.$emit('input', e.target.value)"
        @focus="reactFocus"
        @blur="reactFocus"
        class="input-target"
        :placeholder="placeholder"
        v-on:keyup.down="handleListFocus"
        v-on:keyup.up="handleListFocus"
        @keyup.enter="setTargetVal()"
      />
    </label>
    <ul
      v-if="suggestions && focus"
      class="drop-list"
    >
      <li
        :class="{isFocus: listFocus == `match-${index}`}"
        v-for="(suggestion, index) in suggestions"
        :key="index"
      >
        <span
          v-html="boldMatch(suggestion)"
          :ref="`match-${index}`"
          @click="setTargetVal(suggestion)"
          :title="suggestion"></span>
      </li>
  </ul>
  <slot name='tag-option'></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'ActionInputField',
  props: [
    'value', 'placeholder'
  ],
  data () {
    return {
      picked: '',
      focus: false,
      listFocus: undefined,
    }
  },
  computed: {
    ...mapGetters([
      'suggestions', 'checkAuto'
    ])
  },
  watch: {
    value: function(val){
      if ( val.length >= 3 && this.checkAuto ) {
        this.$store.dispatch('checkAutoComplete', val)
      }
      else if (val.length < 3) {
        this.$store.commit('CLEAN_UP_AUTOCOMPLETE', false);
        this.picked = '';
      }
    }
  },
  methods: {
    boldMatch: function(val) {
      if (!val) return '';
        try {
          return val.replace(new RegExp(this.value, 'ig'), `<b>${val.match(new RegExp(this.value, 'ig'))[0]}</b>`)
        }
        catch {
          return val
        }
    },
    setTargetVal: function(val){
      const target = val ? val : this.$refs[this.listFocus][0].textContent
      this.picked = target;
      this.$emit('input',target)
      this.$store.commit('CLEAN_UP_AUTOCOMPLETE', true)
    },
    reactFocus: function() {
      setTimeout(() => {
        this.focus = !this.focus
      }, 500)
    },
    handleListFocus: function(e) {

      if(e.code == 'ArrowDown'){
        this.listFocus = !this.listFocus
          ? `match-${0}`
          : this.suggestions.length -1 != parseInt(this.listFocus.match(/\d+/)[0])
            ? `match-${parseInt(this.listFocus.match(/\d+/)[0]) + 1}`
            : this.listFocus
      } else {
        this.listFocus = !this.listFocus
          ? undefined
          : this.listFocus == 'match-0'
            ? undefined
            : `match-${parseInt(this.listFocus.match(/\d+/)[0]) + -1}`
      }
      if (this.listFocus) {
        document.querySelector('.drop-list').scrollTop = this.$refs[this.listFocus][0].offsetTop -7
      }
    },
  }
}
</script>

<style lang="scss">
.input-target__wrap {
  position: relative;
  width: 25%;
  padding: 0 12px;
  border-radius: .4em;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .012);

  .input-target {
    max-width: 100%;
    line-height: 2.2em;

    &::placeholder {
      color:rgba(0, 0, 0, .6);
      transition: all .18s linear;
    }

    &:focus {
      outline: none;
      &::placeholder {
        color: transparent;
      }
    }
  }
}
.drop-list {
  position: absolute;
  left: 0;
  width: 100%;
  background: #fff;
  max-height: 100px;
  padding: 0 !important;
  margin-top: -2px;
  white-space: nowrap;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: inherit;
  border-radius: 0 0 .4em .4em;
  z-index: 3;

  li {
    list-style: none;
    padding: 5px 12px;

    &:hover {
      cursor: default;
      background: rgba(238, 238, 238, .4)
    }

    &.isFocus {
      background: rgba(200, 200, 200, .6)
    }
  }
}
</style>