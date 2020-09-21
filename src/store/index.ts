import Vue from 'vue';
import Vuex from 'vuex';
import workSpace from './workspace';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { workSpace }
})
