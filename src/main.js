import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';
import Antd from "ant-design-vue";
import App from './App';
import router from './router'

Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
