import { View } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import React from 'react';
import Taro from '@tarojs/taro';
import 'taro-ui/dist/style/components/button.scss'; // 按需引入
import './index.less';

function HomePage() {
  return (
    <View className="home_wrapper">
      啦啦啦啦啦啦 我是首页
    </View>
  );
}

export default HomePage;
