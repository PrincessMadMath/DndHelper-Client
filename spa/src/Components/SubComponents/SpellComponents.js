/* Utils */
import React from "react";
import PropTypes from "prop-types";

/* Components */
import { SpellComponentIcon } from "./SpellComponentIcon";

/* Components icon */
import concentration from "./icon/concentration.svg";
import verbal from "./icon/verbal.svg";
import somatic from "./icon/somatic.svg";
import material from "./icon/material.svg";
import material_money from "./icon/material_money.svg";

const Components = ({ components }) => {
    return (
        <div className="flex flex-row">
            <SpellComponentIcon
                isRequired={components.concentration}
                icon={concentration}
                alternative="Concentration"
            />
            <SpellComponentIcon isRequired={components.verbal} icon={verbal} alternative="Verbal" />
            <SpellComponentIcon
                isRequired={components.somatic}
                icon={somatic}
                alternative="Somatic"
            />
            <SpellComponentIcon
                isRequired={components.material}
                icon={components.requiredGold > 0 ? material_money : material}
                alternative="Meterial"
            />
        </div>
    );
};

Components.propTypes = {
    components: PropTypes.shape({
        concentration: PropTypes.bool.isRequired,
        somatic: PropTypes.bool.isRequired,
        verbal: PropTypes.bool.isRequired,
        material: PropTypes.bool.isRequired,
    }),
};

export default Components;
