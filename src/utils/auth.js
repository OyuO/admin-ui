import Cookies from "js-cookie"

const TokenKey = "Admin-Token"

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    Cookies.set(TokenKey, token, {expires: 30})
}

export function removeToken() {
    Cookies.remove(TokenKey)
}
