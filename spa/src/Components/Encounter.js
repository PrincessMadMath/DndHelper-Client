import React, { PureComponent } from "react";
import queryString from "query-string";
import Monster from "./Monster";

import styled from "styled-components";

import ReactTable from "react-table";
import "react-table/react-table.css";

const EncounterComponent = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

export default class Encounter extends PureComponent {
    constructor(props) {
        super(props);

        const { monstersDB } = this.props;

        const queries = queryString.parse(this.props.location.search);
        const list = queries.list.split(",");
        const monstersOfEncounter = list.map(info => {
            const splittedInfo = info.split("_");
            const count = splittedInfo[0];
            const name = splittedInfo[1];

            return {
                count: count,
                monster: monstersDB.find(x => x.name === name),
            };
        });

        const players = JSON.parse(localStorage.getItem("players") || "[]");

        this.state = {
            monstersOfEncounter: monstersOfEncounter,
            players: players,
        };
    }

    renderEditable = (cellInfo, source) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state[source]];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({ [source]: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state[source][cellInfo.index][cellInfo.column.id],
                }}
            />
        );
    };

    renderMonstersTable = () => {
        const { monstersOfEncounter } = this.state;

        const columns = [
            {
                id: "monsterName",
                Header: "Monster",
                accessor: d => d.monster.name,
            },
            {
                Header: "Count",
                accessor: "count",
                Cell: cellInfo => this.renderEditable(cellInfo, "monstersOfEncounter"),
            },
        ];

        return (
            <ReactTable
                data={monstersOfEncounter}
                columns={columns}
                pageSize={monstersOfEncounter.length}
                showPagination={false}
                className="-striped -highlight"
            />
        );
    };

    renderPlayersTable = () => {
        const { players } = this.state;

        const columns = [
            {
                Header: "Name",
                accessor: "name",
                Cell: cellInfo => this.renderEditable(cellInfo, "players"),
            },
            {
                Header: "initiative",
                accessor: "initiative",
                Cell: cellInfo => this.renderEditable(cellInfo, "players"),
            },
            {
                Header: "Delete",
                accessor: "name",
                Cell: row => (
                    <div>
                        <button onClick={() => this.handleDeletePlayer(row.index)}>Delete</button>
                    </div>
                ),
            },
        ];

        return (
            <ReactTable
                data={players}
                columns={columns}
                pageSize={players.length}
                showPagination={false}
                className="-striped -highlight"
            />
        );
    };

    handleAddPlayer = () => {
        const { players } = this.state;
        const newPlayers = [...players];
        newPlayers.push({
            name: "New player",
            initiative: 0,
        });

        this.setState({ players: newPlayers });
    };

    handleDeletePlayer = index => {
        const { players } = this.state;
        const newPlayers = [...players];
        newPlayers.splice(index, 1);

        this.setState({ players: newPlayers });
    };

    startEncounter = () => {
        localStorage.setItem("players", JSON.stringify(this.state.players));
        console.log("FIGHT!");
    };

    render() {
        const { monstersOfEncounter, players } = this.state;

        return (
            <div>
                <h3>Encounter</h3>
                {this.renderMonstersTable()}
                <button onClick={this.handleAddPlayer}>Add player</button>
                {this.renderPlayersTable()}
                <button onClick={this.startEncounter}>Start Encounter</button>
                {/* <EncounterComponent>
                    {monstersOfEncounter.map(function(encounterInfo) {
                        return (
                            <div key={encounterInfo.monster.name}>
                                {encounterInfo.count}x{encounterInfo.monster.name}
                            </div>
                        );
                    })}
                </EncounterComponent> */}
            </div>
        );
    }
}
