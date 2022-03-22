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
    <br />
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
  </div>
</template>

<script>
import PPCal from "@/common/js/ManiaPPCal";
import SayobotApi from "@/common/js/SayobotApi";
import { ElButton, ElInputNumber } from "element-plus";

export default {
  components: {
    ElButton,
    ElInputNumber,
  },
  name: "SayobotFastView",
  data() {
    return {
      bid: 1234567,
      sr: 8,
      od: 8,
      objCount: 2000,
      score: 1000000,
      pp: this.$i18n.messages[this.$i18n.locale].message.info_enter_data,
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
  },
};
</script>

<style scoped>
span {
  padding: 12px 2px;
  font-size: 20px;
}
</style>
