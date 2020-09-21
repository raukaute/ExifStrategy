<template>
  <v-row
      class="row-action-info"
    >
      <v-col
        class="col-action"
      >
        <h2
          class="header-info"
        >
          Action
        </h2>
        <div
          class="action-type__wrap"
          style="height: 100%"
        >
          <div
            class="action-type__row"
            style="height: 100%"
          >
            <h5
              class="action-type__header"
            >
              {{ 'change' | capitalize }}
            </h5>
            <action-change />
          </div>

           <!-- <div
            class="action-type__row"
          >
            <h5
              class="action-type__header"
            >
              {{ 'filter' | capitalize }}
            </h5>
            <action-filter />
          </div>
           <div
            class="action-type__row"
          >
            <h5
              class="action-type__header"
            >
              {{ 'add' | capitalize }}
            </h5>
          </div> -->
        </div>
      </v-col>
    </v-row>
</template>

<script>
// import EventBus from '../../util/EventBus.js';
// import ActionFilter from './actions/ActionFilter.vue';
import ActionChange from './actions/ActionChange.vue';

export default {
  name: 'ActionPane',
  components: {
     ActionChange
  },
}
</script>

<style lang="scss">

.col-action {
  padding-top: 0px;
  overflow-y: hidden;
}

div.action-type__row {
  position: relative;
  display: flex;
  overflow-y: hidden;
  // padding-bottom: 28px;

    &:last-of-type {
      border-bottom: none;
    }

    &:before {
      content: '';
      position: absolute;
      top: 10%;
      left: 50%;
      height: 100%;
      min-height: 100px;
      transform: translate3d(-50%, 0, 0);
      width: 38%;
      border-bottom: 1px solid rgba(20, 20, 20, .2);
    }

  .action-type__header {
    display: inline-block;
    flex-grow: 0;
    position: absolute;
    left: 0;
    top: 30%;
    writing-mode: tb-rl;
    transform: rotate(180deg);
    letter-spacing: .2em;
    font-weight: 600;
    box-shadow: inset 3px 0 0 0 #bdb;
    color: #424242;
    opacity: .6;

    &:hover {
      cursor: default;
    }
  }
}

</style>