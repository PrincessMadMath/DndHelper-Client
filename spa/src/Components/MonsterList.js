import React, { Component } from "react";
import PropTypes from "prop-types";
import LazyLoad, { forceCheck } from "react-lazyload";
import Monster from "./Monster";

export default class MonsterList extends Component {
    static propTypes = {
        visibleMonsters: PropTypes.array.isRequired,
        spellsDB: PropTypes.array.isRequired,
    };

    componentDidUpdate() {
        try {
            forceCheck();
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { visibleMonsters, spellsDB } = this.props;

        return (
            <div>
                {visibleMonsters.map(function(monster) {
                    return (
                        <LazyLoad key={monster.name} height={1000}>
                            <Monster monster={monster} spells={spellsDB} />
                        </LazyLoad>
                    );
                })}
            </div>
        );
    }
}
