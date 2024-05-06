import {http as http} from "@/utils/request"

export const loginApi = {
    getValidCodeImg() {
        return http.get("/captchaImage")
    },
    login(userInfo) {
        return http.post("/login", userInfo)
    },
    register(data) {
        return http({
            url: "/register",
            headers: {
                isToken: false
            },
            method: "post",
            data: data
        })
    },
    getInfo() {
        return http({
            url: "/getInfo",
            method: "get"
        })
    },
    logout() {
        return http({
            url: "/logout",
            method: "post"
        })
    }
}
