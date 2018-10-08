import React from "react";
import Spell from "./Spell";
import LazyLoad from "react-lazyload";
import { forceCheck } from "react-lazyload";

import SearchBox from "./SubComponents/SearchBox";

class SpellDatabase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { name_mask: new Array(props.spellsDB.length).fill(true) };
        this.searchCallback = this.searchCallback.bind(this);
    }

    searchCallback(mask) {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.setState({ name_mask: mask }, forceCheck);
    }

    render() {
        const { spellsDB } = this.props;

        return (
            <div>
                <SearchBox
                    fieldName={"name"}
                    callback={this.searchCallback}
                    items={spellsDB.map(s => s.name)}
                />
                <h3>Spell Database</h3>
                {spellsDB.filter((_, i) => this.state.name_mask[i]).map((spell, i) => (
                    <LazyLoad key={spell.name} height={1000} offset={500} once>
                        <Spell key={i} spell={spell} />
                    </LazyLoad>
                ))}
            </div>
        );
    }
}
export default SpellDatabase;
