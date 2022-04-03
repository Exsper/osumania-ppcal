class PPCal {
  /**
   * @param {Object} data 谱面和成绩数据
   * @param {boolean} data.isConvert 是转谱
   * @param {number} data.mapKeys 谱面键数，转谱时需要
   * @param {number} data.playKeys 游玩键数，转谱时需要
   * @param {number} data.sr 谱面星数（mod加成后）
   * @param {number} data.od 谱面OD（mod加成前）
   * @param {number} data.objCount 谱面物件个数
   * @param {boolean} data.isHR 有HR mod
   * @param {boolean} data.isEZ 有EZ mod
   * @param {boolean} data.isDT 有DT mod
   * @param {boolean} data.isHT 有HT mod
   * @param {boolean} data.isNF 有NF mod
   * @param {number} data.score 成绩
   */
  constructor(data) {
    /** 是转谱 */
    this.isConvert = data.isConvert;
    /** 谱面键数，转谱时需要 */
    this.mapKeys = data.mapKeys;
    /** 游玩键数，转谱时需要 */
    this.playKeys = data.playKeys;
    /** 谱面星数（mod加成后） */
    this.sr = data.sr;
    /** 谱面OD（mod加成前） */
    this.od = data.od;
    /** 谱面物件个数 */
    this.objCount = data.objCount;
    /** 有HR mod */
    this.isHR = data.isHR;
    /** 有EZ mod */
    this.isEZ = data.isEZ;
    /** 有DT mod */
    this.isDT = data.isDT;
    /** 有HT mod */
    this.isHT = data.isHT;
    /** 有NF mod */
    this.isNF = data.isNF;
    /** 成绩 */
    this.score = data.score;
    // this.acc = data.acc;
    /** 在当前mod下可以得到的满分成绩 */
    this.maxScore = 1000000;
    /** 去除mod影响的得分，总分为1m */
    this._score = this.getComputeScore();
    /** 基础pp */
    this.difficultyValue = this.computeDifficultyValue();
    /** 准度pp */
    this.accuracyValue = this.computeAccuracyValue();
    /** 总计pp */
    this.totalValue = this.computeTotalValue();
  }
  computeDifficultyValue() {
    /** 难度pp */
    let difficultyValue = 1;
    /** 难度参数 */
    let starValue = Math.pow(5 * Math.max(1, this.sr / 0.2) - 4, 2.2) / 135;
    difficultyValue *= starValue;
    /** 长度参数 */
    let lengthValue = 1 + 0.1 * Math.min(1, this.objCount / 1500);
    difficultyValue *= lengthValue;
    /** 总分参数 */
    let scoreValue = 0;
    let score = this._score;
    if (score <= 500000) scoreValue = 0;
    else if (score <= 600000) scoreValue = ((score - 500000) / 100000) * 0.3;
    else if (score <= 700000)
      scoreValue = 0.3 + ((score - 600000) / 100000) * 0.25;
    else if (score <= 800000)
      scoreValue = 0.55 + ((score - 700000) / 100000) * 0.2;
    else if (score <= 900000)
      scoreValue = 0.75 + ((score - 800000) / 100000) * 0.15;
    else scoreValue = 0.9 + ((score - 900000) / 100000) * 0.1;
    difficultyValue *= scoreValue;
    return difficultyValue;
  }

  getComputeScore() {
    /** mod分数加成 */
    let scoreMultiplier = this.getScoreMultiplier();
    this.maxScore = parseInt(this.maxScore * scoreMultiplier);
    return this.score / scoreMultiplier;
  }

  /*
  getComputeOD() {
    if (this.isHR) {
      if (this.od >= 10) return 9;
      else return this.od / 1.4;
    }
    if (this.isEZ) return this.od * 2;
    return this.od;
  }
  */

  getScoreMultiplier() {
    let sm = 1.0;
    if (this.isConvert) {
      let diff = this.playKeys - this.mapKeys;
      if (diff > 0) sm *= 0.9;
      else if (diff < 0) sm *= 0.9 + 0.04 * diff;
    }
    return sm * Math.pow(0.5, this.isEZ + this.isHT + this.isNF);
  }

  computeAccuracyValue() {
    return (
      Math.max(0, 0.2 - (this.getHitWindow300() - 34) * 0.006667) *
      this.difficultyValue *
      Math.pow(Math.max(0, this._score - 960000) / 40000, 1.1)
    );
  }

  getHitWindow300() {
    const applyModAdjustments = (value) => {
      if (this.isHR) value /= 1.4;
      else if (this.isEZ) value *= 1.4;
      return value;
    };

    if (!this.isConvert) {
      let od = Math.min(10.0, Math.max(0, 10.0 - this.od));
      return applyModAdjustments(34 + 3 * od);
    }
    if (this.od >= 5) return applyModAdjustments(34);
    return applyModAdjustments(47);
  }

  computeTotalValue() {
    /** mania固定pp系数 */
    let multiplier = 0.8;
    if (this.isNF) multiplier *= 0.9;
    // ppy的算法里有这一行，没搞懂为什么mania会有SO
    // if (this.isSO) multiplier *= 0.95;
    if (this.isEZ) multiplier *= 0.5;
    return (
      Math.pow(
        Math.pow(this.difficultyValue, 1.1) + Math.pow(this.accuracyValue, 1.1),
        1 / 1.1
      ) * multiplier
    );
  }
}

class DrawInfo {
  /**
   * @param {Object} data 谱面和成绩数据
   * @param {number} maxScore 满分
   */
  constructor(data, maxScore) {
    this.data = data;
    this.maxScore = maxScore;
  }

  getX() {
    let dataCount = 50;
    let x = [];
    let step = parseInt((this.maxScore - this.data.score) / dataCount);
    if (step <= 0) return [this.data.score, this.maxScore];
    let s = this.data.score;
    for (let i = 0; i < dataCount; i++) {
      x.push(s);
      s += step;
    }
    x.push(this.maxScore);
    // 去重
    return [...new Set(x)];
  }

  getTrace() {
    let x = this.getX();
    let y = x.map((s) => {
      let data = this.data;
      data.score = s;
      return new PPCal(data).totalValue;
    });
    return {
      x,
      y,
      name: this.name,
      showlegend: false,
      type: "scatter",
    };
  }

  getLayout() {
    let layout = {
      title: {
        text: "pp曲线",
      },
      xaxis: {
        title: {
          text: "得分",
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

module.exports.PPCal = PPCal;
module.exports.DrawInfo = DrawInfo;
