const getters = {
    sidebar: state => state.app.sidebar,
    roles: state => state.user.roles,
    sidebarRouters: state => state.permissions.sidebarRouters
}

export default getters
