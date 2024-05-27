import request from "@/utils/request"

export const getRouters = () => {
    return request.get("/getRouters")
}
