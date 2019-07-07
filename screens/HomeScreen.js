import React from "react";
//與Ｒeact不同  表示 StyleSheet, Text, View
// import { Text } from "react-native";
// 做出滾動效果需把 Text 改成 ScrollView, 設定使用者位置不要被蓋住
//..為資料夾的層數
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
// 運用expo的icon資源
import { Icon } from "expo";
//導入ＳＶＧ
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";

//****引入 graphql  失敗*********
// import gql from "graphql-tag";

// const CardsQuery = gql`
//   {
//     cardsCollection {
//       items {
//         title
//         subtitle
//         image {
//           title
//           description
//           contentType
//           fileName
//           size
//           url
//           width
//           height
//         }
//         subtitle
//         caption
//         logo {
//           title
//           description
//           contentType
//           fileName
//           size
//           url
//           width
//           height
//         }
//       }
//     }
//   }
// `;

//呼叫函式 export default 也要添加
function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      })
  };
}

// 會稱自己為 HomeScreen
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.spring(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        duration: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.scale, {
        toValue: 1,
        duration: 300,
        duration: Easing.in()
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1
      }).start();

      StatusBar.setBarStyle("light-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView>
              <TitleBar>
                {/* 可以點選 使用TouchableOpacity 添加至react-native */}
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  {/* ********連接 uinames API來測試更換頭像 ********/}

                  <Avatar />
                </TouchableOpacity>
                <Title>歡迎回來,</Title>
                <Name>{this.props.name}</Name>
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
                // 隱藏下方的移動條
                showsHorizontalScrollIndicator={false}
              >
                {/* 重要引入數據的方法 */}
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
                {/* <Logo image={require("../assets/logo-figma.png")} text="Figma" /> */}
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
                {/* **********加載測試失敗  */}

                {/* <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    console.log(data.cardsCollection.items);
                    return <Message />;
                  }}
                </Query> */}

                {/* <Card /> */}
                {/* 使Card props */}
                {cards.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    //點擊時切換到Section頁面
                    //********* 使section能接收card組件 *******/

                    onPress={() => {
                      this.props.navigation.push("Section", {
                        section: card
                      });
                    }}
                  >
                    <Card
                      title={card.title}
                      image={card.image}
                      caption={card.caption}
                      logo={card.logo}
                      subtitle={card.subtitle}
                    />
                  </TouchableOpacity>
                ))}
                {/* <Card
                title="Props Components"
                image={require("../assets/b2.png")}
                caption="React Native"
                logo={require("../assets/logo-react.png")}
                subtitle="運用props&scrollview技術" */}
              </ScrollView>
              <Subtitle>UI作品</Subtitle>
              {course.map((course, index) => (
                <Course
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  logo={course.logo}
                  author={course.author}
                  avatar={course.avatar}
                  caption={course.caption}
                />
              ))}
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const Message = styled.Text``;

const RootView = styled.View`
  background: white;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #231c3f;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

// 使用數據組來快速建置logos 如同API
const logos = [
  {
    image: require("../assets/logo-xd.png"),
    text: "Adobe XD"
  },
  {
    image: require("../assets/logo-framerx.png"),
    text: "FramerX"
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma"
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio"
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React"
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Figma"
  }
];

// 使用數據組來快速建置cards 如同API

//******** 運用 contentful 來同步管理 ************

const cards = [
  {
    title: "React Native For Design",
    image: require("../assets/c4.png"),
    subtitle: "React Native",
    caption: "運用EXPO技術",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Styled Components",
    image: require("../assets/c3.png"),
    subtitle: "React Native",
    caption: "運用FLEX CSS技術",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Props and Icon",
    image: require("../assets/c1.jpg"),
    subtitle: "React Native",
    caption: "運用屬性傳遞技術",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/c2.jpg"),
    subtitle: "React Native",
    caption: "運用數據組技術",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "Redux",
    image: require("../assets/c5.png"),
    subtitle: "React Native",
    caption: "實現Redux技術",
    logo: require("../assets/logo-react.png")
  },
  {
    title: "API Data",
    image: require("../assets/c6.png"),
    subtitle: "React Native",
    caption: "運用API數據",
    logo: require("../assets/logo-react.png")
  }
];

// 觀念 可先建構 再來樣式設計

// 使用數據組來快速建置course 如同API

const course = [
  {
    // title: "prototype in Figma",
    // subtitle: "電子商務",
    image: require("../assets/a1.png"),
    // logo: require("../assets/logo-sketch.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "電子商務 簡單風格的設計"
  },
  {
    // title: "prototype in Figma",
    // subtitle: "音樂播放器",
    image: require("../assets/a2.png"),
    // logo: require("../assets/logo-studio.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "音樂播放器 搖滾狂潮設計"
  },
  {
    // title: "prototype in Figma",
    // subtitle: "儀表板",
    image: require("../assets/a3.jpg"),
    // logo: require("../assets/logo-react.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "儀表板 黑暗風格設計獨樹一幟"
  },
  {
    // title: "prototype in Figma",
    // subtitle: "登入頁面",
    image: require("../assets/a4.jpg"),
    // logo: require("../assets/logo-xd.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "登入頁面 女性網站"
  },
  {
    // title: "prototype in Figma",
    // subtitle: "APP ICON",
    image: require("../assets/a5.jpg"),
    // logo: require("../assets/logo-figma.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "APP ICON  黑白相間，自然簡單"
  },
  {
    // title: "prototype in Figma",
    // subtitle: "APP ICON",
    image: require("../assets/a6.png"),
    // logo: require("../assets/logo-figma.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "信用卡頁面  一卡在手，希望無窮"
  },
  {
    // title: "prototype in Figma",
    // subtitle: "APP ICON",
    image: require("../assets/a7.png"),
    // logo: require("../assets/logo-figma.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "404  明確、提示"
  },
  {
    // title: "prototype in Figma",
    // subtitle: "APP ICON",
    image: require("../assets/a8.jpg"),
    // logo: require("../assets/logo-figma.png"),
    author: "Kaiz Zheng",
    avatar: require("../assets/Bitmap.png"),
    caption: "我的2019形象設計 黎明前的黑暗"
  }
];
