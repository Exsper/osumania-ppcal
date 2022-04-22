<template>
  <div>
    <span>总分：</span>
    <el-input-number
      class="mx-4"
      :min="0"
      :step="1"
      v-model="totalScore"
      :controls="false"
      @input="changePC"
    />
    <br />
    <br />
    <span>每个成绩大概得分：</span>
    <el-input-number
      class="mx-4"
      :min="0"
      :max="1000000"
      :step="50000"
      v-model="scorePerPC"
    />
    <br />
    <span>或者由PC数计算，PC数：</span>
    <el-input-number
      class="mx-4"
      :min="0"
      :step="1"
      v-model="pc"
      @input="changePC"
    />
    <br />
    <br />
    <span>对比等级（填0则默认下一级）</span>
    <el-input-number class="mx-4" :min="0" :step="1" v-model="compareLevel" />
    <br />
    <br />
    <el-button type="primary" @click="cal">计算</el-button>
    <br />
    <br />
    <span>{{ result }}</span>
  </div>
</template>

<script>
import getNextExpRequire from "../common/js/ManiaLevel";

export default {
  name: "LevelRequire",
  data() {
    return {
      totalScore: 0,
      scorePerPC: 1000000,
      pc: 0,
      compareLevel: 0,
      result: "",
    };
  },
  methods: {
    changePC() {
      if (this.pc > 0) this.scorePerPC = parseInt(this.totalScore / this.pc);
    },
    cal() {
      try {
        let r = getNextExpRequire(
          this.totalScore,
          this.scorePerPC,
          this.compareLevel
        );
        this.result = r;
      } catch (ex) {
        this.result = ex;
      }
    },
  },
};
</script>

<style scoped>
span {
  padding: 12px 2px;
  font-size: 20px;
}
</style>
