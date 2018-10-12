import React from "react";
import MonsterList from "./MonsterList";
import SearchBox from "./SubComponents/SearchBox";
import MultiSelect from "./SubComponents/MultiSelect";
import MaskMap from "../utils/MaskMap";
import { forceCheck } from "react-lazyload";
import CrComparator from "../utils/CrComparator";
import MonsterSelector from "./MonsterSelector";
import queryString from "query-string";

class MonsterDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.masks = new MaskMap(props.monstersDB.length);
        this.state = {
            filteredMonsters: props.monstersDB,
            encounterMonsters: {},
        };
    }

    createMaskSetter = mask_name => mask => {
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
                <h3>Monster Database -  {monstersDB.length} results ({filteredMonsters.length} visible)</h3>
                <MonsterSelector
                    monsters={encounterMonsters}
                    onAddMonster={this.handleAddMonster}
                    onRemoveMonster={this.handleRemoveMonster}
                    onGoToEncounter={this.handleGoToEncounter}
                />

                <div className="flex flex-wrap">
                    <SearchBox
                        fieldName={"name"}
                        callback={this.createMaskSetter("name_mask")}
                        initialValue={ queryString.parse(this.props.location.search).q}
                        items={monstersDB.map(s => s.name)}
                    />
                    <MultiSelect
                        fieldName="CR"
                        items={monstersDB.map(m => m.challengeRating)}
                        compareFunc={CrComparator}
                        callback={this.createMaskSetter("cr_mask")}
                    />
                </div>
                <MonsterList
                    visibleMonsters={filteredMonsters}
                    onAddMonster={this.handleAddMonster}
                />
            </div>
        );
    }
}

export default MonsterDatabase;
