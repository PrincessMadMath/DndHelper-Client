import React, { Component } from "react";
import PropTypes from "prop-types";
import DndContainer from "../StyledComponent/DndContainer";

export default class PlayerParticipant extends Component {
    static propTypes = {
        participant: PropTypes.shape({
            name: PropTypes.string.isRequired,
            initiative: PropTypes.number.isRequired,
        }),
        onPlayerClick: PropTypes.func.isRequired,
    };

    render() {
        const { name, initiative } = this.props.participant;

        return (
            <DndContainer nClick={this.props.onPlayerClick}>
                <div className="flex flex-row">
                    <div className="flex flex-column">
                        <div>
                            {name} Initiative(
                            {initiative})
                        </div>
                        <div>Player</div>
                    </div>
                </div>
            </DndContainer>
        );
    }
}
