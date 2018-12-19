const fs = require("fs");
const parser = require("fast-xml-parser");
const he = require("he");

const parseSpells = require("./spellsParser");
const parseMonsters = require("./monstersParser");

const fromPath = process.argv[2];
const outputFolder = process.argv[3];

fs.readFile(fromPath, function(err, data) {
    const text = data.toString();
    var jsonObj = parser.parse(text);

    const parsedSpells = parseSpells(jsonObj.compendium.spell);
    saveFile("spells_output.json", parsedSpells);

    const parsedMonsters = parseMonsters(
        jsonObj.compendium.monster,
        parsedSpells
    );
    saveFile("monsters_output.json", parsedMonsters);
});

function saveFile(fileName, text) {
    fs.writeFile(`${outputFolder}/${fileName}`, JSON.stringify(text), err => {
        if (err) throw err;
    });
}
