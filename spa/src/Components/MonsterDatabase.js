import React, { useState } from "react";
import { MonsterList } from "./MonsterList";
import SearchBox from "./SubComponents/SearchBox";
import MultiSelect from "./SubComponents/MultiSelect";
import MaskMap from "../utils/MaskMap";
import CrComparator from "../utils/CrComparator";
import { MonsterSelector } from "./MonsterSelector";
import queryString from "query-string";
import styled from "styled-components";

const HideOnSmall = styled.div`
    @media screen and (max-width: 1024px) {
        display: none;
    }
`;

export const MonsterDatabase = ({ monstersDB, history, location }) => {
    const masks = new MaskMap(monstersDB.length);
    const [filteredMonsters, setFilteredMonsters] = useState(monstersDB);
    const [encounterMonsters, setEncounterMonsters] = useState({});

    const createMaskSetter = mask_name => mask => {
        // TODO we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        // import { forceCheck } from "react-lazyload";
        masks.setMask(mask_name, mask);
        setFilteredMonsters(masks.filter(monstersDB));
    };

    const handleAddMonster = monsterName => {
        const newEncounterMonsters = Object.assign(encounterMonsters);

        if (!!newEncounterMonsters[monsterName]) {
            newEncounterMonsters[monsterName] = newEncounterMonsters[monsterName] + 1;
        } else {
            newEncounterMonsters[monsterName] = 1;
        }

        setEncounterMonsters(newEncounterMonsters);
    };

    const handleRemoveMonster = monsterName => {
        const newEncounterMonsters = Object.assign(encounterMonsters);

        if (!!newEncounterMonsters[monsterName]) {
            const newCount = newEncounterMonsters[monsterName] - 1;
            if (newCount === 0) {
                delete newEncounterMonsters[monsterName];
            } else {
                newEncounterMonsters[monsterName] = newCount;
            }
        }

        setEncounterMonsters(newEncounterMonsters);
    };

    const handleGoToEncounter = () => {
        const items = [];

        for (var key in encounterMonsters) {
            items.push(`${encounterMonsters[key]}_${key}`);
        }

        const query = items.join();

        history.push(`/encounter?list=${query}`);
    };

    return (
        <div className="relative">
            <h3>
                Monster Database - {monstersDB.length} results ({filteredMonsters.length} visible)
            </h3>
            <HideOnSmall>
                <MonsterSelector
                    monsters={encounterMonsters}
                    onAddMonster={handleAddMonster}
                    onRemoveMonster={handleRemoveMonster}
                    onGoToEncounter={handleGoToEncounter}
                />
            </HideOnSmall>

            <div className="flex flex-wrap">
                <SearchBox
                    fieldName={"name"}
                    callback={createMaskSetter("name_mask")}
                    initialValue={queryString.parse(location.search).q}
                    items={monstersDB.map(s => s.name)}
                />
                <MultiSelect
                    fieldName="CR"
                    items={monstersDB.map(m => m.challengeRating)}
                    compareFunc={CrComparator}
                    callback={createMaskSetter("cr_mask")}
                />
                <MultiSelect
                    fieldName="SOURCE"
                    items={monstersDB.map(m => m.sources.map(y => y.name))}
                    callback={createMaskSetter("source_mask")}
                />
            </div>
            <MonsterList visibleMonsters={filteredMonsters} onAddMonster={handleAddMonster} />
        </div>
    );
};
