import { StyleProvider } from "native-base";
import React, { Component } from "react";

import getTheme from "../theme/components/index";
import variables from "../theme/variables/platform";

export default class StyleWrapper extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        {this.props.children}
      </StyleProvider>
    );
  }
}
