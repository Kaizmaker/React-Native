//Reduce應用回傳設定

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import AppNavigator from "./navigator/AppNavigator";

//******引入 Apollo 並設定contentful****/
// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";

// const client = new ApolloClient({
//   uri: "https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx/",
//   credentials: "same-origin",
//   headers: {
//     Authorization: `Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840`
//   }
// });

//*****---------------------------------------------**************
//彈出 與 關閉的條件判斷式 接收Menu.js呼叫action 來自Redux數據
//不要馬上顯示openMenu 所以 action: ""
const initialState = {
  // action: "openMenu"
  action: "",
  name: ""
};

//首先隱藏 然後設計啟動條件
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return { action: "openMenu" };
    case "CLOSE_MENU":
      return { action: "closeMenu" };
    case "UPDATE_NAME":
      return { name: action.name };
    default:
      return state;
  }
  //一樣的條件式判斷
  // if (action.type == "CLOSE_MENU") {
  //   return { action: "closeMenu" };
  // } else if (action.type == "OPEN_MENU") {
  //   return { action: "openMenu" };
  // }

  // return state;
};

const store = createStore(reducer);

//傳到 Provider儲存reduce 封裝
//******與Apollo 封裝 */
const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
  // </ApolloProvider>
);

export default App;
