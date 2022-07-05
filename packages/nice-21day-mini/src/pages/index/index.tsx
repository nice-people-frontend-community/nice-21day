import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";

import Taro from "@tarojs/taro";
import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

function IndexPage() {
  const login = () => {
    Taro.getUserProfile({
      desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log(res);
      }
    });
  };

  return (
    <View className="index">
      <AtButton type="primary" onClick={login}>
        点击授权
      </AtButton>
    </View>
  );
}

export default IndexPage;
