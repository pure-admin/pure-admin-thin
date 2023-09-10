<script setup lang="ts">
import AnnouncementCard from "./AnnouncementCard/index.vue";
import InfoCard from "./InfoCard/index.vue";
import PolicyCard from "./PolicyCard/index.vue";
import UserInformationCard from "./UserInformationCard/index.vue";
defineOptions({
  name: "welcome"
});
</script>

<template>
  <div class="home">
    <el-row>
      <el-col :span="24">
        <AnnouncementCard />
      </el-col>
    </el-row>
    <el-row :gutter="48" class="el-line flex" align="middle">
      <el-col :xs="24" :sm="6">
        <InfoCard
          icon="logos:google-photos"
          width="54px"
          height="48px"
          text="相册数量:0"
        />
      </el-col>
      <el-col :xs="24" :sm="6">
        <InfoCard
          icon="icon-park-twotone:hard-disk"
          width="54px"
          height="48px"
          text="已用存储:10MB"
        />
      </el-col>
      <el-col :xs="24" :sm="6">
        <InfoCard
          icon="icon-park:hard-disk"
          width="54px"
          height="48px"
          text="可用存储:300MB"
        />
      </el-col>
      <el-col :xs="24" :sm="6">
        <InfoCard
          icon="icon-park:solid-state-disk"
          width="54px"
          height="48px"
          text="总储存:3000MB"
        />
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row class="policy-box" style="margin-top: 18px" :gutter="12">
      <el-col :xs="24" :sm="16">
        <PolicyCard />
      </el-col>
      <el-col :xs="24" :sm="8">
        <UserInformationCard />
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-card {
  width: 100%;
  margin-bottom: 10px;
}

.text {
  align-items: center;
  height: 5px;
  font-size: 14px;
}

.item {
  margin-bottom: 5px;
}

.el-line {
  /* 元素 居中 */
  align-items: center;
  margin-top: 10px;
}

.icon-text {
  display: flex;
  align-items: center;
}

.card-style {
  display: flex;
  padding: 10px;
  background-color: #f5f7fa;
  border-radius: 5px;
}

.span-style {
  margin-left: 10px;
  font-size: 16px;
}

@media screen and (width <= 768px) {
  .card-style {
    margin-bottom: 10px;
  }
}
</style>
