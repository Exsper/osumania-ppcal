<template>
  <div>
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
    <span> {{ $t("message.option_objCount") }} {{ objCount }}</span>
    <br />
    <span>Acc: </span>
    <el-input-number
      controls-position="right"
      class="mx-4"
      v-model="acc"
      :min="0"
      :max="100"
      :precision="2"
      :step="1"
      @input="cal"
    />
    <span>% </span>
    <span> （ 换算Acc: {{ cacc }} ）</span>
    <br />
    <span>彩300数量：</span>
    <el-input-number
      class="mx-4"
      :min="0"
      :step="200"
      v-model="numGeki"
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
      objCount: 2000,
      acc: 96.0,
      cacc: "0",
      numGeki: 0,
      pp: this.$i18n.messages[this.$i18n.locale].message.info_enter_data,

      plotlyReady: true,
    };
  },
  methods: {
    cal() {
      if (this.numGeki > this.objCount) {
        this.numGeki = this.objCount;
        this.acc = 100.0;
      }
      let data = {
        sr: this.sr,
        objCount: this.objCount,
        isEZ: this.isEZ,
        isNF: this.isNF,
        acc: this.acc / 100.0,
        numGeki: this.numGeki,
      };
      let pc = new PPCal(data);
      this.cacc = (pc.cacc * 100).toFixed(2) + "%";
      this.pp = pc.totalValue.toFixed(2);
      if (!window.Plotly) {
        this.plotlyReady = false;
      } else {
        this.plotlyReady = true;
        let di = new DrawInfo(data);
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
