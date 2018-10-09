import React from "react";
import Spell from "./Spell";
import LazyLoad, { forceCheck } from "react-lazyload";

import SearchBox from "./SubComponents/SearchBox";
import MultiSelect from "./SubComponents/MultiSelect";
import MaskMap from "../utils/MaskMap";

export default class SpellDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.masks = new MaskMap(props.spellsDB.length);
        this.state = {
            filteredSpells: props.spellsDB,
        };
    }

    setMask = (mask_name, mask) => {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.masks.setMask(mask_name, mask);
        this.setState((state, props) => ({ filteredSpells: this.masks.filter(props.spellsDB) }), forceCheck);
    };

    render() {
        const { spellsDB } = this.props;
        const { filteredSpells } = this.state;

        return (
            <div>
                <SearchBox
                    fieldName={"name"}
                    callback={mask => this.setMask("name_mask", mask)}
                    items={spellsDB.map(s => s.name)}
                />
                <MultiSelect
                    items={spellsDB.map(s => s.school)}
                    callback={mask => this.setMask("school_mask", mask)}
                />
                <MultiSelect
                    items={spellsDB.map(s => s.class)}
                    callback={mask => this.setMask("class_mask", mask)}
                />
                <MultiSelect
                    items={spellsDB.map(s => s.range)}
                    callback={mask => this.setMask("range_mask", mask)}
                />
                <h3>
                    Spell Database - {spellsDB.length} results ({filteredSpells.length} visible)
                </h3>
                {filteredSpells.map((spell, i) => (
                    <LazyLoad key={spell.name} height={113} offset={500} once>
                        <Spell key={i} spell={spell} />
                    </LazyLoad>
                ))}
            </div>
        );
    }
}
