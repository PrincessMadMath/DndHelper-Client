/* Utils */
import React from "react";
import PropTypes from "prop-types";

import Spell from "./Spell";

/* Style */
import "./Style/MonsterInfoElement.css";

const SpellCasting = ({ spellsDetail }) => {
  if (spellsDetail == null) {
    return <div />;
  }

  return (
    <div>
      <h2>Spell Casting</h2>
      <hr />
      <p>
        {spellsDetail.desc}
      </p>
      {spellsDetail.details.map(x => <SpellDetail spellsByLevel={x} />)}
    </div>
  );
};

const SpellDetail = ({ spellsByLevel }) => {
  return (
    <div>
      <strong>
        {spellsByLevel.details}:{" "}
      </strong>
      {spellsByLevel.spells.map((x, index) =>
        <SpellItem
          spellName={x}
          lastOne={index === spellsByLevel.spells.length - 1}
        />
      )}
    </div>
  );
};

const SpellItem = ({ spellName, lastOne }) => {
  return (
    <span>
      <Spell name={spellName} />
      {lastOne ? "" : ", "}
    </span>
  );
};

SpellCasting.propType = {
  spellsDetail: PropTypes.shape({
    desc: PropTypes.string.isRequired,
    details: PropTypes.array.isRequired,
  }),
};

SpellDetail.propType = {
  details: PropTypes.string.isRequired,
  spells: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SpellCasting;
