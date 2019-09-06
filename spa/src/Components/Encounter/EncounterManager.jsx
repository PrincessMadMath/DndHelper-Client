import React, { useState } from "react";
import PropTypes from "prop-types";
import { EncounterBuilder } from "./EncounterBuilder";
import { EncounterPlayer } from "./EncounterPlayer";

const propTypes = {
    monstersDB: PropTypes.array.isRequired,
};

export const EncounterManager = ({ monstersDB, location }) => {
    const [isBuildingEncounter, setIsBuildingEncounter] = useState(true);
    const [encounterDetails, setEncounterDetails] = useState({});

    const handleStartEncounter = encounterDetails => {
        setIsBuildingEncounter(false);
        setEncounterDetails(encounterDetails);
    };

    const renderBuilder = () => {
        return (
            <EncounterBuilder
                queries={location.search}
                monstersDB={monstersDB}
                onStartEncounter={handleStartEncounter}
            />
        );
    };

    const renderPlayer = () => {
        return <EncounterPlayer {...encounterDetails} />;
    };

    return <div>{isBuildingEncounter ? renderBuilder() : renderPlayer()}</div>;
};

EncounterManager.propTypes = propTypes;
