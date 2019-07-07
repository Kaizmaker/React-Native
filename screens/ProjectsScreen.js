import React from "react";
import styled from "styled-components";
import Project from "../components/Project";
import { PanResponder, Animated } from "react-native";

//******作品不會出錯的條件方法******
function getNextIndex(index) {
  var nextIndex = index + 1;
  if (nextIndex > projects.length - 1) {
    return 0;
  }
  return index + 1;
}

class ProjectsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  //*********** */移動效果 *******
  //移動效果 與 第二張堆疊效果 與第三

  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(0.9),
    translateY: new Animated.Value(44),
    thirdScale: new Animated.Value(0.8),
    thirdTranslateY: new Animated.Value(-50),
    index: 0
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      //發放Grant
      onPanResponderGrant: () => {
        Animated.spring(this.state.scale, { toValue: 1 }).start();
        Animated.spring(this.state.translateY, { toValue: 0 }).start();

        //第三張 效果設定
        Animated.spring(this.state.thirdScale, { toValue: 0.9 }).start();
        Animated.spring(this.state.thirdTranslateY, { toValue: 44 }).start();
      },

      //移動Move
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y }
      ]),

      //重置Release
      onPanResponderRelease: () => {
        const positionY = this.state.pan.y.__getValue();

        //********可到expo觀看 console.log(positionY); 的變化
        // 判斷是否超出邊界200 是的話執行
        //********設定可重複循環的方式 */
        if (positionY > 200) {
          Animated.timing(this.state.pan, {
            toValue: { x: 0, y: 1000 }
          }).start(() => {
            this.state.pan.setValue({ x: 0, y: 0 });
            this.state.scale.setValue(0.9);
            this.state.translateY.setValue(44);
            this.state.thirdScale.setValue(0.8);
            this.state.thirdTranslateY.setValue(-50);
            this.setState({ index: getNextIndex(this.state.index) });
          });
        } else {
          Animated.spring(this.state.pan, {
            toValue: { x: 0, y: 0 }
          }).start();

          Animated.spring(this.state.scale, { toValue: 0.9 }).start();
          Animated.spring(this.state.translateY, { toValue: 44 }).start();

          //第三張 效果設定
          Animated.spring(this.state.thirdScale, { toValue: 0.8 }).start();
          Animated.spring(this.state.thirdTranslateY, { toValue: -50 }).start();
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
            title={projects[this.state.index].title}
            image={projects[this.state.index].image}
            author={projects[this.state.index].author}
            text={projects[this.state.index].text}
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
            title={projects[getNextIndex(this.state.index)].title}
            image={projects[getNextIndex(this.state.index)].image}
            author={projects[getNextIndex(this.state.index)].author}
            text={projects[getNextIndex(this.state.index)].text}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -3,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              { scale: this.state.thirdScale },
              { translateY: this.state.thirdTranslateY }
            ]
          }}
        >
          <Project
            title={projects[getNextIndex(this.state.index + 1)].title}
            image={projects[getNextIndex(this.state.index + 1)].image}
            author={projects[getNextIndex(this.state.index + 1)].author}
            text={projects[getNextIndex(this.state.index + 1)].text}
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
    author: "",
    text: "大膽放肆的聽音樂，我享我樂。黑色創作體驗個人且深沉的空間感"
  },
  {
    title: "",
    image: require("../assets/a3.jpg"),
    author: "",
    text: "黑暗風格儀表板，個性化的設計，讓人喜愛"
  },
  {
    title: "",
    image: require("../assets/a4.jpg"),
    author: "",
    text: "女性網站登入頁面，用色大膽，白色相間"
  },
  {
    title: "",
    image: require("../assets/a5.jpg"),
    author: "",
    text: "Jazz Logo APP設計，黑與白代表簡單無限，就像Jazz本身"
  },
  {
    title: "",
    image: require("../assets/a6.png"),
    author: "",
    text: "一卡在手，希望無窮，明亮的設計感受，青綠色代表著科技創造出不同的感受"
  },
  {
    title: "",
    image: require("../assets/a7.png"),
    author: "",
    text: "網站404設計，底部為網站本身的首頁頁面"
  },
  {
    title: "",
    image: require("../assets/a8.jpg"),
    author: "",
    text:
      "我的2019形象設計，如同2019年在大選前夕等待黎明的黑暗，但總看見那份希望"
  }
];
