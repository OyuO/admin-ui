import request from "@/utils/request"
import {parseStrEmpty} from "@/utils/ruoyi"


export function listUser(query) {
    return request({
        url: "/system/user/list",
        method: "get",
        params: query
    })
}

export function deptTreeSelect() {
    return request({
        url: "/system/user/deptTree",
        method: "get"
    })
}
