import React from "react";
import styled from "styled-components";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { BlurView } from "expo";
import Success from "./Success";
import Loading from "./Loading";
import { Alert } from "react-native";

class ModalLogin extends React.Component {
  //*******設定email 密碼輸入時發生變化 */
  state = {
    email: "",
    password: "",
    iconEmail: require("../assets/icon-email.png"),
    IconPassword: require("../assets/icon-password.png"),
    isSuccessful: false,
    isLoading: false
  };
  //可到expo確認 信箱與密碼 訊息
  handleLogin = () => {
    console.log(this.state.email, this.state.password);

    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.setState({ isSuccessful: true });
    }, 2000);
  };

  focusEmail = () => {
    this.setState({
      iconEmail: require("../assets/icon-email-animated.gif"),
      IconPassword: require("../assets/icon-password.png")
    });
  };

  focusPassword = () => {
    this.setState({
      iconEmail: require("../assets/icon-email.png"),
      IconPassword: require("../assets/icon-password-animated.gif")
    });
  };

  // *****點擊背景會取消鍵盤
  tapBackground = () => {
    Keyboard.dismiss();
  };

  render() {
    return (
      <Container>
        <TouchableWithoutFeedback onPress={this.tapBackground}>
          <BlurView
            tint="default"
            intensity={100}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
          />
        </TouchableWithoutFeedback>
        <Modal>
          <Logo source={require("../assets/logok.png")} />
          <Text>自由創作，一切隨心所欲</Text>
          {/************ 更改鍵盤上有＠的設計 與密碼不顯示設計 */}
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="信箱"
            keyboardType="email-address"
            onFocus={this.focusEmail}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="密碼"
            secureTextEntry={true}
            onFocus={this.focusPassword}
          />
          <IconEmail source={this.state.iconEmail} />
          <IconPassword source={this.state.IconPassword} />
          <TouchableOpacity onPress={this.handleLogin}>
            <Button>
              <ButtonText>登 入</ButtonText>
            </Button>
          </TouchableOpacity>
        </Modal>
        <Success isActive={this.state.isSuccessful} />
        <Loading isActive={this.state.isLoading} />
      </Container>
    );
  }
}
export default ModalLogin;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`;

const Modal = styled.View`
  width: 300px;
  height: 340px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`;

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #8b97b7;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 250px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 15px;
  padding-left: 44px;
`;

const Button = styled.View`
  background: black;
  width: 250;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 15px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`;
const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 155px;
  left: 40px;
`;

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 210px;
  left: 43px;
`;
