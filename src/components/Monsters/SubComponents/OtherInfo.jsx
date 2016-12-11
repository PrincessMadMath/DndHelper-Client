import React from 'react'

const savingThrow = (savingThrow, element) => {
    return (
        <span>{ element !== 0 ? "," : "" }  { savingThrow.ability } ({ savingThrow.modifier })</span>
        );
}

const enumeration = (value, element) => {
    return (
        <span>{ element !== 0 ? "," : "" }  { value }</span>
        );
}


const skill = (skill, element) => {
    return (
        <span>{ element !== 0 ? "," : "" }  { skill.name } ({ skill.modifier })</span>
        );
}




const Info = ({monster}) => {
    return (
        <div>
          <h2>Other Info</h2>
          <hr/>
          { monster.skills.length > 0 && <div><b>Skills:</b>
                                           { monster.skills.map(skill) }
                                         </div> }
          { monster.saves.length > 0 && <div><b>Saving throw:</b>
                                          { monster.saves.map(savingThrow) }
                                        </div> }
          { monster.resistances.damageVulnerabilities.length > 0 && <div><b>Damage Vulnerabilities:</b>
                                                                      { monster.resistances.damageVulnerabilities.map(enumeration) }
                                                                    </div> }
          { monster.resistances.damageResistance.length > 0 && <div><b>Damage Resistances:</b>
                                                                 { monster.resistances.damageResistance.map(enumeration) }
                                                               </div> }
          { monster.resistances.damageImmunities.length > 0 && <div><b>Damage Immunities:</b>
                                                                 { monster.resistances.damageImmunities.map(enumeration) }
                                                               </div> }
          { monster.resistances.conditionImmunities.length > 0 && <div><b>Condition Immunities:</b>
                                                                    { monster.resistances.conditionImmunities.map(enumeration) }
                                                                  </div> }
          <div><b>Senses: </b>
            { monster.senses }
          </div>
          <div><b>Languages: </b>
            { monster.languages ? monster.languages : "-" }
          </div>
          <div><b>Challenge Rating: </b>
            { monster.challengeRating }
          </div>
        </div>
        );

}

Info.propType = {
    monster: React.PropTypes.shape({
    }).isRequired
};

export default Info;
