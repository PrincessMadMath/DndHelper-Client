import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Monster from "../Monster";
import MonsterParticipant from "./MonsterParticipant";
import PlayerParticipant from "./PlayerParticipant";
import Participant from "./Participant";
import MonsterAdder from "./MonsterAdder";

export default class EncounterPlayer extends PureComponent {
    static propTypes = {
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

    constructor(props) {
        super(props);

        const encounterParticipants = buildEncounterParticipant(
            props.players,
            props.monstersOfEncounter
        );

        const orderedParticipant = encounterParticipants.sort((a, b) => {
            if (a.initiative < b.initiative) {
                return 1;
            }
            if (a.initiative > b.initiative) {
                return -1;
            }
            return 0;
        });

        this.state = {
            encounterParticipants: orderedParticipant,
            moreInfoParticipant: {},
        };
    }

    renderParticipant = participant => {
        switch (participant.type) {
            case "monster":
                return (
                    <Participant
                        onUpPosition={() => this.handleUpParticipantPosition(participant)}
                        onDownPosition={() => this.handleDownParticipantPosition(participant)}
                    >
                        <MonsterParticipant
                            key={participant.name}
                            participant={participant}
                            onMonsterClick={() => this.handleParticipantClick(participant)}
                            onUpdateMonsterLife={newHP =>
                                this.handleUpdateMonsterLife(participant.name, newHP)
                            }
                            onKillMonster={() => this.handleKillMonster(participant.name)}
                        />
                    </Participant>
                );
            case "player":
                return (
                    <Participant
                        onUpPosition={() => this.handleUpParticipantPosition(participant)}
                        onDownPosition={() => this.handleDownParticipantPosition(participant)}
                    >
                        <PlayerParticipant
                            key={participant.name}
                            participant={participant}
                            onPlayerClick={() => this.handleParticipantClick(participant)}
                        />
                    </Participant>
                );

            default:
                return null;
        }
    };

    handleUpdateMonsterLife = (name, newHP) => {
        const updatedParticipants = this.state.encounterParticipants.map(participant => {
            if (name === participant.name) {
                return {
                    ...participant,
                    hp: newHP,
                };
            } else {
                return participant;
            }
        });

        this.setState({ encounterParticipants: updatedParticipants });
    };

    handleKillMonster = name => {
        const updatedParticipants = this.state.encounterParticipants.filter(
            participant => name !== participant.name
        );

        this.setState({ encounterParticipants: updatedParticipants });
    };

    handleUpParticipantPosition = participant => {
        const participantIndex = this.state.encounterParticipants.findIndex(
            x => x.name === participant.name
        );
        if (participantIndex === 0) {
            return;
        }
        const updatedParticipants = [...this.state.encounterParticipants];
        const temporary = updatedParticipants[participantIndex - 1];
        updatedParticipants[participantIndex - 1] = participant;
        updatedParticipants[participantIndex] = temporary;
        this.setState({ encounterParticipants: updatedParticipants });
    };

    handleDownParticipantPosition = participant => {
        const participantIndex = this.state.encounterParticipants.findIndex(
            x => x.name === participant.name
        );
        if (participantIndex === this.state.encounterParticipants.length - 1) {
            return;
        }
        const updatedParticipants = [...this.state.encounterParticipants];
        const temporary = updatedParticipants[participantIndex + 1];
        updatedParticipants[participantIndex + 1] = participant;
        updatedParticipants[participantIndex] = temporary;
        this.setState({ encounterParticipants: updatedParticipants });
    };

    handleParticipantClick = participant => {
        this.setState({ moreInfoParticipant: participant });
    };

    renderMoreInfo = () => {
        const { moreInfoParticipant } = this.state;

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

    handleAddMonster = monsterInfo => {
        const { encounterParticipants } = this.state;

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

        this.setState({ encounterParticipants: newParticipants });
    };

    render() {
        return (
            <>
                <h3>Encounter Player</h3>
                <MonsterAdder onAddMonster={this.handleAddMonster} />
                <div className="flex flex-row flex- wrap">
                    <div>
                        {this.state.encounterParticipants.map(x => this.renderParticipant(x))}
                    </div>
                    {this.renderMoreInfo()}
                </div>
            </>
        );
    }
}

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
