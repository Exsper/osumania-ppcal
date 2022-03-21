<template>
  <div class="home">
    <span> {{ $t("message.option_sayo_only_mania_no_mod") }}</span>
    <br />
    <span>bid：</span>
    <input v-model.number="bid" />
    <button @click="getData">
      {{ $t("message.button_get_data_from_sayo") }}
    </button>
    <br />
    <span> {{ $t("message.option_stars") }} ★{{ sr }}</span>
    <br />
    <span> {{ $t("message.option_od") }} {{ od }}</span>
    <br />
    <span> {{ $t("message.option_objCount") }} {{ objCount }}</span>
    <br />
    <span>{{ $t("message.option_score") }}</span>
    <input class="mid" v-model.number="score" @input="cal" />
    <br />
    <span>PP：{{ pp }}</span>
  </div>
</template>

<script>
import PPCal from "@/common/js/ManiaPPCal";
import SayobotApi from "@/common/js/SayobotApi";

export default {
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
        console.log(data);
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
input.mid {
  width: 80px;
}
button {
  width: 120px;
  height: 35px;
  margin: 7px;
  font-size: 14px;
  text-align: center;
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
</style>
