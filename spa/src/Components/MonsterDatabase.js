import React from "react";
import MonsterList from "./MonsterList";
import MonsterFilter from "./MonsterFilter";

class MonsterDatabase extends React.Component {
    state = {
        filter: null,
        encounterMonster: [],
    };

    handleFilterUpdate = filter => {
        this.setState({ filter: filter });
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

    selectVisibleMonster = () => {
        const { monstersDB } = this.props;
        const { filter } = this.state;

        if (!!!filter) {
            return monstersDB;
        }

        const visibleMonsters = monstersDB.filter(monster => {
            const nameFilter = filter.name;
            return monster.name.toLowerCase().includes(nameFilter.toLowerCase());
        });

        return visibleMonsters;
    };

    render() {
        const { spellsDB } = this.props;

        const visibleMonsters = this.selectVisibleMonster();

        return (
            <div>
                <h3>Monster Database</h3>
                <button onClick={this.handleGoToEncounter}>Go to encounter</button>
                <MonsterFilter onFilterUpdate={this.handleFilterUpdate} />
                <MonsterList
                    visibleMonsters={visibleMonsters}
                    spellsDB={spellsDB}
                    onAddMonster={this.handleAddMonster}
                />
            </div>
        );
    }
}

export default MonsterDatabase;
