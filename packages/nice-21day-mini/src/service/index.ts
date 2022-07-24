import Taro from '@tarojs/taro';
import { getUrl } from './utils'
import interceptors from './interceptors'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class GoodTeenRequest {
    dealRequest(params, method) {
        let { url, data, contentType } = params;
        const option = {
            url: getUrl(url),  //地址
            data: data,   //传参
            method: method || "GET", //请求方式
            timeout: 2000, // 超时时间
            header: {  //请求头
                'content-type': contentType || "application/json;charset=UTF-8",
                'Authorization': Taro.getStorageSync('nice_21day_access_token')
            }
        };
        return Taro.request(option);
    }

    get(url, data) {
        let option = { url, data };
        return this.dealRequest(option, "GET");
    }

    post(url, data) {
        let params = { url, data };
        return this.dealRequest(params, "POST");
    }
    delete(url, data = "") {
        let option = { url, data };
        return this.dealRequest(option, "DELETE");
      }
}
export default new GoodTeenRequest()