import React, { useState } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";
import { MonsterAdder } from "./MonsterAdder";

const propTypes = {
    queries: PropTypes.string.isRequired,
    monstersDB: PropTypes.array.isRequired,
    onStartEncounter: PropTypes.func.isRequired,
};

export const EncounterBuilder = ({ queries, monstersDB, onStartEncounter }) => {
    let monstersOfEncounterInit = [];

    if (queries) {
        debugger;
        const parsedQueries = queryString.parse(queries);
        const list = parsedQueries.list.split(",");
        monstersOfEncounterInit = list.map(info => {
            const splittedInfo = info.split("_");
            const count = splittedInfo[0];
            const name = splittedInfo[1];

            return {
                count: count,
                monster: monstersDB.find(x => x.name === name),
            };
        });
    }

    const playersInit = JSON.parse(localStorage.getItem("players") || "[]");

    const [monstersOfEncounter, setMonstersOfEncounter] = useState(monstersOfEncounterInit);
    const [players, setPlayers] = useState(playersInit);

    const getTable = source => {
        if (source === "players") {
            return players;
        } else {
            return monstersOfEncounter;
        }
    };

    const setTable = (source, data) => {
        if (source === "players") {
            return setPlayers(data);
        } else {
            return setMonstersOfEncounter(data);
        }
    };

    const renderEditable = (cellInfo, source) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...getTable(source)];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    setTable(source, data);
                }}
                dangerouslySetInnerHTML={{
                    __html: getTable(source)[cellInfo.index][cellInfo.column.id],
                }}
            />
        );
    };

    const renderMonstersTable = () => {
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
                Cell: cellInfo => renderEditable(cellInfo, "monstersOfEncounter"),
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

    const renderPlayersTable = () => {
        const columns = [
            {
                Header: "Name",
                accessor: "name",
                width: 200,
                Cell: cellInfo => renderEditable(cellInfo, "players"),
            },
            {
                Header: "initiative",
                accessor: "initiative",
                width: 100,
                Cell: cellInfo => renderEditable(cellInfo, "players"),
            },
            {
                Header: "Delete",
                accessor: "name",
                Cell: row => (
                    <div>
                        <button onClick={() => handleDeletePlayer(row.index)}>Delete</button>
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

    const handleAddMonster = monsterInfo => {
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

        setMonstersOfEncounter(newMonsters);
    };

    const handleAddPlayer = () => {
        const newPlayers = [...players];
        newPlayers.push({
            name: "New player",
            initiative: 0,
        });

        setPlayers(newPlayers);
    };

    const handleDeletePlayer = index => {
        const newPlayers = [...players];
        newPlayers.splice(index, 1);

        setPlayers(newPlayers);
    };

    const startEncounter = () => {
        localStorage.setItem("players", JSON.stringify(players));
        onStartEncounter({
            players: players,
            monstersOfEncounter: monstersOfEncounter,
        });
    };

    const onPrintNewUrl = () => {
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

    return (
        <>
            <h3>Encounter Builder</h3>
            <button onClick={startEncounter}>Start Encounter</button>

            <div className="flex flex-row flex-wrap">
                <div className="mh5">
                    <h2>Monsters</h2>
                    {renderMonstersTable()}
                    <MonsterAdder onAddMonster={handleAddMonster} />
                </div>
                <div className="mh5">
                    <h2>Players</h2>
                    {renderPlayersTable()}
                    <button onClick={handleAddPlayer}>Add player</button>
                </div>
                <button onClick={onPrintNewUrl}>Print URL in console</button>
            </div>
        </>
    );
};

EncounterBuilder.propTypes = propTypes;
