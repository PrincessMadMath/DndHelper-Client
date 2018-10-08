import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

class Header extends React.Component {
    render() {
        return (
            <Navigation>
                <HomeNavigation>
                    <Link to="/">P.A.M </Link>
                </HomeNavigation>
                <SectionNavigation>
                    <SectionLink>
                        <Link to="/monsters">Monster Database</Link>
                    </SectionLink>
                    <SectionLink>
                        <Link to="/spells">Spell Database</Link>
                    </SectionLink>
                </SectionNavigation>
            </Navigation>
        );
    }
}

const Navigation = styled.nav.attrs({
    className: "bg-black-50",
})``;

const HomeNavigation = styled.nav.attrs({
    className: "f1",
})``;

const SectionNavigation = styled.ul.attrs({
    className: "flex flex-row list f4 ph0",
})``;

const SectionLink = styled.li.attrs({
    className: "mh2",
})``;

export default Header;
