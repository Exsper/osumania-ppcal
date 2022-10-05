/**
 * https://github.com/ppy/osu-performance/blob/master/src/performance/mania/ManiaScore.cpp
 */
class PPCal {
  /**
   * @param {Object} data 谱面和成绩数据
   * @param {number} data.sr 谱面星数（mod加成后）
   * @param {number} data.acc 成绩acc，范围0-1
   * @param {number} data.numGeki 成绩彩300数量
   * @param {number} data.objCount 谱面物件个数
   * @param {boolean} data.isEZ 有EZ mod
   * @param {boolean} data.isNF 有NF mod
   */
  constructor(data) {
    /** 谱面星数（mod加成后） */
    this.sr = data.sr;
    /** 谱面物件个数 */
    this.objCount = data.objCount;
    /** 成绩acc，用于计算新pp，范围0-1 */
    this.acc = data.acc || -1;
    /** 成绩彩300数量，用于计算新pp */
    this.numGeki = data.numGeki || -1;
    /** 有EZ mod */
    this.isEZ = data.isEZ;
    /** 有NF mod */
    this.isNF = data.isNF;

    /** 用于计算pp的acc */
    this.cacc = this.acc2customAccuracy();
    /** 难度pp */
    this.difficultyValue = this.computeDifficultyValue();
    /** 最终pp */
    this.totalValue = this.computeTotalValue();
  }

  computeDifficultyValue() {
    let difficultyValue =
      Math.pow(Math.max(this.sr - 0.15, 0.05), 2.2) * // Star rating to pp curve
      Math.max(0.0, 5.0 * this.cacc - 4.0) * // From 80% accuracy, 1/20th of total pp is awarded per additional 1% accuracy
      (1.0 + 0.1 * Math.min(1.0, this.objCount / 1500.0)); // Length bonus, capped at 1500 notes
    return difficultyValue;
  }
  /**
   * 旧acc转新acc
   * ---
   * 新acc：\
   * (_numGeki * 320 + _num300 * 300 + _numKatu * 200 + _num100 * 100 + _num50 * 50) / (TotalHits() * 320); \
   * 旧acc：\
   * (_num50 * 50 + _num100 * 100 + _numKatu * 200 + (_num300 + _numGeki) * 300) / (TotalHits() * 300); \
   */
  acc2customAccuracy() {
    if (this.objCount <= 0) return 0;
    let oldScoreSum = this.acc * this.objCount * 300;
    let newScoreSum = oldScoreSum + 20 * this.numGeki;
    return newScoreSum / 320 / this.objCount;
  }

  computeTotalValue() {
    /** mania固定pp系数 */
    let multiplier = 8.0;
    if (this.isNF) multiplier *= 0.75;
    // ppy的算法里有这一行，没搞懂为什么mania会有SO
    // if (this.isSO) multiplier *= 0.95;
    if (this.isEZ) multiplier *= 0.5;
    return this.difficultyValue * multiplier;
  }
}

class DrawInfo {
  /**
   * pp曲线，acc和彩300数量均是线性增长
   * @param {Object} data 成绩数据
   */
  constructor(data) {
    this.data = data;
    /** 当成绩acc为100%时，只有彩300数量增长 */
    this.ssmode = data.acc == 1;
  }

  /**
   * @returns {[number, number]} [acc, numGeki]
   */
  getX() {
    let dataCount = 50;
    let x = [];
    let acc_step = (1.0 - this.data.acc) / dataCount;
    let numGeki_step = parseInt(
      (this.data.objCount - this.data.numGeki) / dataCount
    );
    let _acc = this.data.acc;
    let _numGeki = this.data.numGeki;
    // acc步进为0，进入纯彩300模式
    if (acc_step <= 0) {
      this.ssmode = true;
      // 满分成绩
      if (numGeki_step <= 0) {
        return [
          [_acc, _numGeki],
          [1, this.data.objCount],
        ];
      }
      // 非满分的SS成绩
      for (let i = 0; i < dataCount; i++) {
        x.push([_acc, _numGeki]);
        _numGeki += numGeki_step;
      }
      x.push([1, this.data.objCount]);
      return x;
    }
    // 非SS成绩
    for (let i = 0; i < dataCount; i++) {
      x.push([_acc, _numGeki]);
      _acc += acc_step;
      // 这里还是决定固定住彩300数量，不随acc增长而增长，毕竟从非SS打到满分很难
      // _numGeki += numGeki_step;
    }
    x.push([1, _numGeki]);
    return x;
  }

  getTrace() {
    let x = this.getX();
    let xText = [];
    let yText = [];
    if (!this.ssmode) {
      x.map((s) => {
        let data = this.data;
        data.acc = s[0];
        data.numGeki = s[1];
        xText.push(parseFloat(s[0] * 100));
        yText.push(new PPCal(data, false, true).totalValue);
      });
      return {
        x: xText,
        y: yText,
        name: this.name,
        showlegend: false,
        type: "scatter",
      };
    } else {
      x.map((s) => {
        let data = this.data;
        data.acc = s[0];
        data.numGeki = s[1];
        xText.push(s[1]);
        yText.push(new PPCal(data, false, true).totalValue);
      });
      return {
        x: xText,
        y: yText,
        name: this.name,
        showlegend: false,
        type: "scatter",
      };
    }
  }

  getLayout() {
    if (!this.ssmode) {
      let layout = {
        title: {
          text: "pp曲线",
        },
        xaxis: {
          title: {
            text: "Acc(%)",
          },
          exponentformat: "none",
          showgrid: true,
          gridwidth: 2,
        },
        yaxis: {
          title: {
            text: "pp",
          },
          exponentformat: "none",
          showgrid: true,
          gridwidth: 2,
        },
      };
      return layout;
    } else {
      let layout = {
        title: {
          text: "pp曲线",
        },
        xaxis: {
          title: {
            text: "彩300数",
          },
          exponentformat: "none",
          showgrid: true,
          gridwidth: 2,
        },
        yaxis: {
          title: {
            text: "pp",
          },
          exponentformat: "none",
          showgrid: true,
          gridwidth: 2,
        },
      };
      return layout;
    }
  }
}

module.exports.PPCal = PPCal;
module.exports.DrawInfo = DrawInfo;
