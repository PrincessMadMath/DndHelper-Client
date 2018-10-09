import React from "react";
import MonsterList from "./MonsterList";
import SearchBox from "./SubComponents/SearchBox";
import MultiSelect from "./SubComponents/MultiSelect";
import MaskMap from "../utils/MaskMap";
import { forceCheck } from "react-lazyload";
import CrComparator from "../utils/CrComparator";

class MonsterDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.masks = new MaskMap(props.monstersDB.length);
        this.state = {
            filteredMonsters: props.monstersDB,
            encounterMonster: [],
        };
    }

    setMask = (mask_name, mask) => {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.masks.setMask(mask_name, mask);
        this.setState((state, props) => ({ filteredMonsters: this.masks.filter(props.monstersDB) }), forceCheck);
    };

    handleAddMonster = monsterName => {
        console.log(monsterName);

        const newEncounterMonster = this.state.encounterMonster;
        newEncounterMonster.push(monsterName);

        this.setState({ encounterMonster: newEncounterMonster });
    };

    handleGoToEncounter = () => {
        console.log(this.state.encounterMonster);
        this.props.history.push(`/encounter/?list=${this.state.encounterMonster.join()}`);
    };

    render() {
        const { spellsDB, monstersDB } = this.props;
        const { filteredMonsters } = this.state;

        return (
            <div>
                <h3>Monster Database</h3>
                <button onClick={this.handleGoToEncounter}>Go to encounter</button>
                <SearchBox
                    fieldName={"name"}
                    callback={mask => this.setMask("name_mask", mask)}
                    items={monstersDB.map(s => s.name)}
                />
                <MultiSelect items={monstersDB.map(m => m.challengeRating)}
                             compareFunc={CrComparator}
                             callback={mask => this.setMask("cr_mask", mask)} />
                <MonsterList
                    visibleMonsters={filteredMonsters}
                    spellsDB={spellsDB}
                    onAddMonster={this.handleAddMonster}
                />
            </div>
        );
    }
}

export default MonsterDatabase;
