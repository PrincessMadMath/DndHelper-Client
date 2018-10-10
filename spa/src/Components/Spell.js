import React from "react";
import PropTypes from "prop-types";

import SpellComponent from "./SubComponents/SpellComponents";
import DndContainer from "./StyledComponent/DndContainer";
import styled from "styled-components";

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
        opened: PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpened: props.opened,
        };
    }

    spellClick = () => {
        this.setState(state => ({ isOpened: !state.isOpened }));
    };

    render() {
        const { spell } = this.props;
        const { isOpened } = this.state;

        return (
            <DndContainer animated={!isOpened}>
                <div
                    className="flex flex-row justify-between flex-wrap pointer"
                    onClick={this.spellClick}
                >
                    <div className="w6">
                        <div className="f2">{spell.name}</div>
                        <div className="i mb2">
                            <span>{spell.type}</span>
                            <span>{spell.canBeRitual && " (ritual)"} </span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <SpellComponent components={spell.components} />
                        </div>
                    </div>
                </div>
                <SpellInfo isOpened={isOpened}>
                    <div>
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
                </SpellInfo>
            </DndContainer>
        );
    }
}

const SpellInfo = styled.div`
    max-height: ${props => (props.isOpened ? "700px" : "0")};
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
`;
