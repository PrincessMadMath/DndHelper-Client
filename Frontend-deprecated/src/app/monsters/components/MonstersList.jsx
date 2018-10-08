/* Utils */
import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyLoad, { forceCheck } from "react-lazyload";

/* Components */
import MonsterInfo from "./MonsterInfo";

/* Style */
import "../../common/style/List.css";

class MonstersList extends Component {
  componentDidUpdate() {
    forceCheck();
  }

  render() {
    return (
      <div className="list">
        {this.props.monstersToRender.map(function(value) {
          return (
            <LazyLoad key={value.name} height={1000} offset={500}>
              <MonsterInfo monsterToRender={value} />
            </LazyLoad>
          );
        })}
      </div>
    );
  }
}

MonstersList.propType = {
  monstersToRender: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MonstersList;
