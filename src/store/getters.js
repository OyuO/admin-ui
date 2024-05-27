const getters = {
    sidebar: state => state.app.sidebar,
    roles: state => state.user.roles,
    sidebarRouters: state => state.permission.sidebarRouters,
    permissions: state => state.user.permissions
}

export default getters
