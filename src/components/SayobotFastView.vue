<template>
  <div class="home">
    <span> {{ $t("message.option_sayo_only_mania_no_mod") }}</span>
    <br />
    <span>bid：</span>
    <el-input-number
      :controls="false"
      class="mx-4"
      v-model="bid"
      @input="cal"
    />
    <el-button type="primary" @click="getData">
      {{ $t("message.button_get_data_from_sayo") }}
    </el-button>
    <el-button type="primary" @click="setSearchPanel">我不知道bid</el-button>
    <br />
    <SearchPanel
      v-if="showSearchPanel"
      @selectBid="selectBid"
      @removeSearchPanel="removeSearchPanel"
    />
    <span> {{ $t("message.option_stars") }} ★{{ sr }}</span>
    <br />
    <span> {{ $t("message.option_od") }} {{ od }}</span>
    <br />
    <span> {{ $t("message.option_objCount") }} {{ objCount }}</span>
    <br />
    <span>{{ $t("message.option_score") }}</span>
    <el-input-number
      class="mx-4"
      :min="0"
      :max="1000000"
      :step="100000"
      v-model="score"
      @input="cal"
    />
    <br />
    <span>PP：{{ pp }}</span>
    <br />
    <span v-bind:hidden="plotlyReady">折线图模块加载中....</span>
    <div id="graph" v-bind:hidden="plotlyReady === false"></div>
  </div>
</template>

<script>
import { PPCal, DrawInfo } from "@/common/js/ManiaPPCal";
import SayobotApi from "@/common/js/SayobotApi";
import SearchPanel from "@/components/SearchPanel.vue";

export default {
  components: {
    SearchPanel,
  },
  name: "SayobotFastView",
  setup() {
    if (!window.Plotly) {
      let element = document.createElement("script");
      //element.setAttribute("src", "https://cdn.plot.ly/plotly-latest.min.js");
      element.setAttribute(
        "src",
        "https://cdn.staticfile.org/plotly.js/1.58.5/plotly.min.js"
      );
      document.getElementsByTagName("head")[0].appendChild(element);
      /*
    element.onload = function () {
      this.plotlyReady = true;
    };
    */
    }
  },
  data() {
    return {
      showSearchPanel: false,

      bid: 1234567,
      sr: 8,
      od: 8,
      objCount: 2000,
      score: 1000000,
      pp: this.$i18n.messages[this.$i18n.locale].message.info_enter_data,

      plotlyReady: true,
    };
  },
  methods: {
    cal() {
      let data = {
        isConvert: false,
        sr: this.sr,
        od: this.od,
        objCount: this.objCount,
        isHR: false,
        isEZ: false,
        isDT: false,
        isHT: false,
        isNF: false,
        score: this.score,
      };
      let pc = new PPCal(data);
      this.pp = pc.totalValue.toFixed(2);
      if (!window.Plotly) {
        this.plotlyReady = false;
      } else {
        this.plotlyReady = true;
        let di = new DrawInfo(data, pc.maxScore);
        window.Plotly.newPlot("graph", [di.getTrace()], di.getLayout(), {
          scrollZoom: true,
          responsive: true,
        });
      }
    },
    async getData() {
      try {
        let data = await SayobotApi.search(this.bid);
        this.sr = data.sr;
        this.od = data.od;
        this.objCount = data.objCount;
        this.cal();
      } catch (ex) {
        this.pp = ex;
      }
    },
    setSearchPanel() {
      this.showSearchPanel = true;
    },
    selectBid(beatmapData) {
      this.bid = beatmapData.bid;
      this.sr = beatmapData.sr;
      this.od = beatmapData.od;
      this.objCount = beatmapData.objCount;
      this.removeSearchPanel();
      this.cal();
    },
    removeSearchPanel() {
      this.showSearchPanel = false;
    },
  },
};
</script>

<style scoped>
span {
  padding: 12px 2px;
  font-size: 20px;
}
#graph {
  width: 538px;
}
</style>
