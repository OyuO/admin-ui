import auth from "@/plugins/auth"
import cache from "@/plugins/cache"
import modal from "@/plugins/modal"

export default {
    install(Vue) {
        Vue.prototype.$auth = auth
        Vue.prototype.$cache = cache
        Vue.prototype.$modal = modal
    }
}
