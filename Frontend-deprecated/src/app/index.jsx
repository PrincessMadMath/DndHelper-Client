/* Utils */
import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

/* Modules */
import Spells from "./spells";
import Monsters from "./monsters";

/* Style and assets */
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>P.A.M</h1>
          <h4>Personal Assistant Minion</h4>
        </div>
        <Tabs onSelect={this.handleMonsterSelect}>
          <TabList>
            <Tab>Spells Database</Tab>
            <Tab>Monsters Database</Tab>
            <Tab>Monsters Showcase</Tab>
          </TabList>
          <TabPanel>
            <Spells.Database />
          </TabPanel>
          <TabPanel>
            <Monsters.Database />
          </TabPanel>
          <TabPanel>
            <Monsters.Showcase />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
