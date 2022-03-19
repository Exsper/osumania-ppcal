const axios = require("axios").default;

class SayabotApi {
  static async search(bid) {
    const url = "https://api.sayobot.cn/v2/beatmapinfo?T=1&K=" + bid;
    const result = await axios.get(url);
    if (!result.data.data) throw "获取谱面详情失败";
    let beatmap;
    result.data.data.bid_data.map((bdata) => {
      if (bdata.bid === bid) beatmap = bdata;
    });
    if (!beatmap) throw "查不到该谱面信息";
    if (beatmap.mode !== 3) throw "该谱面不是mania专谱";
    return {
      od: beatmap.OD,
      sr: beatmap.star,
      objCount: beatmap.circles + beatmap.sliders,
    };
  }
}

module.exports = SayabotApi;
