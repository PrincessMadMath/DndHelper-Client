var spells = require('./spells.json')
var monsters = require('./monsters.json')

function getMonsters () {
  // return fetch("/api/monster")
  //   .then(response => response.json())
  //   .then(response => {
  //     return response;
  //   })
  //   .catch(function(error) {
  //     console.log("Error in getting monster" + error);
  //   });
  return monsters
}

function getSpells () {
  return spells
}

export { getSpells, getMonsters }
