import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
    return (
        <NavigationHeader>
            <HomeNavigation as={Link} to="/">
                P.A.M
            </HomeNavigation>
            <SectionNavigation>
                <SectionLink as={Link} to="/monsters">
                    Monster Database
                </SectionLink>
                <SectionLink as={Link} to="/spells">
                    Spell Database
                </SectionLink>
                <SectionLink as={Link} to="/encounter">
                    Encounter Builder
                </SectionLink>
                <SectionLink as={Link} to="/uploader">
                    Uploader
                </SectionLink>
            </SectionNavigation>
        </NavigationHeader>
    );
};

const NavigationHeader = styled.nav.attrs({
    className: "bg-black-50",
})``;

const HomeNavigation = styled.nav.attrs({
    className: "f1 link",
})``;

const SectionNavigation = styled.ul.attrs({
    className: "flex flex-row list f4 ph0",
})``;

const SectionLink = styled.li.attrs({
    className: "mh2 link",
})``;
