import React, { useState } from "react";

import { SearchBox } from "./SubComponents/SearchBox";
import { MultiSelect } from "./SubComponents/MultiSelect";
import MaskMap from "../utils/MaskMap";
import queryString from "query-string";
import { SpellList } from "./SpellList";

export const SpellDatabase = ({ spellsDB, location }) => {
    const [filteredSpells, setFilteredSpells] = useState(spellsDB);
    const masks = new MaskMap(spellsDB.length);

    const createMaskSetter = mask_name => mask => {
        // TODO we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        // import { forceCheck } from "react-lazyload";
        masks.setMask(mask_name, mask);
        setFilteredSpells(masks.filter(spellsDB));
    };

    return (
        <div>
            <h3>
                Spell Database - {spellsDB.length} results ({filteredSpells.length} visible)
            </h3>
            <div className="flex flex-wrap">
                <SearchBox
                    fieldName={"name"}
                    initialValue={queryString.parse(location.search).q}
                    callback={createMaskSetter("name_mask")}
                    items={spellsDB.map(s => s.name)}
                />
                <MultiSelect
                    fieldName={"school"}
                    items={spellsDB.map(s => s.school)}
                    callback={createMaskSetter("school_mask")}
                />
                <MultiSelect
                    fieldName={"class"}
                    items={spellsDB.map(s => s.class)}
                    callback={createMaskSetter("class_mask")}
                />
                <MultiSelect
                    fieldName={"range"}
                    items={spellsDB.map(s => s.range)}
                    callback={createMaskSetter("range_mask")}
                />
            </div>
            <SpellList visibleSpells={filteredSpells} />
        </div>
    );
};
