/* Utils */
import React from "react";
import PropTypes from "prop-types";

const savingThrow = (savingThrow, element) => {
    return (
        <span key={savingThrow.ability}>
            {element !== 0 ? "," : ""} {savingThrow.ability.substring(0, 3)} {savingThrow.modifier}
        </span>
    );
};

const enumeration = (value, element) => {
    return (
        <span key={value}>
            {element !== 0 ? "," : ""} {value}
        </span>
    );
};

const skill = (skill, element) => {
    return (
        <span key={skill.ability}>
            {element !== 0 ? "," : ""} {skill.ability} {skill.modifier}
        </span>
    );
};

const Info = ({ monster }) => {
    return (
        <div>
            <hr />
            <div>
                {monster.skills &&
                    monster.skills.length > 0 && (
                        <div>
                            <b>Skills:</b>
                            {monster.skills.map(skill)}
                        </div>
                    )}
                {monster.saves &&
                    monster.saves.length > 0 && (
                        <div>
                            <b>Saving throw:</b>
                            {monster.saves.map(savingThrow)}
                        </div>
                    )}
                {monster.resistances &&
                    monster.resistances.damageVulnerabilities.length > 0 && (
                        <div>
                            <b>Damage Vulnerabilities:</b>
                            {monster.resistances.damageVulnerabilities.map(enumeration)}
                        </div>
                    )}
                {monster.resistances &&
                    monster.resistances.damageResistance.length > 0 && (
                        <div>
                            <b>Damage Resistances:</b>
                            {monster.resistances.damageResistance.map(enumeration)}
                        </div>
                    )}
                {monster.resistances &&
                    monster.resistances.damageImmunities.length > 0 && (
                        <div>
                            <b>Damage Immunities:</b>
                            {monster.resistances.damageImmunities.map(enumeration)}
                        </div>
                    )}
                {monster.resistances &&
                    monster.resistances.conditionImmunities.length > 0 && (
                        <div>
                            <b>Condition Immunities:</b>
                            {monster.resistances.conditionImmunities.map(enumeration)}
                        </div>
                    )}
                {monster.resistances &&
                    monster.senses.length > 0 && (
                        <div>
                            <b>Senses: </b>
                            {monster.senses}
                        </div>
                    )}
                {monster.languages && (
                    <div>
                        <b>Languages: </b>
                        {monster.languages ? monster.languages : "-"}
                    </div>
                )}
                {monster.challengeRating && (
                    <div>
                        <b>Challenge Rating: </b>
                        {monster.challengeRating}
                    </div>
                )}
            </div>
        </div>
    );
};

Info.propType = {
    monster: PropTypes.shape({}).isRequired,
};

export default Info;
