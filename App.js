import React from "react";
//與Ｒeact不同  表示 StyleSheet, Text, View
// import { Text } from "react-native";
// 做出滾動效果需把 Text 改成 ScrollView, 設定使用者位置不要被蓋住
import { ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components";
import Card from "./components/Card";
// 運用expo的icon資源
import { Icon } from "expo";
//導入ＳＶＧ
import { NotificationIcon } from "./components/Icons";
import Logo from "./components/Logo";

// 會稱自己為ＡＰＰ｀
export default class App extends React.Component {
  render() {
    return (
      <Container>
        <SafeAreaView>
          <ScrollView>
            <TitleBar>
              <Avatar source={require("./assets/Bitmap.png")} />
              <Title>歡迎回來,</Title>
              <Name>凱中</Name>
              {/* 置入 Ionicons Icon*/}
              {/* <Icon.Ionicons
                name="ios-notifications"
                // 設定icon size
                size={32}
                // 設定color
                color="black" */}

              {/* 置入自己要的ＳＶＧ */}
              <NotificationIcon
                // icon 位置
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: "row",
                padding: 20,
                paddingLeft: 12,
                padding: 30
              }}
              horizontal={true}
            >
              <Logo
                image={require("./assets/logo-framerx.png")}
                text="Framer X"
              />
              <Logo image={require("./assets/logo-figma.png")} text="Figma" />
            </ScrollView>
            <Subtitle>React Native with expo</Subtitle>
            {/* 滾動設定 水平 */}
            <ScrollView
              horizontal={true}
              // 因為以上設定把陰影蓋住 所以須重新設定style
              style={{ paddingBottom: 30 }}
              // 把難看的水平條隱藏
              showsHorizontalScrollIndicator={false}
            >
              {/* <Card /> */}
              {/* 使Card props */}
              <Card
                title="Styled Components"
                image={require("./assets/b1.png")}
                caption="React Native"
                logo={require("./assets/logo-react.png")}
                subtitle="運用flex css技術"
              />
              <Card
                title="Props Components"
                image={require("./assets/b2.png")}
                caption="React Native"
                logo={require("./assets/logo-react.png")}
                subtitle="運用props&scrollview技術"
              />
            </ScrollView>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
`;

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;
