import React from "react";
import effects, { generateSurge, niceness } from "./data/effects";
import MultiSelect from "../SubComponents/MultiSelect";
import DndContainer from "../StyledComponent/DndContainer";
import { randomInList } from "../../utils/utils";

export default class EffectShowcase extends React.Component {
    state = {
        effects: [],
        levels: [...Array(15).keys()],
        niceness: [...Object.values(niceness)],
    };

    stateFieldSetter = field => value => {
        this.setState(state => ({
            ...state,
            [field]: value,
        }));
    };

    createSurgeByEffectByLevel = () =>
        this.state.levels.map(i => {
            return this.state.effects.map(effectName => {
                return generateSurge(effects.find(e => e.name === effectName), {
                    level: i,
                    niceness: randomInList(this.state.niceness),
                });
            });
        });

    shuffle = () => {
        this.setState({ ...this.state });
    };

    render() {
        const surgeByEffectByLevel = this.createSurgeByEffectByLevel();
        return (
            <div>
                <MultiSelect
                    items={effects.map(e => e.name)}
                    fieldName="effects"
                    nomasks={true}
                    callback={this.stateFieldSetter("effects")}
                />
                <MultiSelect
                    items={[...Array(15).keys()]}
                    fieldName="levels"
                    nomasks={true}
                    callback={this.stateFieldSetter("levels")}
                />
                <MultiSelect
                    items={[...Object.values(niceness)]}
                    fieldName="niceness"
                    nomasks={true}
                    callback={this.stateFieldSetter("niceness")}
                />
                <button onClick={this.shuffle}>Shuffle </button>
                {surgeByEffectByLevel.length > 0 && (
                    <DndContainer fullscreen>
                        <table width="auto">
                            <thead>
                                <tr>
                                    <td className="w1">Spell Level</td>
                                    <td className="w1">Character Level</td>
                                    {surgeByEffectByLevel
                                        .filter(s => s !== null)[0]
                                        .map(surgeByEffect => (
                                            <td key={surgeByEffect.effect.name} className="w5">
                                                {surgeByEffect.effect.name} <br />
                                                <span className="fw1">
                                                    {surgeByEffect.effect.description}
                                                </span>
                                            </td>
                                        ))}
                                </tr>
                            </thead>
                            <tbody>
                                {surgeByEffectByLevel.map((surgeByEffect, level) => (
                                    <tr key={level}>
                                        <td>{level}</td>
                                        <td>{level * 2 - 0.5}</td>
                                        {surgeByEffect.map((surge, i) => (
                                            <td key={i}>
                                                {surge !== null &&
                                                    surge.effect.parameters.map((param, j) => (
                                                        <div key={param.name}>
                                                            {param.name} : {surge.values[j]}
                                                        </div>
                                                    ))}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </DndContainer>
                )}
            </div>
        );
    }
}
