import Cookies from "js-cookie"

const TokenKey = "Admin-Token"

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    Cookies.set(TokenKey, token, {expires: 60 * 24})
}

export function removeToken() {
    Cookies.remove(TokenKey)
}
