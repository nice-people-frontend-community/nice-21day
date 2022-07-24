import Taro from "@tarojs/taro";

/**
 * @description 根据环境获取最终请求的url
 */
export const getUrl = (url) => {
    let finalurl = '';
    if (process.env.NODE_ENV === 'development') {
        //开发环境 - 根据请求不同返回不同的BASE_URL
        // BASE_URL = 'http://127.0.0.1:7001/api/v1'+ url
        finalurl = 'http://192.168.2.3:7001/api/v1' + url
    } else {
        // 生产环境
        finalurl = 'http://192.168.2.3:7001/api/v1' + url
    }
    return finalurl
}
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
    let pages = Taro.getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let url = currentPage.route
    return url
}

export const pageToLogin = () => {
    let path = getCurrentPageUrl()
    Taro.clearStorage()
    if (!path.includes('login')) {
        Taro.navigateTo({
            url: "/pages/login/index"
        });
    }
}
//todo：跳转到登录之前的页面
export const pageToBeforeLogin=()=>{
    Taro.navigateTo({
        url: "/pages/home/index"
    });
}