<template>
  <div>
    <el-checkbox v-model="isConvert" @change="cal" size="large" border>
      {{ $t("message.option_mapIsConvert") }}
    </el-checkbox>
    <span v-bind:hidden="isConvert === false">{{
      $t("message.option_mapKeys")
    }}</span>
    <input
      class="short"
      v-model.number="mapKeys"
      @input="changeMapKeys"
      v-bind:hidden="isConvert === false"
    />
    <span v-bind:hidden="isConvert === false">{{
      $t("message.option_playKeys")
    }}</span>
    <input
      class="short"
      v-model.number="playKeys"
      @input="cal"
      v-bind:hidden="isConvert === false"
    />
    <br />
    <span>{{ $t("message.option_stars_with_mods") }} ★</span>
    <el-input-number
      controls-position="right"
      class="mx-4"
      v-model="sr"
      :precision="2"
      :step="0.1"
      @input="cal"
    />
    <br />
    <span>{{ $t("message.option_od_without_mods") }} OD</span>
    <input class="short" v-model.number="od" @input="OD2ModOD" />
    <span v-bind:hidden="!(isHR === true || isEZ === true)"
      >{{ $t("message.option_od_with_mods") }} OD</span
    >
    <input
      class="short"
      v-bind:hidden="!(isHR === true || isEZ === true)"
      v-model.number="od_mod"
      @input="ModOD2OD"
    />
    <br />
    <span>{{ $t("message.option_objCount") }}</span>
    <el-input-number
      class="mx-4"
      :min="0"
      :step="200"
      v-model="objCount"
      @input="cal"
    />
    <br />
    <el-row :gutter="20">
      <el-col :span="3"><span>Mods：</span></el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          plain
          :class="isEZ ? 'checkedmod' : ''"
          @click="changeEZ"
          >EZ</el-button
        ></el-col
      >
      <el-col :span="2">
        <el-button
          type="primary"
          plain
          :class="isNF ? 'checkedmod' : ''"
          @click="changeNF"
          >NF</el-button
        ></el-col
      >
      <el-col :span="2">
        <el-button
          type="primary"
          plain
          :class="isHT ? 'checkedmod' : ''"
          @click="changeHT"
          >HT</el-button
        ></el-col
      >
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2" :offset="3">
        <el-button
          type="primary"
          plain
          :class="isHR ? 'checkedmod' : ''"
          @click="changeHR"
          >HR</el-button
        ></el-col
      >
      <el-col :span="2" :offset="2">
        <el-button
          type="primary"
          plain
          :class="isDT ? 'checkedmod' : ''"
          @click="changeDT"
          >DT</el-button
        ></el-col
      >
    </el-row>

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
    <span>{{ $t("message.option_maxScore") }}{{ maxScore }}</span>
    <br />
    <br />
    <span>PP：{{ pp }}</span>
    <br />
    <span v-bind:hidden="plotlyReady">折线图模块加载中....</span>
    <div id="graph" v-bind:hidden="plotlyReady === false"></div>
  </div>
</template>

<script>
import { PPCal, DrawInfo } from "@/common/js/ManiaPPCal";

export default {
  name: "HomeView",
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
      isConvert: false,
      mapKeys: 4,
      playKeys: 4,
      sr: 5,
      od: 8,
      od_mod: 8,
      objCount: 1000,
      isHR: false,
      isEZ: false,
      isDT: false,
      isHT: false,
      isNF: false,
      score: 1000000,
      pp: this.$i18n.messages[this.$i18n.locale].message.info_enter_data,
      maxScore: 1000000,

      plotlyReady: true,
    };
  },
  methods: {
    OD2ModOD() {
      if (this.isEZ) this.od_mod = this.od / 2;
      else if (this.isHR) this.od_mod = Math.min(this.od * 1.4, 10).toFixed(2);
      else this.od_mod = this.od;
      this.cal();
    },
    ModOD2OD() {
      if (this.isEZ) this.od = this.od_mod * 2;
      else if (this.isHR) {
        if (this.od_mod >= 10) this.od = "???";
        else this.od = (this.od_mod / 1.4).toFixed(2);
      } else this.od = this.od_mod;
      this.cal();
    },
    changeMapKeys() {
      this.playKeys = this.mapKeys;
      this.cal();
    },
    cal() {
      if (this.od === "???") this.pp = "???";
      else {
        let data = {
          isConvert: this.isConvert,
          mapKeys: this.mapKeys,
          playKeys: this.playKeys,
          sr: this.sr,
          od: this.od,
          objCount: this.objCount,
          isHR: this.isHR,
          isEZ: this.isEZ,
          isDT: this.isDT,
          isHT: this.isHT,
          isNF: this.isNF,
          score: this.score,
        };
        let pc = new PPCal(data);
        this.pp = pc.totalValue.toFixed(2);
        this.maxScore = pc.maxScore;
        if (this.score > this.maxScore) {
          this.score = this.maxScore;
          this.cal();
          return;
        } else if (this.score === this.maxScore / 2) {
          this.score = this.maxScore;
          this.cal();
          return;
        }
        if (!window.Plotly) {
          this.plotlyReady = false;
        } else {
          this.plotlyReady = true;
          let di = new DrawInfo(data, this.maxScore);
          window.Plotly.newPlot("graph", [di.getTrace()], di.getLayout(), {
            scrollZoom: true,
            responsive: true,
          });
        }
      }
    },
    changeHR() {
      this.isHR = !this.isHR;
      this.isEZ = false;
      this.OD2ModOD();
    },
    changeEZ() {
      this.isEZ = !this.isEZ;
      this.isHR = false;
      this.OD2ModOD();
    },
    changeDT() {
      this.isDT = !this.isDT;
      this.isHT = false;
      this.cal();
    },
    changeHT() {
      this.isHT = !this.isHT;
      this.isDT = false;
      this.cal();
    },
    changeNF() {
      this.isNF = !this.isNF;
      this.cal();
    },
  },
};
</script>

<style scoped>
input.mid {
  width: 80px;
}
input.short {
  width: 40px;
}
button {
  width: 35px;
  height: 35px;
  margin: 7px;
  font-size: 14px;
  text-align: center;
}
button:focus {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
button.checkedmod {
  width: 45px;
  height: 45px;
  margin: 2px;
  font-size: 18px;
  color: #ffffff;
  background-color: var(--el-color-primary);
}
span {
  padding: 12px 2px;
  font-size: 20px;
}
input {
  height: 20px;
  font-size: 16px;
  margin: 7px 3px 7px 0;
}
#graph {
  width: 538px;
}
</style>
