import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import ElementUI from "element-ui"
import request from "@/utils/request"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/styles/index.scss"
import "@/assets/styles/ruoyi.scss"
import "./permissions"
import "./assets/icons"
import plugins from "./plugins"
import {addDateRange} from "@/utils/ruoyi"
import Cookies from "js-cookie"

Vue.prototype.$http = request

Vue.config.productionTip = false
Vue.prototype.addDateRange = addDateRange
Vue.use(plugins)
Vue.use(ElementUI, {
    size: Cookies.get("size") || "medium" // set element-ui default size
})


new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app")
