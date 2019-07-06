import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: name =>
      dispatch({
        type: "UPDATE_NAME",
        name: name
      })
  };
}

class Avatar extends React.Component {
  state = {
    photo: "https://i.imgur.com/qIBc18s.jpg"
  };

  //************* */調用照片API uinames **************************
  //************* */調用姓名API 需使用 Reduce uinames**************************
  componentDidMount() {
    // fetch("https://uinames.com/api/?ext&gender=female&region=japan")
    //使用 UIface
    fetch("https://uifaces.co/api?limit=1&random", {
      headers: new Headers({
        "X-API-KEY": "327ce9ea62b00f6c356cae2b959b11"
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({
          photo: response[0].photo
        });

        this.props.updateName(response[0].name);
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`;
