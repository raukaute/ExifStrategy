<template>
  <div
    class="action-type__content"
  >
    <h5>
      Type or choose tagname
    </h5>
    <div
      class="action-type__select flex-row"
    >
      <action-input-field v-model="options.target" placeholder="Target" />
      <div
        class="val-selector"
      >
        <h5
          class="val-selector__header"
        >overwrite with</h5>
        <div
          class="abs-box"
        >
         <span
          :class="{active: !options.isCustom}"
         >
          Tag
        </span>
         <v-switch v-model="options.isCustom" :value= true dense></v-switch>
         <span
          :class="{active: options.isCustom}"
         >Custom</span>
        </div>
      </div>
      <action-input-field v-model="options.origin"  placeholder="Origin">
        <template v-slot:tag-option v-if="options.isFN && options.origin.length > 0" >
          <transition name="fade">
          <div
            class="check-optional"
            style="position: absolute; padding: 10px 0"
          >
            <input
              type="checkbox"
              v-model="options.appendFN" />
            <span>append to filename{{ options.appendFN ? '!' : '?' }}</span>
          </div>
        </transition>
        </template>
      </action-input-field>
    </div>
    <h5 style="margin-bottom: 1.25em">Apply to</h5>
    <div
      class="flex-row"
    >
      <div
        class="action-type__options flex-col"
        style="flex: auto"
      >
        <div>
          <input
            v-model="options.applyFolder"
            :value= false
            type="radio"
            name="options"
            id="options-file">
          <drop-down-list :label="fileLabel" :items="files" display="inline-block"  />
        </div>
        <div>
          <input
            v-model="options.applyFolder"
            type="radio"
            :value= true
            name="options"
            id="options-folder">
          <drop-down-list isFolder :label="folder[0].name" :items="folder" display="inline-block" />
        </div>
        <transition name="fade">
          <div
            :class="{opaque: !options.applyFolder}"
            class="check-optional"
          >
            <input
              type="checkbox"
              v-model="options.subfolder" />
            <span>include subfolder{{ options.subfolder ? '!' : '?' }}</span>
          </div>
        </transition>
      </div>
      <div
        class="btn-cta"
      >
        <v-btn
          @click="applyChange"
          color="#fff"
          small
        >
          GO!
        </v-btn>
      </div>
    </div>
    <transition name="appear">
      <snackbar
        v-if="showSnack"
        @close="showSnack=!showSnack"
        :message="report"
      />
    </transition>
  </div>
</template>

<script>
import { mapGetters} from 'vuex';
import ActionInputField from './ActionInputField.vue';
import DropDownList from './DropDownList.vue';
import snackbar from './notes/snackbar.js';

export default {
  name: 'ActionChange',
  components: {
    ActionInputField, DropDownList, snackbar
  },
  data() {
    return {
      options: {
        target: '',
        origin: '',
        isCustom: '',
        applyFolder: '',
        subfolder: '',
        isFN: undefined,
        appendFN: undefined
      },
      showSnack: false,
      report: '',
    }
  },
  computed: {
    ...mapGetters({
      files: 'activeFiles',
      folder: 'activeFolder',
    }),
    fileLabel: function() {
      return  this.files.length == 0 || this.files.length > 1
        ? `${this.files.length} Files`
        : `${this.files.length} File`
    },
  },
  watch: {
    'options.target': function(val) {
      this.options.isFN = val == 'FileName' ? true : false
    }
  },
  methods: {
    applyChange: function() {
      this.$store.dispatch('changeMetaData', this.options)
        .then(([report, hasWarning]) => {
          this.showReport(report)
        .then((res) => {
          if(res) {
            if (!hasWarning) {
              setTimeout(() => {
                this.showSnack =!this.showSnack
              }, 1800);
            }
          }
        })
        })
    },
    showReport: function(rep) {
      return new Promise(resolve => {
        this.report = rep
        this.showSnack = !this.showSnack
        resolve(this.showSnack)
      })
    }
  }
}
</script>

<style lang="scss">
.flex {
  &-row,
  &-col {
    display: flex;
    justify-content: space-between;
  }
  &-col {
    flex-direction: column;
  }
}
.action-type__content {
  width: 100%;
  height: 100%;
  padding: 0 2.5em 0 3em;
 

    h5 {
      margin-bottom: 1.75em;
    }

    .val-selector {
      position: relative;
      // outline: 1px solid green;
      width: 40px;

      &__header {
        position: absolute;
        left: -40%;
        bottom: -50px;
        white-space: nowrap;
      }

      .abs-box {
        position: absolute;
        display: flex;
        justify-content: space-around;
        top: 0;
        left: -100%;
        height: 100%;
        // width: 100%;

        .v-input--switch {
          margin: 0 6px !important;
          padding-top: 6px !important;

          .v-input--selection-controls__input {
            margin: 0 !important;
          }

          &__thumb {
            color: white !important;
          }

          &__track {
            color: rgba(0, 0, 0, 0.38) !important;
          }
        }
        span {
          align-self: center;
          margin-right: 4px;
          transition: color .5s ease;

        }
      }
    }
}
.opaque {
  opacity: 0;
}
.btn-cta {
  align-self: flex-end;
  margin-bottom: 2.1em;
  button {
    font-size: 1.25em !important;
    font-weight: bold;
  }
}
.action-type {
  &__select{
    margin-bottom: 1.25em;
  }
  &__options {
    justify-content: flex-start;

    div {
      position: relative;
      padding-top: 10px;
      margin-right: .75em;
    }
  }
}

.check-optional {
  position: relative;
  margin-right: .75em;
  padding: 10px 12px;
  transition: opacity .3s ease;
  white-space: nowrap;
}

input[type=radio],
input[type=checkbox] {
  position: relative;
  border: 2px solid rgba(66,66,66,.6);
  border-radius: 2px;
  appearance: none;
  padding: 5px;
  margin-right: 8px;
  transition: all .5s ease;

    &:focus {
      outline: none;
    }

    &:checked:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%,-50%,0);
      width: 80%;
      height: 80%;
      background: rgba(66,66,66,.6);
      border-radius: 2px;

    }
  }

  label {
    position: relative;
    color: #424242;
    top: -1px;
  }
.v-input--selection-controls__ripple:before,
  .v-ripple__container {
    opacity: 0 !important;
  }

.v-snack__wrapper {
  max-width: 520px !important;
  margin-top: 50px !important;

  ul {
    list-style: none;
    margin: 10px 0;
    white-space: no-wrap;
  }
}

.appear-enter-active, .appear-leave-active {
    transition: all .5s;
}
.appear-enter {
  transform: translatey(30px);
  opacity: 0;
}
.appear-leave-to {
   transform: translatey(-30px);
  opacity: 0;
}
</style>