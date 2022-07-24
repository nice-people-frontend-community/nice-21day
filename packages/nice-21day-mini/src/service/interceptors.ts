import Taro from "@tarojs/taro"
import { pageToLogin, pageToBeforeLogin } from "./utils"
export const SUCCESS = '200'
export const SUCCESSLOGIN = '201'
export const FAIL = '500'
export const RELOGIN = '401'

const customInterceptor = (chain) => {
    const requestParams = chain.requestParams
    //请求添加 loading
    Taro.showLoading({
        title: '加载中。。。',
    })
    return chain.proceed(requestParams).then(res => {
        Taro.hideLoading()
        if (res.statusCode == SUCCESS) {
            if (res.data.code === 0) {
                return res.data
            } else {
                return Promise.reject(res.data)
            }
        }
        if (res.statusCode == FAIL) {
            return Promise.reject({ desc: "接口请求报错" })
        } else if (res.statusCode === RELOGIN) {
            Taro.setStorageSync("nice_21day_access_token", "")
            pageToLogin()
            return Promise.reject({ desc: "请重新登录" })
        }
        else if (res.statusCode == SUCCESSLOGIN) {
            Taro.setStorageSync("nice_21day_access_token", res.data?.access_token)
            pageToBeforeLogin()
        }
    }).catch(error => {
        Taro.hideLoading()
        console.error(error)
        return Promise.reject(error)
    })
}
const interceptors = [customInterceptor]

export default interceptors