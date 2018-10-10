import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import monsters from "../data/monsters.json";
import spells from "../data/spells.json";

import Header from "./Header";
import Welcome from "./Welcome";
import MonsterDatabase from "./MonsterDatabase";
import SpellDatabase from "./SpellDatabase";
import MonsterSingle from "./MonsterSingle";
import NotFound from "./NotFound";
import Encounter from "./Encounter";
import { createGlobalStyle } from "styled-components";

// TODO: Refactor to tachyon
const GlobalStyle = createGlobalStyle`
    body {
    margin: 0 auto;
    padding: 0;
    font-family: "Helvetica", "Arial", "sans-serif";
    font-size: 14px;
    line-height: 1.5;
    }
`;

class App extends Component {
    state = {
        monstersDB: monsters,
        spellsDB: spells,
    };

    render() {
        return (
            <div className="App">
                <GlobalStyle />
                <Route path="/" component={Header} />
                <Switch>
                    <Route exact path="/" component={Welcome} />
                    <Route
                        exact
                        path="/monsters"
                        render={props => (
                            <MonsterDatabase
                                monstersDB={this.state.monstersDB}
                                spellsDB={this.state.spellsDB}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/monsters/:monsterId"
                        render={props => (
                            <MonsterSingle
                                monstersDB={this.state.monstersDB}
                                spellsDB={this.state.spellsDB}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path="/encounter"
                        render={props => (
                            <Encounter
                                monstersDB={this.state.monstersDB}
                                spellsDB={this.state.spellsDB}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/spells"
                        render={props => (
                            <SpellDatabase spellsDB={this.state.spellsDB} {...props} />
                        )}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
