import {http} from "@/utils/request"

export const menuApi = {
    getRouters() {
        return http.get("/getRouters")
    }
}
