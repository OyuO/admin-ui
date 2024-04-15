import {axiosInstance as http} from "@/common/request";

export default {
    getValidCodeImg() {
        return http.get('/captchaImage')
    }
}
