//動畫建立五步驟：1.導入：import { Animated } from "react-native";
//動畫建立五步驟：2.設置動畫state：class Menu extends React.Component {state = { top: new Animated.Value(900)};
//動畫建立五步驟：3.建立動畫組建：const AnimatedContainer = Animated.createAnimatedComponent(Container);
//動畫建立五步驟：4.state應用動畫組建：<AnimatedContainer style={{ top: this.state.top }}>
//動畫建立五步驟：5.建立動畫事件：componentDidMount() {Animated.spring(this.state.top, { toValue: 0  }).start(); }

//觀念重點 在沒有事件狀態之下 不需設立class 若有則需要建立class
//如何使高度適用於任何屏幕：在import { Animated, TouchableOpacity } from "react-native";加入 Dimensions

import React from "react";
import styled from "styled-components";
// 導入動畫庫
import { Animated, TouchableOpacity, Dimensions } from "react-native";
//匯入Ionicon
import { Icon } from "expo";
import MenuItem from "./Menultem";
//使用reducx
import { connect } from "react-redux";

//函式
function mapStateToProps(state) {
  return { action: state.action };
}

//函式
function mapDispatchToProps(dispatch) {
  return {
    closeMenu: () =>
      dispatch({
        type: "CLOSE_MENU"
      })
  };
}

//設置變數screenHeight 運用在 23 / 34 toValue
const screenHeight = Dimensions.get("window").height;

class Menu extends React.Component {
  //state 可改變 props不行
  state = {
    top: new Animated.Value(screenHeight)
  };

  //當我家載時呼叫toggleMenu
  componentDidMount() {
    this.toggleMenu();
  }
  //*****---------------------------------------------**************
  // componentDidMount 只會加載一次 所以參數更新呼叫toggleMenu不會有動作 故新增componentDidUpdate
  componentDidUpdate() {
    this.toggleMenu();
  }

  //*****---------------------------------------------**************
  //彈出 與 關閉的條件判斷式 呼叫action來自Redux數據
  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.top, {
        // toggleMenu彈出時不要滿版要下面一點 不要設０
        toValue: 54
      }).start();
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.top, {
        toValue: screenHeight
      }).start();
    }
  };

  render() {
    return (
      <AnimatedContainer style={{ top: this.state.top }}>
        <Cover>
          <Image source={require("../assets/01.jpg")} />
          <Title>凱中</Title>
          <Subtitle>UI/UX設計師</Subtitle>
        </Cover>
        {/* 用TouchableOpacity包裝 : 他是可點擊的函式庫*/}
        <TouchableOpacity
          /* 呼叫closeMenu :*/
          onPress={this.props.closeMenu}
          style={{
            position: "absolute",
            top: 120,
            left: "50%",
            marginLeft: -22,
            // 最上層設定
            zIndex: 1
          }}
        >
          <CloseView>
            {/* 匯入Ionicon */}
            <Icon.Ionicons name="ios-close" size={44} color="#9C3BC4" />
          </CloseView>
        </TouchableOpacity>
        <Content>
          {items.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          ))}
        </Content>
      </AnimatedContainer>
    );
  }
}

//多個輸出狀態用 （）表示 函式也要輸出
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 8px;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

const Container = styled.View`
  position: absolute;
  background: white;
  width: 100%;
  height: 100%;
  ${"" /* 覆蓋整個頁面之上 */}
  z-index: 100;
`;

// 需使用Animated的函式庫導入進行樣式設計 並取代Container
const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Cover = styled.View`
  height: 142px;
  background: black;
  justify-content: center;
  align-items: center;
`;

//要導入函式變數 ： ＄{screenHeight};
const Content = styled.View`
  height: ${screenHeight};
  background: #231c3f;
  padding: 50px;
`;

const items = [
  {
    icon: "ios-settings",
    title: "設置",
    text: "基本設定"
  },
  {
    icon: "ios-card",
    title: "付款",
    text: "線上服務"
  },
  {
    icon: "ios-compass",
    title: "React知識",
    text: "開始觀看"
  },
  {
    icon: "ios-exit",
    title: "登出",
    text: "下次再見"
  }
];
