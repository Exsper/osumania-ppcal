<template>
  <div class="searchpanel">
    <span>请输入关键词：</span><input v-model="keyword" />
    <el-button type="primary" @click="setBeatmapSetTableData">搜索</el-button>
    <el-button type="primary" @click="close">关闭</el-button>
    <br />
    <span>{{ warnText }}</span>
    <el-table
      :data="beatmapSetTableData"
      stripe
      style="width: 100%"
      v-bind:hidden="selectBidMode"
      size="small"
    >
      <el-table-column prop="sid" label="sid" width="70" />
      <el-table-column width="50">
        <template v-slot="thumbScope">
          <img :src="thumbScope.row.thumb" width="50" height="37" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="80" />
      <el-table-column prop="title" label="Title" />
      <el-table-column prop="creator" label="Creator" width="80" />
      <el-table-column fixed="right" width="50">
        <template #default="setScope">
          <el-button
            type="text"
            size="small"
            @click.prevent="selectSet(setScope.row.sid)"
            >选择</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table
      :data="beatmapTableData"
      stripe
      style="width: 100%"
      v-bind:hidden="!selectBidMode"
      size="small"
    >
      <el-table-column prop="bid" label="bid" width="100" />
      <el-table-column prop="version" label="Difficulty" />
      <el-table-column prop="keys" label="Keys" width="60" />
      <el-table-column prop="star" label="Stars" width="80" />
      <el-table-column fixed="right" width="50">
        <template #default="bidScope">
          <el-button
            type="text"
            size="small"
            @click.prevent="selectBid(bidScope.row.bid)"
            >选择</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import SayobotApi from "@/common/js/SayobotApi";

export default {
  name: "SearchPanel",
  data() {
    return {
      keyword: "",
      warnText: "",
      beatmapSetTableData: [],
      beatmapTableData: [],
      selectBidMode: false,
    };
  },
  methods: {
    async setBeatmapSetTableData() {
      try {
        this.selectBidMode = false;
        this.beatmapSetTableData = [];
        let data = await SayobotApi.searchBeatmapSetList(this.keyword);
        data.map((beatmapset) => {
          this.beatmapSetTableData.push(beatmapset.toTableData());
        });
        this.warnText = "";
      } catch (ex) {
        this.warnText = ex;
      }
    },
    async selectSet(sid) {
      try {
        this.beatmapTableData = [];
        let data = await SayobotApi.searchBeatmapList(sid);
        data.map((beatmapInfo) => {
          this.beatmapTableData.push(beatmapInfo.toTableData());
        });
        this.warnText = "";
        this.selectBidMode = true;
      } catch (ex) {
        this.warnText = ex;
      }
    },
    selectBid(bid) {
      let beatmapData = this.beatmapTableData.find((data) => data.bid === bid);
      this.$emit("selectBid", beatmapData);
    },
    close() {
      this.$emit("removeSearchPanel");
    },
  },
};
</script>

<style scoped>
.searchpanel {
  padding: 5px;
}
</style>
