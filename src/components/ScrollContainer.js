import React, { Component } from "react";
import ScrollText from "react-scroll-text";

class ScrollContainer extends Component {
  render() {
    return (
      <div>
        <ScrollText speed={100}>{"testing"}</ScrollText>
      </div>
    );
  }
}

export default ScrollContainer;
