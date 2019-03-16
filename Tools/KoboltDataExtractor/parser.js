const fs = require("fs");
const parser = require("fast-xml-parser");
const he = require("he");

const parseSpells = require("./spellsParser");
const parseMonsters = require("./monstersParser");

const fromPath = JSON.parse(process.argv[2]);
const outputFolder = process.argv[3];

let spells = [];
let monsters = [];

fromPath.forEach(path => {
    const data = fs.readFileSync(path);

    const text = data.toString();
    var jsonObj = parser.parse(text);

    if (jsonObj.compendium.spell !== undefined) {
        const parsedSpells = parseSpells(jsonObj.compendium.spell);
        spells = [...spells, ...parsedSpells];
    }

    if (jsonObj.compendium.monster !== undefined) {
        const parsedMonsters = parseMonsters(jsonObj.compendium.monster);
        monsters = [...monsters, ...parsedMonsters];
    }
});

saveFile(`spells.json`, spells);
saveFile(`monsters.json`, monsters);

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
