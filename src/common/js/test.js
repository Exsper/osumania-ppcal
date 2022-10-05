const PPCal = require("./ManiaPPCal").PPCal;

// https://osu.ppy.sh/scores/mania/345503899
// old sr -> new sr
// 8.163 -> 8.35
// old pp -> new pp
// 833.1 -> 866.8

let ppcal2 = new PPCal({
  isConvert: false,
  sr: 8.35,
  objCount: 3053,
  isEZ: false,
  isNF: false,
  acc: 0.99858063107326127306474505950431,
  numGeki: 2755,
});

console.log(ppcal2.difficultyValue);
console.log(ppcal2.totalValue);
