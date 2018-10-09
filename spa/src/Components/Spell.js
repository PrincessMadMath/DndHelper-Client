import React from "react";
import PropTypes from "prop-types";

import SpellComponent from "./SubComponents/SpellComponents";

const showdown = require("showdown");
const converter = new showdown.Converter();

// To support markup in the description (like <br>)
// Todo: find less dangerous alternative
function createMarkup(text) {
    return {
        __html: converter.makeHtml(text),
    };
}

export default class Spell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            opened: props.opened
        };

    }

    static propTypes = {
        spell: PropTypes.shape({
            level: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            castingTime: PropTypes.string.isRequired,
            range: PropTypes.string.isRequired,
            components: PropTypes.object.isRequired,
            duration: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            higherLevel: PropTypes.string,
            class: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        opened: PropTypes.bool
    };

    spellClick = () => {
        this.setState((state) => ({ opened: !state.opened }));
    };

    render() {
        const { spell } = this.props;
        const clazz = this.state.opened ? "spell-opened" : "spell-collapsed";

        return (
            <div className="information-box">
                <div className="spell-header" onClick={this.spellClick}>
                    <div className="spell-title">
                        <h1>{spell.name}</h1>
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
                <div className={"spell-content " + clazz}>
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
                </div>
            </div>
        );
    }
}
