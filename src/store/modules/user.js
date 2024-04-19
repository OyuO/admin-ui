const user = {
    state: {
        token: '',
        id: '',
        name: '',
        avatar: '',
        permissions: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    }
}

export default user
