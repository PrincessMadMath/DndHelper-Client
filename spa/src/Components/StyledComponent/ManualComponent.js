import React, { Component } from "react";

import styled from "styled-components";

const Inner = styled.nav.attrs({
    className: "relative pa1 ma1 shadow-5",
})``;

const ManualStyle = styled(Inner)`
    border-style: solid;
    border-color: #8e2f1a;
    border-width: 6px 3px;
    max-width: 45em;
    background-image: url("img/background.jpg");
    box-shadow: 10px 10px 5px #888888;
`;

export default class ManualComponent extends Component {
    render() {
        return <ManualStyle>{this.props.children}</ManualStyle>;
    }
}
