import React, { Component, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import Modal from "react-modal";

import monsters from "../data/monsters.json";
import spells from "../data/spells.json";

import Header from "./Header";
import Welcome from "./Welcome";
import MonsterDatabase from "./MonsterDatabase";
import SpellDatabase from "./SpellDatabase";
import MonsterSingle from "./MonsterSingle";
import NotFound from "./NotFound";
import { createGlobalStyle } from "styled-components";
import EncounterManager from "./Encounter/EncounterManager";
import DatabaseUploader from "./DatabaseUploader";

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

export const DBContext = createContext({
    monstersDB: monsters,
    spellsDB: spells,
});

// See http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement("#root");

class App extends Component {
    state = {
        monsters: monsters.map(x => ({
            source: "official",
            ...x
        })),
    };

    handleUploadMonster = newMonsters => {
        const updatedMonsterse = [...this.state.monsters, ...newMonsters];
        this.setState({
            monsters: updatedMonsterse,
        });
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
                        render={props => <MonsterDatabase monstersDB={this.state.monsters} {...props} />}
                    />
                    <Route
                        path="/monsters/:monsterId"
                        render={props => <MonsterSingle monstersDB={this.state.monsters} {...props} />}
                    />
                    <Route
                        path="/encounter"
                        render={props => <EncounterManager monstersDB={this.state.monsters} {...props} />}
                    />
                    <Route
                        exact
                        path="/spells"
                        render={props => <SpellDatabase {...props} spellsDB={spells} />}
                    />
                    <Route
                        exact
                        path="/uploader"
                        render={props => (
                            <DatabaseUploader onUploadMonsters={this.handleUploadMonster} />
                        )}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}

export default App;
