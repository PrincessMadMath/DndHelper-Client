import React from "react";
import MonsterList from "./MonsterList";
import SearchBox from "./SubComponents/SearchBox";
import MultiSelect from "./SubComponents/MultiSelect";
import MaskMap from "../utils/MaskMap";
import { forceCheck } from "react-lazyload";
import CrComparator from "../utils/CrComparator";
import MonsterSelector from "./MonsterSelector";

class MonsterDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.masks = new MaskMap(props.monstersDB.length);
        this.state = {
            filteredMonsters: props.monstersDB,
            encounterMonsters: {},
        };
    }

    setMask = (mask_name, mask) => {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.masks.setMask(mask_name, mask);
        this.setState(
            (state, props) => ({ filteredMonsters: this.masks.filter(props.monstersDB) }),
            forceCheck
        );
    };

    handleAddMonster = monsterName => {
        const { encounterMonsters } = this.state;

        const newEncounterMonsters = Object.assign(encounterMonsters);

        if (!!newEncounterMonsters[monsterName]) {
            newEncounterMonsters[monsterName] = newEncounterMonsters[monsterName] + 1;
        } else {
            newEncounterMonsters[monsterName] = 1;
        }

        this.setState({ encounterMonsters: newEncounterMonsters });
    };

    handleRemoveMonster = monsterName => {
        const { encounterMonsters } = this.state;

        const newEncounterMonsters = Object.assign(encounterMonsters);

        if (!!newEncounterMonsters[monsterName]) {
            const newCount = newEncounterMonsters[monsterName] - 1;
            if (newCount === 0) {
                delete newEncounterMonsters[monsterName];
            } else {
                newEncounterMonsters[monsterName] = newCount;
            }
        }

        this.setState({ encounterMonster: newEncounterMonsters });
    };

    handleGoToEncounter = () => {
        const { encounterMonsters } = this.state;

        const items = [];

        for (var key in encounterMonsters) {
            items.push(`${key}#${encounterMonsters[key]}`);
        }

        const query = items.join();
        console.log({ query });

        this.props.history.push(`/encounter/?list=${query}`);
    };

    render() {
        const { monstersDB } = this.props;
        const { filteredMonsters, encounterMonsters } = this.state;

        return (
            <div className="relative">
                <h3>Monster Database</h3>
                <MonsterSelector
                    monsters={encounterMonsters}
                    onAddMonster={this.handleAddMonster}
                    onRemoveMonster={this.handleRemoveMonster}
                    onGoToEncounter={this.handleGoToEncounter}
                />

                <SearchBox
                    fieldName={"name"}
                    callback={mask => this.setMask("name_mask", mask)}
                    items={monstersDB.map(s => s.name)}
                />
                <MultiSelect
                    items={monstersDB.map(m => m.challengeRating)}
                    compareFunc={CrComparator}
                    callback={mask => this.setMask("cr_mask", mask)}
                />
                <MonsterList
                    visibleMonsters={filteredMonsters}
                    onAddMonster={this.handleAddMonster}
                />
            </div>
        );
    }
}

export default MonsterDatabase;
