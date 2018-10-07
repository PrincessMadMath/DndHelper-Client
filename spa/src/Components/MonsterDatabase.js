import React from "react";
import LazyLoad from "react-lazyload";
import Monster from "./Monster";

class MonsterDatabase extends React.Component {
    render() {
        const { monstersDB, spellsDB } = this.props;

        return (
            <div>
                <h3>Monster Database</h3>
                {monstersDB.map(function(monster) {
                    return (
                        <LazyLoad key={monster.name} height={1000} offset={500}>
                            <Monster monster={monster} spells={spellsDB} />
                        </LazyLoad>
                    );
                })}
            </div>
        );
    }
}

export default MonsterDatabase;
