import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import  Vuetify, {VBtn} from 'vuetify/lib';



Vue.use(Vuetify)


export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    themes: {
      light: {
        primary: '#424242'
      }
    }
  }

});
