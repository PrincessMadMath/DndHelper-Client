import React from "react";
import effects, { generateSurgeForLevel } from "./data/effects";

export default class EffectShowcase extends React.Component {
    state = {
        effectByLevel: [...Array(15).keys()].map(i => effects.map(e => generateSurgeForLevel(e, i))),
    };

    render() {
        const { effectByLevel } = this.state;
        return (
            <table>
                <thead>
                <tr>
                    <td> Level </td>
                    {effectByLevel[0].map(e => (
                        <td key={e.name}>
                            {e.name}
                        </td>
                    ))}
                </tr>>
                <tr>
                    <td> Description </td>
                    {effectByLevel[0].map(e => (
                        <td key={e.name}>
                            {e.description}
                        </td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {effectByLevel.map((effects, level) => (
                    <tr key={level}>
                        <td>{level}</td>
                        {effects.map(e => (
                            <td key={e.name}>
                                {e.parameters.map((param, j) => (
                                    <div key={param}>
                                        {param} : {e.paramValues[j]}
                                    </div>
                                ))}
                            </td>
                        ))}
                    </tr>
                ))}

                </tbody>
            </table>
        );
    }
}
