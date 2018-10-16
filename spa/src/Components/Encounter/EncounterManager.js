import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import EncounterBuilder from "./EncounterBuilder";
import EncounterPlayer from "./EncounterPlayer";

export default class EncounterManager extends PureComponent {
    state = {
        isBuildingEncounter: true,
        encounterDetails: {},
    };

    static propTypes = {
        monstersDB: PropTypes.array.isRequired,
    };

    handleStartEncounter = encounterDetails => {
        this.setState({ isBuildingEncounter: false, encounterDetails: encounterDetails });
    };

    renderBuilder = () => {
        return (
            <EncounterBuilder
                queries={this.props.location.search}
                monstersDB={this.props.monstersDB}
                onStartEncounter={this.handleStartEncounter}
            />
        );
    };

    renderPlayer = () => {
        return <EncounterPlayer {...this.state.encounterDetails} />;
    };

    render() {
        const { isBuildingEncounter } = this.state;

        return <div>{isBuildingEncounter ? this.renderBuilder() : this.renderPlayer()}</div>;
    }
}
