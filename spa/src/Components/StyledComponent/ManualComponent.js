import React, { Component } from "react";

import styled from "styled-components";

const ManualStyle = styled.div`
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
        opacity: 0.07;
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
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0) 74%,
            rgba(255, 255, 255, 0.94) 75%,
            rgba(255, 255, 255, 0.94) 77%,
            rgba(255, 255, 255, 0.3) 78%,
            rgba(255, 255, 255, 1) 81%,
            rgba(255, 255, 255, 0) 97%,
            rgba(255, 255, 255, 0) 100%
        );
        background-size: 500% 100%;
        background-position: 0% 0%;
        opacity: 0.8;
        transition-duration: 0s;
        pointer-events: none;
    }

    &:hover:after {
        /* background-image: linear-gradient(to bottom right,#552f4b,#dc4225); */
        background-position: -120% 0%;
        transition-duration: 0.8s;
        /* transition-duration: 0s; */
    }
`;

export default class ManualComponent extends Component {
    render() {
        return <ManualStyle>{this.props.children}</ManualStyle>;
    }
}
