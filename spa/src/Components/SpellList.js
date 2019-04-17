import React, { Component } from "react";
import PropTypes from "prop-types";
import Spell from "./Spell";
import SmartScroll from "./Utils/SmartScroll";

export default class SpellList extends Component {
    static propTypes = {
        visibleSpells: PropTypes.array.isRequired,
    };

    renderSpellItem = spell => {
        const { visibleSpells } = this.props;

        return <Spell key={spell.name} spell={spell} opened={visibleSpells.length === 1} />;
    };

    render() {
        const { visibleSpells } = this.props;

        return (
            <div>
                <SmartScroll items={visibleSpells} renderItem={this.renderSpellItem} />
            </div>
        );
    }
}
