import React, { PureComponent } from "react";
import PropTypes from "prop-types";

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
        };
    }

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

        debugger;

        return (
            <>
                <h3>Encounter Builder</h3>
                {orderedParticipant.map(x => (
                    <div key={x.name}>
                        {x.name} {x.type} {x.initiative}
                    </div>
                ))}
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
