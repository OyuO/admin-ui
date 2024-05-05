import {http} from "@/common/request"

export const menuApi = {
    getRouters() {
        return http.get("/getRouters")
    }
}
