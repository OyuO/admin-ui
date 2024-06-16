import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import store from "@/store"
import ElementUI from "element-ui"
import request from "@/utils/request"
// import "element-ui/lib/theme-chalk/index.css"
import "@/assets/styles/index.scss"
import "./assets/styles/global.css"
import "./permissions"

Vue.use(ElementUI)
Vue.prototype.$http = request

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    router,
    store
}).$mount("#app")
