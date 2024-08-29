const getters = {
    sidebar: state => state.app.sidebar,
    roles: state => state.user.roles,
    sidebarRouters: state => state.permission.sidebarRouters,
    permissions: state => state.user.permissions,
    permission_routes: state => state.permissions.routes
}

export default getters
