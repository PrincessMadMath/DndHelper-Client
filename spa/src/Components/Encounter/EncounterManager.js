import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import EncounterBuilder from "./EncounterBuilder";
import EncounterPlayer from "./EncounterPlayer";

export default class EncounterManager extends PureComponent {
    state = {
        isBuildingEncounter: false,
        encounterDetails: {
            players: [
                { name: "Shane", initiative: "18" },
                { name: "Thask", initiative: "4" },
                { name: "Camaron", initiative: "16" },
                { name: "Luigi", initiative: "8" },
            ],
            monstersOfEncounter: [
                {
                    count: "3",
                    monster: {
                        challengeRating: "1/4",
                        name: "Aarakocra",
                        size: "Medium",
                        type: "Humanoid",
                        alignment: "Neutral Good",
                        armorClass: 12,
                        hitPoints: 13,
                        hitDice: "3d8",
                        speed: " 20 ft., fly 50 ft.",
                        abilities: {
                            strength: 10,
                            dexterity: 14,
                            constitution: 10,
                            intelligence: 11,
                            wisdom: 12,
                            charisma: 11,
                        },
                        saves: [],
                        skills: [{ name: "Perception", modifier: "+5" }],
                        resistances: {
                            damageVulnerabilities: [],
                            damageResistance: [],
                            damageImmunities: [],
                            conditionImmunities: [],
                        },
                        features: [
                            {
                                name: "Dive Attack.",
                                desc:
                                    "If the aarakocra is flying and dives at least 30 ft. straight toward a target and then hits it with a melee weapon attack, the attack deals an extra 3 (1d6) damage to the target.",
                            },
                        ],
                        spellCasting: null,
                        actions: [
                            {
                                name: "Talon.",
                                desc:
                                    "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.",
                            },
                            {
                                name: "Javelin.",
                                desc:
                                    "Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
                            },
                            {
                                name: "Summon Air Elemental.",
                                desc:
                                    "Five aarakocra within 30 feet of each other can magically summon an air elemental. Each of the five must use its action and movement on three consecutive turns to perform an aerial dance and must maintain concentration while doing so (as if concentrating on a spell). When all five have finished their third turn of the dance, the elemental appears in an unoccupied space within 60 feet of them. It is friendly toward them and obeys their spoken commands. It remains for 1 hour, until it or all its summoners die, or until any of its summoners dismisses it as a bonus action. A summoner can't perform the dance again until it finishes a short rest. When the elemental returns to the Elemental Plane of Air, any aarakocra within 5 feet of it can return with it.",
                            },
                        ],
                        legendaryActions: [],
                        senses: "",
                        languages: "Auran, Aarakocra",
                    },
                },
            ],
        },
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
