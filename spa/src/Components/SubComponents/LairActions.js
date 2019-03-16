/* Utils */
import React from "react";

const showdown = require("showdown");
const converter = new showdown.Converter();

// To support markup in the description (like <br>)
// Todo: find less dangerous alternative
function createMarkup(text) {
    return {
        __html: converter.makeHtml(text),
    };
}

const LairActions = ({ lairActions }) => {
    if (lairActions === null || lairActions.length === 0) {
        return <div />;
    }

    debugger;
    return (
        <div>
            <h2 className="mb0">Lair Actions</h2>
            <hr />
            <div>
                <p dangerouslySetInnerHTML={createMarkup(lairActions.desc)} />
             </div>
        </div>
    );
};

export default LairActions;
