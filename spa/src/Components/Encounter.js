import React, { PureComponent } from "react";
import queryString from "query-string";
import Monster from "./Monster";

import styled from "styled-components";

const EncounterComponent = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default class Encounter extends PureComponent {
    render() {
        const { monstersDB, spellsDB } = this.props;

        const queries = queryString.parse(this.props.location.search);
        const list = queries.list.split(",");
        const monstersToDisplay = list.map(name => {
            return monstersDB.find(x => x.name === name);
        });
        debugger;

        return (
            <div>
                <h3>Encounter</h3>
                <EncounterComponent>
                    {monstersToDisplay.map(function(monster) {
                        return <Monster key={monster.name} monster={monster} spells={spellsDB} />;
                    })}
                </EncounterComponent>
            </div>
        );
    }
}
