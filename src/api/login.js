import request from "@/utils/request"

export const loginApi = {
    getValidCodeImg() {
        return request.get("/captchaImage")
    },
    login(userInfo) {
        return request({url: "/login", headers: {isToken: false, repeatSubmit: false}, method: "post", data: userInfo})
    },
    register(data) {
        return request({
            url: "/register",
            headers: {
                isToken: false
            },
            method: "post",
            data: data
        })
    },
    getInfo() {
        return request({
            url: "/getInfo",
            method: "get"
        })
    },
    logout() {
        return request({
            url: "/logout",
            method: "post"
        })
    }
}
