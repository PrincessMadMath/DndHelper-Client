import React from "react";
import LazyLoad, { forceCheck } from "react-lazyload";

import Spell from "./Spell";
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

    createMaskSetter = mask_name => mask => {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.masks.setMask(mask_name, mask);
        this.setState(
            (state, props) => ({ filteredSpells: this.masks.filter(props.spellsDB) }),
            forceCheck
        );
    };

    render() {
        const { spellsDB } = this.props;
        const { filteredSpells } = this.state;

        return (
            <div>
                <h3>
                    Spell Database - {spellsDB.length} results ({filteredSpells.length} visible)
                </h3>
                <div className="flex flex-wrap">
                    <SearchBox
                        fieldName={"name"}
		        urlKey="q"
                        callback={this.createMaskSetter("name_mask")}
                        items={spellsDB.map(s => s.name)}
                    />
                    <MultiSelect
                        fieldName={"school"}
			urlKey="s"
                        items={spellsDB.map(s => s.school)}
                        callback={this.createMaskSetter("school_mask")}
                    />
                    <MultiSelect
                        fieldName={"class"}
			urlKey="c"
                        items={spellsDB.map(s => s.class)}
                        callback={this.createMaskSetter("class_mask")}
                    />
                    <MultiSelect
                        fieldName={"range"}
			urlKey="r"
                        items={spellsDB.map(s => s.range)}
                        callback={this.createMaskSetter("range_mask")}
                    />
                    <MultiSelect
                        fieldName={"level"}
			urlKey="l"
                        items={spellsDB.map(s => s.level + "")}
                        callback={this.createMaskSetter("level")}
                    />
                </div>
                {filteredSpells.map((spell, i) => (
                    <LazyLoad key={spell.name} height={113} offset={500} once={true}>
                        <Spell key={i} spell={spell} opened={filteredSpells.length === 1} />
                    </LazyLoad>
                ))}
            </div>
        );
    }
}
