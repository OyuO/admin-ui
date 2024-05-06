import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store";
import ElementUI from 'element-ui';
import {http} from "@/utils/request";
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/globall.css'

Vue.use(ElementUI);
Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
