import defaultSettings from "@/settings"

const {sideTheme, showSettings, topNav, tagsViews, fixedHeader, sidebarLogo, dynamicTitle} = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem("layout-setting")) || ""

console.log(storageSetting)

const state = {
    title: "",
    theme: storageSetting.theme || "#409EFF",
    sideTheme: storageSetting.sideTheme || sideTheme,
    showSettings: showSettings,
    topNav: storageSetting.topNav || topNav,
    tagsViews: storageSetting.tagsViews || tagsViews,
    fixedHeader: storageSetting.fixedHeader || fixedHeader,
    sidebarLogo: storageSetting.sidebarLogo || sidebarLogo,
    dynamicTitle: storageSetting.dynamicTitle || dynamicTitle
}

const mutations = {
    CHANGE_SETTING: (state, {key, value}) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({commit}, data) {
        commit("CHANGE_SETTING", data)
    },
    setTitle({commit}, title) {
        state.title = title
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

