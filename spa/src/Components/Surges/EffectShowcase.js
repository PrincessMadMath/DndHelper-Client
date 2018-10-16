import React from "react";
import effects, { generateSurge } from "./data/effects";
import MultiSelect from "../SubComponents/MultiSelect";
import MaskMap from "../../utils/MaskMap";
import DndContainer from "../StyledComponent/DndContainer";

export default class EffectShowcase extends React.Component {
    state = {
        surgeByEffectByLevel: [],
    };

    constructor(props) {
        super(props);

        this.masks = new MaskMap(effects.length);
    }

    createMaskSetter = mask_name => mask => {
        // we have to force a lazy-load check after filtering children since spells
        // can enter the viewport without scroll or resize
        this.masks.setMask(mask_name, mask);
        this.setState({
            surgeByEffectByLevel: this.createSurgeByEffectByLevel(this.masks.filter(effects)),
        });
    };

    createSurgeByEffectByLevel = effectList =>
        [...Array(15).keys()].map(i => effectList.map(e => generateSurge(e, { level: i })));

    shuffle = () => {
        this.setState({
            surgeByEffectByLevel: this.createSurgeByEffectByLevel(this.masks.filter(effects)),
        });
    };

    render() {
        const { surgeByEffectByLevel } = this.state;
        return (
            <div>
                <MultiSelect
                    items={effects.map(e => e.name)}
                    fieldName="Effects"
                    callback={this.createMaskSetter("effect_mask")}
                />
                <button onClick={this.shuffle}>Shuffle </button>
                {surgeByEffectByLevel.length > 0 && (
                    <DndContainer fullscreen >
                        <table width="auto">
                            <thead>
                                <tr>
                                    <td className="w1">Spell Level</td>
                                    <td className="w1">Character Level</td>
                                    {surgeByEffectByLevel[10].map(surgeByEffect => (
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
