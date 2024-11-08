import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css';
import store from "./store";
// import router from "./router/index";
import ApiService from './services/api.service';

Vue.config.productionTip = false

ApiService.init();

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
