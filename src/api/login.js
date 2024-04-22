import {axiosInstance as http} from "@/common/request";

export default {
    getValidCodeImg() {
        return http.get('/captchaImage')
    },
    login(loginForm) {
        console.log(loginForm.uuid)
        return http.post('/login', loginForm)
    }
}
