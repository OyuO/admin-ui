import {http as http} from "@/common/request"

export const loginApi = {
    getValidCodeImg() {
        return http.get("/captchaImage")
    },
    login(userInfo) {
        return http.post("/login", userInfo)
    }
}
