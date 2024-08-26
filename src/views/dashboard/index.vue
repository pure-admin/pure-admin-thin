<script setup lang="ts">
import { ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import VulnerabilityCard from "@/views/dashboard/components/VulnerabilityCard.vue";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const projectInfo = ref({
  projects: 32,
  repositories: 60,
  scanTimes: 10,
  scanFiles: 62655
});
const recentScansData = ref({
  labels: ["一月", "二月", "三月", "四月", "五月"],
  datasets: [
    {
      label: "软件成分分析",
      backgroundColor: "#ff6384",
      data: [20, 42, 37, 45, 54]
    },
    {
      label: "Fuzz测试",
      backgroundColor: "#36a2eb",
      data: [12, 23, 34, 45, 56]
    },
    {
      label: "静态代码分析",
      backgroundColor: "#33bb33",
      data: [32, 45, 23, 54, 32]
    }
  ]
});

const issuesRankingData = ref({
  labels: ["TypeError", "IndexError", "ValueError"],
  datasets: [
    {
      label: "违规问题",
      backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
      data: [582, 421, 747]
    }
  ]
});

const appRankingData = ref({
  labels: ["TestGood", "Remix", "App2", "阿坡坡", "A泡泡"],
  datasets: [
    {
      label: "致命",
      backgroundColor: "#ff6384",
      data: [61, 54, 77, 65, 54]
    },
    {
      label: "严重",
      backgroundColor: "#36a2eb",
      data: [44, 44, 31, 59, 12]
    },
    {
      label: "重要",
      backgroundColor: "#ffcd56",
      data: [13, 13, 65, 43, 97]
    }
  ]
});
const radio3 = ref("静态代码分析");
</script>
<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card class="top-card">
          <div class="card-title">应用信息</div>
          <div class="app-info">
            <div class="app-card">
              <div class="right-info">
                <div class="proj">项目数量(个)</div>
                <div
                  class="proj-num"
                  style="font-size: 14px; font-weight: bold; color: #47f"
                >
                  {{ projectInfo.projects }}
                </div>
              </div>
            </div>
            <div class="app-card">
              <div class="right-info">
                <div class="repo">仓库数量(个)</div>
                <div
                  class="repo-num"
                  style="font-size: 14px; font-weight: bold; color: #87f"
                >
                  {{ projectInfo.repositories }}
                </div>
              </div>
            </div>
            <div class="app-card">
              <div class="right-info">
                <div class="scan">扫描次数(次)</div>
                <div
                  class="scan-num"
                  style="font-size: 14px; font-weight: bold; color: #f83"
                >
                  {{ projectInfo.scanTimes }}
                </div>
              </div>
            </div>
            <div class="app-card">
              <div class="right-info">
                <div class="file">扫描文件数量(个)</div>
                <div
                  class="file-num"
                  style="font-size: 14px; font-weight: bold; color: #3b6"
                >
                  {{ projectInfo.scanFiles }}
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="top-card">
          <div class="card-title">最新漏洞与补丁提示</div>
          <vulnerability-card />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="top-card">
          <div class="card-title">近期扫描趋势</div>
          <Bar :data="recentScansData" />
        </el-card>
      </el-col>
    </el-row>
    <div style="margin: 6px 0 2px">
      <el-radio-group v-model="radio3" size="small">
        <el-radio-button label="静态代码分析" />
        <el-radio-button label="架构一致性" />
        <el-radio-button label="软件物料" />
      </el-radio-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard >>> .el-card {
  margin-bottom: 8px;
}

.top-card {
  width: 100%;
  height: 30vh;
  margin-bottom: 8px;
}

.card-title {
  margin-bottom: 0 !important;
  font-weight: 600;
}

.app-info {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}

.app-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: calc(50% - 5px);
  height: 10vh;
  padding: 0.3vw;
  margin-top: 6px;
  margin-bottom: 4px;
  background-color: #fff;
  border: 1px solid #dde;
  border-radius: 6px;
}

.app-card > .right-info {
  width: 140px;
  font-size: 14px;
}
</style>
