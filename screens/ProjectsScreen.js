import React from "react";
import styled from "styled-components";
import Project from "../components/Project";
import { PanResponder, Animated } from "react-native";

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  //*********** */移動效果 *******
  //移動效果 與 第二張堆疊效果

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44)
  };
  //移動
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),
      //反回
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();

        //********可到expo觀看 console.log(positionY); 的變化
        // 判斷是否超出邊界200 是的話執行

        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: this.state.pan.x, y: 1000 }
          }).start();
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();

          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();
        }
      }
    });
  }

  render() {
    return (
      <Container>
        <Animated.View
          style={{
            transform: [
              { translateX: this.state.pan.x },
              { translateY: this.state.pan.y }
            ]
          }}
          {...this._panResponder.panHandlers}
        >
          <Project
            title={projects[0].title}
            image={projects[0].image}
            author={projects[0].author}
            text={projects[0].text}
          />
        </Animated.View>
        {/* ********設定第二張作品在下層 呼應上面的scale */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.scale },
              { translateY: this.state.translateY }
            ]
          }}
        >
          <Project
            title={projects[1].title}
            image={projects[1].image}
            author={projects[1].author}
            text={projects[1].text}
          />
        </Animated.View>
      </Container>
    );
  }
}

export default ProjectsScreen;

const Container = styled.View`
  flex: 1;
  background-color: #231c3f;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

const projects = [
  {
    title: "",
    image: require("../assets/a1.png"),
    author: "",
    text:
      "白色代表服飾的乾淨,整齊，故以此為基底搭配少量的黑色灰色來呈現視覺上的舒適感。"
  },
  {
    title: "",
    image: require("../assets/a2.png"),
    author: "電子商務購物UI",
    text: ""
  },
  {
    title: "",
    image: require("../assets/a3.jpg"),
    author: "電子商務購物UI",
    text: ""
  },
  {
    title: "",
    image: require("../assets/a4.jpg"),
    author: "電子商務購物UI",
    text: ""
  },
  {
    title: "",
    image: require("../assets/a5.jpg"),
    author: "電子商務購物UI",
    text: ""
  },
  {
    title: "",
    image: require("../assets/a6.png"),
    author: "電子商務購物UI",
    text: ""
  },
  {
    title: "",
    image: require("../assets/a7.png"),
    author: "電子商務購物UI",
    text: ""
  },
  {
    title: "",
    image: require("../assets/a8.jpg"),
    author: "電子商務購物UI",
    text: ""
  }
];
