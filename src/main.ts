import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
const { ipcRenderer } = require('electron');
Vue.config.productionTip = false;

Vue.filter('capitalize', (value) => {
  if (!value) return '';
  value = value.toString();
  return value.toUpperCase();
})

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    this.$router.push('/');
  },
}).$mount('#app');
