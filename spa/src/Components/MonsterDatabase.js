import React from "react";
import MonsterList from "./MonsterList";
import SearchBox from "./SubComponents/SearchBox";
import MultiSelect from "./SubComponents/MultiSelect";

class MonsterDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            masks: {
                name_mask: new Array(props.monstersDB.length).fill(true),
                cr_mask: new Array(props.monstersDB.length).fill(true)
            },
            encounterMonster: [],
        };
    }

    setMask = (mask, mask_name) => {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.setState({ masks: { ...this.state.masks, [mask_name]: mask } });
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

    filterMonster = (monster, index) => {
        return Object.values(this.state.masks).every(mask => mask[index]);
    };

    render() {
        const { spellsDB, monstersDB } = this.props;

        return (
            <div>
                <h3>Monster Database</h3>
                <button onClick={this.handleGoToEncounter}>Go to encounter</button>
                <SearchBox
                    fieldName={"name"}
                    callback={mask => this.setMask(mask, "name_mask")}
                    items={monstersDB.map(s => s.name)}
                />
                <MultiSelect items={monstersDB.map(m => m.challengeRating)}
                             callback={mask => this.setMask(mask, "cr_mask")} />
                <MonsterList
                    visibleMonsters={monstersDB.filter(this.filterMonster)}
                    spellsDB={spellsDB}
                    onAddMonster={this.handleAddMonster}
                />
            </div>
        );
    }
}

export default MonsterDatabase;
