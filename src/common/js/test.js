const PPCal = require("./ManiaPPCal");

let ppcal = new PPCal({
  isConvert: false,
  sr: 8,
  od: 8,
  objCount: 2000,
  isHR: false,
  isDT: false,
  isEZ: false,
  isHT: false,
  isNF: false,
  score: 1000000,
});

console.log(ppcal.difficultyValue);
console.log(ppcal.accuracyValue);
console.log(ppcal.totalValue);
