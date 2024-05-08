import axios from "axios"
import {getToken} from "@/utils/auth"
import {transParams, blobValidate} from "@/utils/ruoyi"
import cache from "@/plugins/cache"
import errorCode from "@/utils/errorCode"
import {Loading, Message, MessageBox} from "element-ui"
import store from "@/store"
import {saveAs} from "file-saver"

let downloadLoadingInstance
export let isRelogin = {show: false}

export const http = axios.create({
    baseURL: "/prod-api", // 在这里设置基础 URL
    timeout: 10000, // 设置超时时间（可选）
    headers: {
        "Content-Type": "application/json;charset=utf-8" // 设置默认请求头（可选）
    }
})

http.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getToken() && !isToken) {
        config.headers["Authorization"] = "Bearer " + getToken()
    }

    if (config.method === "get" && config.params) {
        let url = config.url + "?" + transParams(config.params)
        url = url.slice(0. - 1)
        config.params = {}
        config.url = url
    }
    if (!isRepeatSubmit && (config.method === "post" || config.method === "put")) {
        const requestObj = {
            url: config.url,
            data: typeof config.data === "object" ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
        const requestSize = Object.keys(JSON.stringify(requestObj)).length
        const limitSize = 5 * 1024 * 1024
        if (requestSize >= limitSize) {
            console.warn(`[${config.url}]: ` + "请求数据大小超出允许5M限制,无法进行防重复提交验证.")
            return config
        }
        const sessionObj = cache.session.getJSON("sessionObj")
        if (sessionObj === undefined || sessionObj === null || sessionObj === "") {
            cache.session.setJSON("sessionObj", requestObj)
        } else {
            const s_url = sessionObj.url                  // 请求地址
            const s_data = sessionObj.data                // 请求数据
            const s_time = sessionObj.time                // 请求时间
            const interval = 1000                         // 间隔时间(ms)，小于此时间视为重复提交
            if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                const message = "数据正在处理，请勿重复提交"
                console.warn(`[${s_url}]: ` + message)
                return Promise.reject(new Error(message))
            } else {
                cache.session.setJSON("sessionObj", requestObj)
            }
        }
    }
    return config
}, error => {
    // console.log(error)
    Promise.reject(error)
})

http.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode["default"]
        // 二进制数据则直接返回
        if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") {
            return res.data
        }
        if (code === 401) {
            if (!isRelogin.show) {
                isRelogin.show = true
                MessageBox.confirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", {
                    confirmButtonText: "重新登录",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    isRelogin.show = false
                    store.dispatch("LogOut").then(() => {
                        location.href = "/index"
                    })
                }).catch(() => {
                    isRelogin.show = false
                })
            }
            return Promise.reject("无效的会话，或者会话已过期，请重新登录。")
        } else if (code === 500) {
            Message({message: msg, type: "error"})
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            Message({message: msg, type: "warning"})
            return Promise.reject("error")
        } else if (code !== 200) {
            Notification.error({title: msg})
            return Promise.reject("error")
        } else {
            return res.data
        }
    },
    error => {
        console.log("err" + error)
        let {message} = error
        if (message == "Network Error") {
            message = "后端接口连接异常"
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时"
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常"
        }
        Message({message: message, type: "error", duration: 5 * 1000})
        return Promise.reject(error)
    }
)

// 通用下载方法
export function download(url, params, filename, config) {
    downloadLoadingInstance = Loading.service({
        text: "正在下载数据，请稍候",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
    })
    return http.post(url, params, {
        transformRequest: [(params) => {
            return transParams(params)
        }],
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        responseType: "blob",
        ...config
    }).then(async (data) => {
        const isBlob = blobValidate(data)
        if (isBlob) {
            const blob = new Blob([data])
            saveAs(blob, filename)
        } else {
            const resText = await data.text()
            const rspObj = JSON.parse(resText)
            const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode["default"]
            Message.error(errMsg)
        }
        downloadLoadingInstance.close()
    }).catch((r) => {
        console.error(r)
        Message.error("下载文件出现错误，请联系管理员！")
        downloadLoadingInstance.close()
    })
}