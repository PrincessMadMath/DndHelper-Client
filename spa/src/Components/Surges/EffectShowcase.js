import React from "react";
import effects, { generateSurge } from "./data/effects";
import MultiSelect from "../SubComponents/MultiSelect";
import MaskMap from "../../utils/MaskMap";
import { forceCheck } from "react-lazyload";

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
        this.setState(
            { surgeByEffectByLevel: this.createSurgeByEffectByLevel(this.masks.filter(effects)) },
            forceCheck
        );
    };

    createSurgeByEffectByLevel = effectList =>
        [...Array(15).keys()].map(i => effectList.map(e => generateSurge(e, { level: i })));

    render() {
        const { surgeByEffectByLevel } = this.state;
        return (
            <div>
                <MultiSelect
                    items={effects.map(e => e.name)}
                    fieldName="Effects"
                    callback={this.createMaskSetter("effect_mask")}
                />
                {surgeByEffectByLevel.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <td> Level</td>
                                {surgeByEffectByLevel[0].map(surgeByEffect => (
                                    <td key={surgeByEffect.effect.name}>
                                        {surgeByEffect.effect.name}
                                    </td>
                                ))}
                            </tr>
                            >
                            <tr>
                                <td> Description</td>
                                {surgeByEffectByLevel[0].map(surgeByEffect => (
                                    <td key={surgeByEffect.effect.name}>
                                        {surgeByEffect.effect.description}
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {surgeByEffectByLevel.map((surgeByEffect, level) => (
                                <tr key={level}>
                                    <td>{level}</td>
                                    {surgeByEffect.map(surge => (
                                        <td key={surge.effect.name}>
                                            {surge.effect.parameters.map((param, j) => (
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
                )}
            </div>
        );
    }
}
