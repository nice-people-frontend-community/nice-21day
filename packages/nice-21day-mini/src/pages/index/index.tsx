import React, { useEffect } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
const IndexPage = () => {
  useEffect(() => {
    const hasLogin = Taro.getStorageSync('nice_21day_access_token')
    if (!!hasLogin) {
      Taro.reLaunch({
        url: "/pages/home/index"
      });
    } else {
      Taro.reLaunch({
        url: "/pages/login/index"
      });
    }

  }, [])
  return <View></View>
}

export default IndexPage;
