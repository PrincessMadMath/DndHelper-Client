import React from "react";
import PropTypes from "prop-types";
import Monster from "./Monster";

class MonsterSingle extends React.Component {
    static propTypes = {
        monsters: PropTypes.array.isRequired
    };

    render() {
        const { monstersDB } = this.props;
        const monsterId = this.props.match.params.monsterId;

        const monster = monstersDB.find(x => x.name === monsterId);

        return (
            <div>
                <Monster monster={monster} />
            </div>
        );
    }
}
export default MonsterSingle;
