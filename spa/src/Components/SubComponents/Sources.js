/* Utils */
import React from "react";

const Sources = ({ sources }) => {
    if (sources === null || sources.length === 0) {
        return <div />;
    }

    return (
        <div>
            <hr />
            <h3 className="mb0">Sources</h3>
            {sources.map(x => {
                return (
                    <span>
                        {x.name} {x.page ? `, p. ${x.page}` : ""}
                    </span>
                );
            })}
        </div>
    );
};

export default Sources;
