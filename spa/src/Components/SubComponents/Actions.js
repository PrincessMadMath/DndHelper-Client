/* Utils */
import React from "react";
import PropTypes from "prop-types";

const Action = ({ action }) => {
    return (
        <div>
            <p>
                <span className="mb0 b">{action.name}. </span>
                {action.desc}
            </p>
        </div>
    );
};

// Move in tool tip?
// {action.attackBonus !== "0" ? <div><span>Attack bonus: {action.attackBonus}</span><br/></div> : <div />}
// {action.damageDice !== null ? <div><span>Damage dice: {action.damageDice}</span><br/></div> : <div />}
// {action.damageBonus !== null ? <div><span>Damage bonus: {action.damageBonus}</span><br/></div> : <div />}

const Actions = ({ actions }) => {
    if (actions == null) {
        return <div />;
    }

    return (
        <div>
            <h2 className="mb0">Actions</h2>
            <hr />
            {actions.map(function(value) {
                return (
                    <div key={value.name}>
                        <Action action={value} />
                    </div>
                );
            })}
        </div>
    );
};

Actions.propType = {
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            desc: PropTypes.string.isRequired,
            attackBonus: PropTypes.number,
            damageDice: PropTypes.string,
            damageBonus: PropTypes.number,
        })
    ).isRequired,
};

export default Actions;
