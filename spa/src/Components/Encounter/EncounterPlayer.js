import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Monster from "../Monster";
import MonsterParticipant from "./MonsterParticipant";
import PlayerParticipant from "./PlayerParticipant";

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

        this.state = {
            encounterParticipants: encounterParticipants,
            moreInfoParticipant: {},
        };
    }

    renderParticipant = participant => {
        switch (participant.type) {
            case "monster":
                return (
                    <MonsterParticipant
                        key={participant.name}
                        participant={participant}
                        onMonsterClick={() => this.handleParticipantClick(participant)}
                        onUpdateMonsterLife={newHP =>
                            this.handleUpdateMonsterLife(participant.name, newHP)
                        }
                        onKillMonster={() => this.handleKillMonster(participant.name)}
                    />
                );
            case "player":
                return (
                    <PlayerParticipant
                        key={participant.name}
                        participant={participant}
                        onPlayerClick={() => this.handleParticipantClick(participant)}
                    />
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

    render() {
        const orderedParticipant = this.state.encounterParticipants.sort((a, b) => {
            if (a.initiative < b.initiative) {
                return 1;
            }
            if (a.initiative > b.initiative) {
                return -1;
            }
            return 0;
        });

        return (
            <>
                <h3>Encounter Player</h3>
                <div className="flex flex-row flex- wrap">
                    <div>{orderedParticipant.map(x => this.renderParticipant(x))}</div>
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
            const initiativeBonus = modifierCalculator(monsterInfo.abilities.dexterity);
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
