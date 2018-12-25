const fs = require("fs");
const parser = require("fast-xml-parser");
const he = require("he");

const parseSpells = require("./spellsParser");
const parseMonsters = require("./monstersParser");

const fromPath = process.argv[2];
const outputFolder = process.argv[3];

const fileName = fromPath.replace(/^.*[\\\/]/, "").split(".")[0];

fs.readFile(fromPath, function(err, data) {
    const text = data.toString();
    var jsonObj = parser.parse(text);

    if (jsonObj.compendium.spell !== undefined) {
        const parsedSpells = parseSpells(jsonObj.compendium.spell);
        saveFile(`${fileName}_spells_output.json`, parsedSpells);
    }

    if (jsonObj.compendium.monster !== undefined) {
        const parsedMonsters = parseMonsters(jsonObj.compendium.monster);
        saveFile(`${fileName}_monsters_output.json`, parsedMonsters);
    }
});

fs.mkdir(outputFolder, { recursive: true }, err => {});

function saveFile(fileName, text) {
    fs.writeFile(
        `${outputFolder}/${fileName}`,
        he.decode(JSON.stringify(text, null, 4)),
        err => {
            if (err) throw err;
        }
    );
}
