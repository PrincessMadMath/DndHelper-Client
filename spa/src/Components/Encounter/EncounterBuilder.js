import React, { PureComponent } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";
import MonsterAdder from "./MonsterAdder";

export default class EncounterBuilder extends PureComponent {
    static propTypes = {
        queries: PropTypes.string.isRequired,
        monstersDB: PropTypes.array.isRequired,
        onStartEncounter: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        const { queries, monstersDB } = this.props;

        const parsedQueries = queryString.parse(queries);
        const list = parsedQueries.list.split(",");
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
            selectedMonsterOption: null,
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
                width: 200,
                accessor: d => d.monster.name,
            },
            {
                Header: "Count",
                accessor: "count",
                width: 75,
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
                width: 200,
                Cell: cellInfo => this.renderEditable(cellInfo, "players"),
            },
            {
                Header: "initiative",
                accessor: "initiative",
                width: 100,
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

    handleAddMonster = monsterInfo => {
        const { monstersOfEncounter } = this.state;

        let isMonsterInEncounter = false;
        let newMonsters = monstersOfEncounter.map(x => {
            if (x.monster.name === monsterInfo.name) {
                isMonsterInEncounter = true;
                return {
                    ...x,
                    count: x.count + 1,
                };
            }
            return x;
        });

        if (!isMonsterInEncounter) {
            newMonsters = [
                ...newMonsters,
                {
                    count: 1,
                    monster: monsterInfo,
                },
            ];
        }

        this.setState({ monstersOfEncounter: newMonsters });
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
        this.props.onStartEncounter({
            players: this.state.players,
            monstersOfEncounter: this.state.monstersOfEncounter,
        });
    };

    onPrintNewUrl = () => {
        const { monstersOfEncounter } = this.state;

        const items = [];

        monstersOfEncounter.forEach(monster => {
            items.push(`${monster.count}_${monster.monster.name}`);
        });

        const query = items.join();

        const baseUrl =
            window.location.protocol +
            "//" +
            window.location.hostname +
            (window.location.port ? ":" + window.location.port : "");
        const url = `${baseUrl}/encounter?list=${query}`;
        console.log(url);
    };

    render() {
        return (
            <>
                <h3>Encounter Builder</h3>
                <button onClick={this.startEncounter}>Start Encounter</button>

                <div className="flex flex-row flex-wrap">
                    <div className="mh5">
                        <h2>Monsters</h2>
                        {this.renderMonstersTable()}
                        <MonsterAdder onAddMonster={this.handleAddMonster} />
                    </div>
                    <div className="mh5">
                        <h2>Players</h2>
                        {this.renderPlayersTable()}
                        <button onClick={this.handleAddPlayer}>Add player</button>
                    </div>
                    <button onClick={this.onPrintNewUrl}>Print URL in console</button>
                </div>
            </>
        );
    }
}
