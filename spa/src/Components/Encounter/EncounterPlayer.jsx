import React, { useState } from "react";
import PropTypes from "prop-types";
import { Monster } from "../Monster";
import { MonsterParticipant } from "./MonsterParticipant";
import { PlayerParticipant } from "./PlayerParticipant";
import { Participant } from "./Participant";
import { MonsterAdder } from "./MonsterAdder";

const propTypes = {
    monstersOfEncounter: PropTypes.arrayOf(
        PropTypes.shape({
            monster: PropTypes.object.isRequired,
            count: PropTypes.number.isRequired,
        })
    ).isRequired,
    players: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            initiative: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export const EncounterPlayer = ({ monstersOfEncounter, players }) => {
    const encounterParticipantsInit = buildEncounterParticipant(players, monstersOfEncounter);

    const orderedParticipant = encounterParticipantsInit.sort((a, b) => {
        if (a.initiative < b.initiative) {
            return 1;
        }
        if (a.initiative > b.initiative) {
            return -1;
        }
        return 0;
    });

    const [encounterParticipants, setEncounterParticipants] = useState(orderedParticipant);
    const [moreInfoParticipant, setMoreInfoParticipant] = useState({});

    const renderParticipant = participant => {
        switch (participant.type) {
            case "monster":
                return (
                    <Participant
                        onUpPosition={() => handleUpParticipantPosition(participant)}
                        onDownPosition={() => handleDownParticipantPosition(participant)}
                    >
                        <MonsterParticipant
                            key={participant.name}
                            participant={participant}
                            onMonsterClick={() => handleParticipantClick(participant)}
                            onUpdateMonsterLife={newHP =>
                                handleUpdateMonsterLife(participant.name, newHP)
                            }
                            onKillMonster={() => handleKillMonster(participant.name)}
                        />
                    </Participant>
                );
            case "player":
                return (
                    <Participant
                        onUpPosition={() => handleUpParticipantPosition(participant)}
                        onDownPosition={() => handleDownParticipantPosition(participant)}
                    >
                        <PlayerParticipant
                            key={participant.name}
                            participant={participant}
                            onPlayerClick={() => handleParticipantClick(participant)}
                        />
                    </Participant>
                );

            default:
                return null;
        }
    };

    const handleUpdateMonsterLife = (name, newHP) => {
        const updatedParticipants = encounterParticipants.map(participant => {
            if (name === participant.name) {
                return {
                    ...participant,
                    hp: newHP,
                };
            } else {
                return participant;
            }
        });

        setEncounterParticipants(updatedParticipants);
    };

    const handleKillMonster = name => {
        const updatedParticipants = encounterParticipants.filter(
            participant => name !== participant.name
        );

        setEncounterParticipants(updatedParticipants);
    };

    const handleUpParticipantPosition = participant => {
        const participantIndex = encounterParticipants.findIndex(x => x.name === participant.name);
        if (participantIndex === 0) {
            return;
        }
        const updatedParticipants = [...encounterParticipants];
        const temporary = updatedParticipants[participantIndex - 1];
        updatedParticipants[participantIndex - 1] = participant;
        updatedParticipants[participantIndex] = temporary;
        setEncounterParticipants(updatedParticipants);
    };

    const handleDownParticipantPosition = participant => {
        const participantIndex = encounterParticipants.findIndex(x => x.name === participant.name);
        if (participantIndex === encounterParticipants.length - 1) {
            return;
        }
        const updatedParticipants = [...encounterParticipants];
        const temporary = updatedParticipants[participantIndex + 1];
        updatedParticipants[participantIndex + 1] = participant;
        updatedParticipants[participantIndex] = temporary;
        setEncounterParticipants(updatedParticipants);
    };

    const handleParticipantClick = participant => {
        setMoreInfoParticipant(participant);
    };

    const renderMoreInfo = () => {
        if (moreInfoParticipant.type !== "monster") {
            return null;
        }

        return (
            <div>
                <div>More info</div>
                <Monster monster={moreInfoParticipant.info} opened />
            </div>
        );
    };

    const handleAddMonster = monsterInfo => {
        const newParticipants = [
            ...encounterParticipants,
            {
                name: monsterInfo.name + `- late adding`,
                initiative: 0,
                type: "monster",
                info: monsterInfo,
                hp: monsterInfo.hitPoints,
            },
        ];

        setEncounterParticipants(newParticipants);
    };

    return (
        <>
            <h3>Encounter Player</h3>
            <MonsterAdder onAddMonster={handleAddMonster} />
            <div className="flex flex-row flex- wrap">
                <div>{encounterParticipants.map(x => renderParticipant(x))}</div>
                {renderMoreInfo()}
            </div>
        </>
    );
};

function buildEncounterParticipant(players, monstersOfEncounter) {
    const playersInfo = players.map(player => {
        return {
            name: player.name,
            initiative: parseInt(player.initiative),
            type: "player",
            info: player,
        };
    });

    const monstersInfo = monstersOfEncounter.reduce((previousValue, monsterDetails) => {
        for (let countIndex = 0; countIndex < monsterDetails.count; countIndex++) {
            const { monster: monsterInfo } = monsterDetails;

            const initiativeRoll = Math.floor(Math.random() * 20 + 1);
            const initiativeBonus = modifierCalculator(
                monsterInfo.abilities ? monsterInfo.abilities.dexterity : 0
            );
            const initiative = initiativeRoll + initiativeBonus;

            previousValue.push({
                name: monsterInfo.name + `#${countIndex}`,
                initiative: initiative,
                type: "monster",
                info: monsterInfo,
                hp: monsterInfo.hitPoints,
            });
        }

        return previousValue;
    }, []);

    return [].concat(playersInfo, monstersInfo);
}

// TODO: Put in utils class (+ the one in Abilities)
function modifierCalculator(value) {
    value -= 10;
    return Math.floor(value / 2);
}

EncounterPlayer.propTypes = propTypes;
