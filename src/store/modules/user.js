import {loginApi} from "@/api/login"
import {setToken} from "@/common/auth"

const user = {
    state: {
        token: "",
        id: "",
        name: "",
        avatar: "",
        permissions: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        }
    },
    actions: {
        // 登录
        Login({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                loginApi.login(userInfo).then(res => {
                    const data = res.data
                    // console.log(data)
                    if (data.code !== 200) {
                        reject(data.msg)
                    }
                    setToken(data.token)
                    commit("SET_TOKEN", res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }

    }
}

export default user
