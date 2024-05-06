import axios from "axios"

export let isRelogin = {show: false}

export const http = axios.create({
    baseURL: "/prod-api", // 在这里设置基础 URL
    timeout: 10000, // 设置超时时间（可选）
    headers: {
        "Content-Type": "application/json" // 设置默认请求头（可选）
    }
})
