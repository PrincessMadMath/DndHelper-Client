import React from "react";
import Spell from "./Spell";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";

import SearchBox from "./SubComponents/SearchBox";
import MultiSelect from "./SubComponents/MultiSelect";

class SpellDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            masks: {
                name_mask: new Array(props.spellsDB.length).fill(true),
                school_mask: new Array(props.spellsDB.length).fill(true),
                class_mask: new Array(props.spellsDB.length).fill(true),
                range_mask: new Array(props.spellsDB.length).fill(true),
            },
        };
        this.setMask = this.setMask.bind(this);
        this.filterSpell = this.filterSpell.bind(this);
    }

    setMask(mask, mask_name) {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.setState({ masks: { ...this.state.masks, [mask_name]: mask } }, forceCheck);
    }

    filterSpell(spell, index) {
        return Object.values(this.state.masks).every(mask => mask[index]);
    }

    render() {
        const { spellsDB } = this.props;
        const filteredSpells = spellsDB.filter(this.filterSpell);

        return (
            <div>
                <SearchBox
                    fieldName={"name"}
                    callback={mask => this.setMask(mask, "name_mask")}
                    items={spellsDB.map(s => s.name)}
                />
                <MultiSelect
                    items={spellsDB.map(s => s.school)}
                    callback={mask => this.setMask(mask, "school_mask")}
                />
                <MultiSelect
                    items={spellsDB.map(s => s.class)}
                    callback={mask => this.setMask(mask, "class_mask")}
                />
                <MultiSelect
                    items={spellsDB.map(s => s.range)}
                    callback={mask => this.setMask(mask, "range_mask")}
                />
                <h3>Spell Database - {spellsDB.length} results ({filteredSpells.length} visible)</h3>
                {filteredSpells.map((spell, i) => (
                    <LazyLoad key={spell.name} height={1000} offset={500} once>
                        <Spell key={i} spell={spell} />
                    </LazyLoad>
                ))}
            </div>
        );
    }
}

export default SpellDatabase;
