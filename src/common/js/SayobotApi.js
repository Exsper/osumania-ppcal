const axios = require("axios").default;

class BeatmapSetInfo {
  constructor(data) {
    this.approved = data.approved; //1=ranked, 0=loved
    this.artist = data.artist;
    this.artistU = data.artistU || data.artist;
    this.title = data.title;
    this.titleU = data.titleU || data.title;
    this.sid = data.sid;
    this.creator = data.creator;
    this.thumb = "https://b.ppy.sh/thumb/" + this.sid + "l.jpg"; // 4:3
    this.play_count = data.play_count;
  }

  toTableData() {
    let status = "";
    switch (this.approved) {
      case 0: {
        status = "pending";
        break;
      }
      case 1: {
        status = "ranked";
        break;
      }
      case 2: {
        status = "approved";
        break;
      }
      case 3: {
        status = "qualified";
        break;
      }
      case 4: {
        status = "loved";
        break;
      }
      case -1: {
        status = "WIP";
        break;
      }
      case -2: {
        status = "graveyard";
        break;
      }
      default: {
        status = "unknown";
        break;
      }
    }
    return {
      sid: this.sid,
      thumb: this.thumb,
      status,
      title: this.artistU + " - " + this.titleU,
      creator: this.creator,
    };
  }
}

class BeatmapInfo {
  constructor(data) {
    this.bid = data.bid;
    this.version = data.version;
    this.mode = data.mode; // mode=3
    this.star = data.star;
    this.keys = data.CS;
    this.od = data.OD;
    this.objCount = data.circles + data.sliders;
  }

  toTableData() {
    return {
      bid: this.bid,
      version: this.version,
      od: this.od,
      sr: this.star,
      objCount: this.objCount,
      star: "★" + this.star,
      keys: this.keys.toFixed(0) + "K",
    };
  }
}

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

  /**
   * 按关键词搜索谱面列表
   * @param {string} keyword 关键词
   * @returns {Array<BeatmapSetInfo>}
   */
  static async searchBeatmapSetList(keyword) {
    const url = "https://api.sayobot.cn/beatmaplist?2=4&5=8&3=" + keyword;
    const result = await axios.get(url);
    if (!result.data) throw "获取谱面列表失败";
    if (result.data.status !== 0) throw "找不到相关谱面集";
    let bsis = result.data.data.map((data) => new BeatmapSetInfo(data));
    // 按游玩次数排序
    return bsis.sort((a, b) => b.play_count - a.play_count);
  }

  /**
   * 按sid搜索bid列表
   * @param {number} sid
   * @returns {Array<BeatmapInfo>}
   */
  static async searchBeatmapList(sid) {
    const url = "https://api.sayobot.cn/v2/beatmapinfo?T=0&K=" + sid;
    const result = await axios.get(url);
    if (!result.data) throw "获取谱面信息失败";
    if (result.data.status !== 0) throw "找不到相关谱面";
    let bis = result.data.data.bid_data.map((data) => new BeatmapInfo(data));
    bis = bis.filter((bi) => bi.mode === 3);
    if (bis.length <= 0) throw "找不到相关谱面";
    // 按难度排序
    return bis.sort((a, b) => a.star - b.star);
  }
}

module.exports = SayabotApi;
