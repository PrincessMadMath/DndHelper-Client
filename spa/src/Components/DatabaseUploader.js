import React, { PureComponent } from "react";
import Dropzone from "react-dropzone";

export default class DatabaseUploader extends PureComponent {
    state = { files: [] };

    onDrop = files => {
        const reader = new FileReader();

        const sourceName = files[0].name.replace(".json", "");

        reader.onload = e => {
            const text = reader.result;
            const j = JSON.parse(text);

            // Clean monster stats
            const cleanMonster = j.map(x => ({
                challengeRating: "X",
                source: sourceName,
                ...x,
            }));

            this.props.onUploadMonsters(cleanMonster);
        };

        reader.readAsText(files[0], "utf-8");
    };

    render() {
        return (
            <section>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop}>
                        <p>Try dropping some files here, or click to select files to upload.</p>
                    </Dropzone>
                </div>
            </section>
        );
    }
}
