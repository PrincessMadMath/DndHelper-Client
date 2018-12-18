const fs = require("fs");
const parser = require('fast-xml-parser');
const he = require('he');

const fromPath = process.argv[2];
const outputFolder = process.argv[3];

fs.readFile(fromPath, function(err, data) {
    const text = data.toString();
    var jsonObj = parser.parse(text);

    parseMonsters(jsonObj.compendium.monster);
    parseSpells(jsonObj.compendium.spell);
});


function parseMonsters(monsters){

    const formatedMonsters = monsters.map(x => {
        return{
            challengeRating: x.cr,
            name: x.name,
            size: x.size, // Parse m-> Medium
            type: x.type, // filter out (aarakocra)
            alignment: x.alignment,
            armorClass: x.ac,
            hitPoints: x.hp, // parse hp from hitDice
            hitDice: "xxx",
            speed: x.speed,
            abilities : {
                strength: x.str, 
                dexterity: x.dex, 
                constitution: x.con, 
                intelligence: x.int, 
                wisdom: x.wis, 
                charisma: x.cha, 
            },
            saves: [], // parse
            skills: [], //parse
            resistances: { // parse
                damageVulnerabilities: [],
                damageResistance: [],
                damageImmunities: [],
                conditionImmunities: []
              },
            features: [], // parse from trait 
            spellCasting: null,
            actions: [],
            legendaryActions: [],
            senses: x.senses,
            languages: x.languages,
            environment: x.environment,
            source: "" // parse from trait[source]
        }
    })

    saveFile("monsters.json", monsters);
}

function parseSpells(spells){

    saveFile("spells.json", spells);
}

function saveFile(fileName, text){
    fs.writeFile(`${outputFolder}/${fileName}`, JSON.stringify(text), (err) => {  
        if (err) throw err;
    });
}
