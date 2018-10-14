import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import DndContainer from "../StyledComponent/DndContainer";
import Monster from "../Monster";

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

        const encountersInfo = buildEncounterObject(props.players, props.monstersOfEncounter);

        this.state = {
            encountersInfo: encountersInfo,
            moreInfoParticipant: {},
        };
    }

    renderParticipant = participant => {
        return (
            <DndContainer
                key={participant.name}
                onClick={() => this.handleParticipantClick(participant)}
            >
                {participant.name} {participant.type} {participant.initiative}
            </DndContainer>
        );
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

    handleParticipantClick = participant => {
        this.setState({ moreInfoParticipant: participant });
    };

    render() {
        const orderedParticipant = this.state.encountersInfo.sort((a, b) => {
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

function buildEncounterObject(players, monstersOfEncounter) {
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
