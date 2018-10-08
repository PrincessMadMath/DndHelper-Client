import React from "react";
import MonsterList from "./MonsterList";
import MonsterFilter from "./MonsterFilter";

class MonsterDatabase extends React.Component {
    state = {
        filter: null,
    };

    handleFilterUpdate = filter => {
        console.log({ filter });

        this.setState({ filter: filter });
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
                <MonsterFilter onFilterUpdate={this.handleFilterUpdate} />
                <MonsterList visibleMonsters={visibleMonsters} spellsDB={spellsDB} />
            </div>
        );
    }
}

export default MonsterDatabase;
