import React from "react";

import "./style/Monster.css";
import "../../common/style/ManualStyle.css";

const MonsterQuickInfo = ({ monster }) => {
  return (
    <div className="information-box monster-quick-info__container">
      <div className="monster-quick-info__name-container">
        <span className="monster-quick-info__name">{monster.name}</span>
        <span>CR: {monster.challengeRating}</span>
      </div>
      <div className="monster-quick-info__more-container">
        <span className="monster-quick-info__more">
          AC: {monster.armorClass}
        </span>
        <span className="monster-quick-info__more">
          HP: {monster.hitPoints}
        </span>
      </div>
    </div>
  );
};

export default MonsterQuickInfo;
