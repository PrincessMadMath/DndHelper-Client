/* Utils */
import React, { Component } from "react";

import { connect } from "react-redux";

/* Components */
import { MonstersShowcase } from "./components";

import store from "./";

class MonstersShowcaseProvider extends Component {
  render() {
    return (
      <div>
        <MonstersShowcase monsters={this.props.all_monsters} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    all_monsters: state[store.constants.NAME]
  };
};

const MonstersShowcaseConnected = connect(mapStateToProps)(
  MonstersShowcaseProvider
);

export default MonstersShowcaseConnected;
