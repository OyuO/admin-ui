import Vue from "vue"
import Vuex from "vuex"
import user from "./modules/user"
import settings from "./modules/settings"
import app from "./modules/app"
import permission from "@/store/modules/permission"
import getters from "./getters"
import tagsView from "@/store/modules/tagsView"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        tagsView,
        settings,
        app,
        permission
    },
    getters
})

export default store
