import React from "react";
import Spell from "./Spell";
import LazyLoad from "react-lazyload";

class SpellDatabase extends React.Component {
    render() {
        const { spellsDB } = this.props;

        return (
            <div>
                <h3>Spell Database</h3>
                {spellsDB.map(function(spell, i) {
                    return (
                        <LazyLoad key={spell.name} height={1000} offset={500}>
                            <Spell key={i} spell={spell} />
                        </LazyLoad>
                    );
                })}
            </div>
        );
    }
}
export default SpellDatabase;
