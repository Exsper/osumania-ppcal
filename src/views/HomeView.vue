<template>
  <div>
    <span>{{ $t("message.option_stars_with_mods") }} ★</span>
    <el-input-number
      controls-position="right"
      class="mx-4"
      v-model="sr"
      :min="0"
      :precision="2"
      :step="0.1"
      @input="cal"
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
    <el-row :gutter="20" align="middle">
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
    </el-row>
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
      sr: 5,
      objCount: 1000,
      isEZ: false,
      isNF: false,
      pp: this.$i18n.messages[this.$i18n.locale].message.info_enter_data,
      acc: 96.0,
      cacc: "0",
      numGeki: 0,
      plotlyReady: true,
    };
  },
  methods: {
    cal() {
      if (this.objCount <= 0) {
        this.pp = "请输入正确的参数";
        return;
      }
      if (this.numGeki > this.objCount) {
        this.numGeki = this.objCount;
        this.acc = 100.0;
      }
      // 已知物件数和彩300数，计算acc最小值（所有非彩均为miss）
      // this.minAcc = ((this.numGeki / this.objCount) * 100).toFixed(2) + "%";
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
    changeEZ() {
      this.isEZ = !this.isEZ;
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
