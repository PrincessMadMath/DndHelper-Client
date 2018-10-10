import React, { Component } from "react";

import styled from "styled-components";

const DndContainer = styled.div`
    position: relative;
    border-style: solid;
    border-color: #8e2f1a;
    border-width: 3px 3px;
    padding: 1em;
    margin: 1em;
    max-width: 45em;
    background-color: #eee5ce;
    background-image: url("img/background.jpg");
    box-shadow: 6px 5px 9px -1px rgba(128, 131, 133, 0.4);
    transition-duration: 0.25s;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to bottom right, firebrick 0%, darkolivegreen 100%);
        opacity: 0.1;
        pointer-events: none;
    }

    &:after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0) 71%,
            rgba(255, 255, 255, 1) 72%,
            rgba(255, 255, 255, 1) 80%,
            rgba(255, 255, 255, 0) 81%
        );
        background-size: 450% 350%;
        background-position: -13% 0%;
        opacity: 0.4;
        pointer-events: none;
    }

    &:hover:after {
        background-position: -190% 0%;
        transition-duration: 1.2s;
        transition-timing-function: ease-out;
        opacity: 0;
    }
`;

export default class DndStyledContainer extends Component {
    render() {
        return <DndContainer>{this.props.children}</DndContainer>;
    }
}
