<template>
  <div class="home">
    <input type="checkbox" id="isConvert" v-model="isConvert" @change="cal" />
    <label for="isConvert">{{ $t("message.option_mapIsConvert") }}</label>
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
    <input class="short" v-model.number="sr" @input="cal" />
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
    <input class="mid" v-model.number="objCount" @input="cal" />
    <br />
    <span>Mods：</span>
    <button :class="isEZ ? 'checkedmod' : ''" @click="changeEZ">EZ</button>
    <button :class="isHT ? 'checkedmod' : ''" @click="changeHT">HT</button>
    <button :class="isNF ? 'checkedmod' : ''" @click="changeNF">NF</button>
    <br />
    <span>Mods：</span>
    <button :class="isHR ? 'checkedmod' : ''" @click="changeHR">HR</button>
    <button :class="isDT ? 'checkedmod' : ''" @click="changeDT">DT</button>
    <br />
    <span>{{ $t("message.option_score") }}</span>
    <input class="mid" v-model.number="score" @input="cal" />
    <span>{{ $t("message.option_maxScore") }}{{ maxScore }}</span>
    <br />
    <br />
    <span>PP：{{ pp }}</span>
  </div>
</template>

<script>
import PPCal from "@/common/js/ManiaPPCal";

export default {
  name: "HomeView",
  data() {
    return {
      isConvert: false,
      mapKeys: 4,
      playKeys: 4,
      sr: 8,
      od: 8,
      od_mod: 8,
      objCount: 2000,
      isHR: false,
      isEZ: false,
      isDT: false,
      isHT: false,
      isNF: false,
      score: 1000000,
      pp: this.$i18n.messages[this.$i18n.locale].message.info_enter_data,
      maxScore: 1000000,
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
        } else if (this.score === this.maxScore / 2) {
          this.score = this.maxScore;
          this.cal();
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
button.checkedmod {
  width: 45px;
  height: 45px;
  margin: 2px;
  font-size: 18px;
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
input[type="checkbox"] {
  width: 25px;
  height: 25px;
  text-align: center;
  vertical-align: sub;
  margin: 15px 0 12px 5px;
}
label {
  font-size: 20px;
  margin: 0 20px 0 0;
}
</style>
