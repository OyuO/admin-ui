import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import ElementUI from "element-ui"
import request from "@/utils/request"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/styles/index.scss"
import "@/assets/styles/ruoyi.scss"
import "./assets/styles/element-variables.scss"
import "./permissions"
import "./assets/icons"
import plugins from "./plugins"
import {addDateRange, resetForm} from "@/utils/ruoyi"
import Cookies from "js-cookie"
// 字典数据组件
import DictData from '@/components/DictData'
// 分页组件
import Pagination from "@/components/Pagination";

Vue.prototype.$http = request
Vue.prototype.resetForm = resetForm

Vue.config.productionTip = false
Vue.prototype.addDateRange = addDateRange
Vue.use(plugins)
Vue.use(ElementUI, {
    size: Cookies.get("size") || "medium" // set element-ui default size
})
DictData.install()
Vue.component('Pagination', Pagination)



new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app")
