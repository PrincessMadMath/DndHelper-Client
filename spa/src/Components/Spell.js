import React from "react";
import PropTypes from "prop-types";

import SpellComponent from "./SubComponents/SpellComponents";
import ManualComponent from "./StyledComponent/ManualComponent";

const showdown = require("showdown");
const converter = new showdown.Converter();

// To support markup in the description (like <br>)
// Todo: find less dangerous alternative
function createMarkup(text) {
    return {
        __html: converter.makeHtml(text),
    };
}

const Spell = ({ spell }) => {
    return (
        <ManualComponent>
            <div>
                <div>
                    <div>
                        <h1 className="spell-title">{spell.name}</h1>
                        <div className="spell-type">
                            <span>{spell.type}</span>
                            <span>{spell.canBeRitual && " (ritual)"} </span>
                        </div>
                    </div>
                    <div>
                        <div className="spell-components">
                            <SpellComponent components={spell.components} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="spell-quick-info">
                <p>
                    <b>Range: </b>
                    {spell.range}
                    <br />
                    <b>Duration: </b>
                    {spell.duration}
                    <br />
                    <b>Casting time: </b>
                    {spell.castingTime}
                    <br />
                </p>
            </div>
            <p dangerouslySetInnerHTML={createMarkup(spell.description)} />
            {spell.higherLevel && (
                <p>
                    <b>At higher level. </b>
                    {spell.higherLevel}
                </p>
            )}
            <p>
                <b>Class:</b> {spell.class.join(", ")}
            </p>
        </ManualComponent>
    );
};

Spell.propType = {
    spell: PropTypes.shape({
        level: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        castingTime: PropTypes.string.isRequired,
        range: PropTypes.string.isRequired,
        components: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        higherLevel: PropTypes.string.isRequired,
        class: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default Spell;
