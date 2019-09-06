import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const DatabaseUploader = ({ onUploadMonsters }) => {
    const onDrop = useCallback(
        acceptedFiles => {
            const reader = new FileReader();

            const sourceName = acceptedFiles[0].name.replace(".json", "");

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                const text = reader.result;
                const j = JSON.parse(text);

                // Clean monster stats
                const cleanMonster = j.map(x => ({
                    challengeRating: "X",
                    source: sourceName,
                    ...x,
                }));

                onUploadMonsters(cleanMonster);
            };

            acceptedFiles.forEach(file => reader.readAsText(file, "utf-8"));
        },
        [onUploadMonsters]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <section>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
        </section>
    );
};
