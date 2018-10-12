/* Utils */
import React from "react";
import styled from "styled-components";

const SpellComponent = styled.div`
    /* Center logo inside */
    display: flex;
    align-items: center;
    justify-content: center;

    /* Create circle border */
    border-style: solid;
    border-radius: 38px;
    width: 38px;
    height: 38px;

    opacity: ${props => (props.isRequired ? "1" : "0.05")};
    border-color: ${props => (props.isRequired ? "#0a0" : "#555")};

    &:hover img {
        display: none;
    }

    &:hover span {
        display: inline;
    }
`;

const ComponentImage = styled.img`
    height: 28px;
    display: block;
    margin: auto;
`;

const ComponentAlternative = styled.span`
    display: none;
    font-size: 2em;
    font-weight: bold;
`;

export const SpellComponentIcon = ({ isRequired, icon, alternative }) => {
    return (
        <SpellComponent isRequired={isRequired}>
            <ComponentImage src={icon} alt={alternative} />
            <ComponentAlternative>{alternative[0]}</ComponentAlternative>
        </SpellComponent>
    );
};
