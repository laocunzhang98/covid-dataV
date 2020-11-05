import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
import echarts from 'echarts'
import './plugins/vcharts'
import './plugins/ElementUi'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
