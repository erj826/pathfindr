import React, { Component } from "react";
import { render } from "react-dom";
import PathfindrContainer from "./Pathfindr/PathfindrContainer";

class App extends Component {
  render() {
    return <PathfindrContainer />;
  }
}

render(<App />, document.getElementById("app"));
