/**
 * 等级总分表，上限为150级
 */
const expRequires = [
  0,
  1, // 20000 = level 1
  30000, // 40000 = level 2
  130000,
  340000,
  700000,
  1250000,
  2030000,
  3080000,
  4440000,
  6150000,
  8250000,
  10780000,
  13780000,
  17290000,
  21350000,
  26000000,
  31280000,
  37230000,
  43890000,
  51300000,
  59500000,
  68530000,
  78430000,
  89240000,
  101000000,
  113750000,
  127530000,
  142380000,
  158340000,
  175450000,
  193750000,
  213280000,
  234080000,
  256190000,
  279650000,
  304500000,
  330780000,
  358530000,
  387790000,
  418600000,
  451000000,
  485030000,
  520730000,
  558140000,
  597300000,
  638250000,
  681030000,
  725680000,
  772240000,
  820750000,
  871250000,
  923780000,
  978380000,
  1035090000,
  1093950000,
  1155000000,
  1218280000,
  1283830000,
  1351690000,
  1421900001,
  1494500002,
  1569530004,
  1647030007,
  1727040013,
  1809600023,
  1894750042,
  1982530076,
  2072980137,
  2166140247,
  2262050446,
  2360750803,
  2462281446,
  2566682602,
  2673994685,
  2784258433,
  2897515179,
  3013807323,
  3133179183,
  3255678529,
  3381359352,
  3510286835,
  3642546303,
  3778259346,
  3917612823,
  4060911082,
  4208669948,
  4361785906,
  4521840632,
  4691649138,
  4876246449,
  5084663609,
  5333124496,
  5650800093,
  6090166168,
  6745647103,
  7787174785,
  9520594613,
  12496396305,
  17705429349,
  26931190827,
  126931190826,
  226931190825,
  326931190824,
  426931190823,
  526931190822,
  626931190821,
  726931190820,
  826931190819,
  926931190818,
  1026931190817,
  1126931190816,
  1226931190815,
  1326931190814,
  1426931190813,
  1526931190812,
  1626931190811,
  1726931190810,
  1826931190809,
  1926931190808,
  2026931190807,
  2126931190806,
  2226931190805,
  2326931190804,
  2426931190803,
  2526931190802,
  2626931190801,
  2726931190800,
  2826931190799,
  2926931190798,
  3026931190797,
  3126931190796,
  3226931190795,
  3326931190794,
  3426931190793,
  3526931190792,
  3626931190791,
  3726931190790,
  3826931190789,
  3926931190788,
  4026931190787,
  4126931190786,
  4226931190785,
  4326931190784,
  4426931190783,
  4526931190782,
  4626931190781,
  4726931190780,
  4826931190779,
  4926931190778,
  5026931190777,
];

/**
 * 整数每3位加逗号
 * @param {number} n 整数
 * @returns {string}
 */
function format_number(n) {
  var b = parseInt(n).toString();
  var len = b.length;
  if (len <= 3) {
    return b;
  }
  var r = len % 3;
  return r > 0
    ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",")
    : b.slice(r, len).match(/\d{3}/g).join(",");
}

/**
 * 按wiki公式获取等级对应总分
 * @param {number} level 等级
 * @returns {number} 总分
 */
function getExpRequire(level) {
  let exp = 0;
  if (level < 100) {
    exp =
      (5000 / 3) * (4 * Math.pow(level, 3) - 3 * Math.pow(level, 2) - level) +
      1.25 * Math.pow(1.8, level - 60);
  } else {
    exp = 26931190827 + 99999999999 * (level - 100);
  }
  return parseInt(exp);
}

/**
 * 根据总分获取当前等级和下一级总分
 * @param {number} totalScore 总分
 * @returns {{level:number, nextLevelExp:number}} {等级, 下一级所需总分}
 */
function getLevel(totalScore) {
  for (let i = 1; i < expRequires.length - 1; i++) {
    if (totalScore < expRequires[i]) {
      return { level: i - 1, nextLevelExp: expRequires[i] };
    }
  }
  // impossible!
  for (let i = expRequires.length - 1; i < 10000; i++) {
    let next = getExpRequire(i);
    if (totalScore < next) {
      return { level: i - 1, nextLevelExp: next };
    }
  }
  throw "这是你编造的总分，对不对？";
}

/**
 * 估计到下一等级还需要多少pc
 * @param {number} totalScore 总分
 * @param {number} scorePerPC 每pc成绩
 * @param {number} compareLevel 指定比较等级
 * @returns {string} 结论
 */
function getNextExpRequire(totalScore, scorePerPC, compareLevel) {
  let d = getLevel(totalScore);
  let level = d.level;
  let nextExp = compareLevel ? getExpRequire(compareLevel) : d.nextLevelExp;
  let nextLevelString = compareLevel ? "第 " + compareLevel + " 级" : "下一级";
  let req = nextExp - totalScore;
  if (req <= 0) throw "您当前的等级（ " + level + " ）已经达到目标等级了！";
  let pc = Math.ceil(req / scorePerPC);
  return (
    "您当前的等级为 " +
    level +
    " 级，距" +
    nextLevelString +
    "还需要 " +
    format_number(req) +
    " 点经验。\n按每PC得分 " +
    format_number(scorePerPC) +
    " 计算，您大约还需要打 " +
    format_number(pc) +
    " 次。"
  );
}

module.exports = getNextExpRequire;
