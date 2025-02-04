import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SpellComponent from "./SubComponents/SpellComponents";
import { DndContainer } from "./StyledComponent/DndContainer";
import styled from "styled-components";

const showdown = require("showdown");
const converter = new showdown.Converter({ tables: true });

// To support markup in the description (like <br>)
// Todo: find less dangerous alternative
function createMarkup(text) {
    return {
        __html: converter.makeHtml(text),
    };
}

const propTypes = {
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

export const Spell = ({ spell, opened }) => {
    const [isOpened, setIsOpened] = useState(opened);

    useEffect(() => {
        setIsOpened(opened);
    }, [opened]);

    const spellClick = () => {
        setIsOpened(o => !o);
        // Todo: add timeout to force check lazy loaded when collapsing spells
    };

    return (
        <DndContainer animated={!isOpened}>
            <div className="flex flex-row justify-between flex-wrap pointer" onClick={spellClick}>
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
            {isOpened && (
                <SpellInfo>
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
            )}
        </DndContainer>
    );
};

Spell.propTypes = propTypes;

const SpellInfo = styled.div`
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;

    & table {
        max-width: 100%;
        border-collapse: collapse;
        border: 0;
        min-width: 11rem;
    }

    & table tbody td {
        padding: 0.1em 1.5em;
    }

    & table tbody td {
        text-align: left;
    }

    & table tbody tr:nth-child(odd) {
        background: #e0e5c1;
    }

    & tabletr td:first-child {
        text-align: center;
    }
`;
