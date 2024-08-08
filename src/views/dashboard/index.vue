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
import Card from "@/components/Card/Card.vue";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const projectInfo = ref({
  projects: 32,
  repositories: 60,
  scanTimes: 10,
  scanFiles: 62655
});

const vulnerabilities = ref([
  { id: "CVE-2024-9999", description: "发生堆缓冲区溢出攻击" },
  { id: "CVE-123456", description: "发布在一天之前 2024-7-23 11:44" }
]);

const recentScansData = ref({
  labels: ["一月", "二月", "三月", "四月", "五月"],
  datasets: [
    {
      label: "软件成分分析",
      backgroundColor: "#72a4d2",
      data: [613, 448, 540, 652, 977]
    },
    {
      label: "静态代码扫描(SAST)",
      backgroundColor: "#8cd17d",
      data: [138, 936, 777, 590, 54]
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
</script>
<!--<template>-->
<!--  <div class="dashboard">-->
<!--    <h1>软件安全赋能平台</h1>-->
<!--    <div class="status-overview">-->
<!--      <div class="project-info">-->
<!--        <h2>项目信息</h2>-->
<!--        <div class="info-box">-->
<!--          <p>项目数量(个): {{ projectInfo.projects }}</p>-->
<!--          <p>仓库数量(个): {{ projectInfo.repositories }}</p>-->
<!--          <p>扫描次数: {{ projectInfo.scanTimes }}</p>-->
<!--          <p>扫描文件数量: {{ projectInfo.scanFiles }}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="vulnerabilities">-->
<!--        <h2>最新漏洞与补丁提示</h2>-->
<!--        <ul>-->
<!--          <li v-for="vulnerability in vulnerabilities" :key="vulnerability.id">-->
<!--            {{ vulnerability.id }}: {{ vulnerability.description }}-->
<!--          </li>-->
<!--        </ul>-->
<!--      </div>-->
<!--      <div class="recent-scans">-->
<!--        <h2>近期扫描趋势</h2>-->
<!--        <Bar :data="recentScansData" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="details">-->
<!--      <div class="issues-ranking">-->
<!--        <h2>违规问题排行</h2>-->
<!--        <Bar :data="issuesRankingData" />-->
<!--      </div>-->
<!--      <div class="app-ranking">-->
<!--        <h2>违规应用排行</h2>-->
<!--        <Bar :data="appRankingData" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<template>
  <div class="dashboard">
    <div class="grid-container">
      <Card title="项目信息">
        <div class="info-box">
          <p>项目数量(个): {{ projectInfo.projects }}</p>
          <p>仓库数量(个): {{ projectInfo.repositories }}</p>
          <p>扫描次数: {{ projectInfo.scanTimes }}</p>
          <p>扫描文件数量: {{ projectInfo.scanFiles }}</p>
        </div>
      </Card>
      <Card title="最新漏洞与补丁提示">
        <ul>
          <li v-for="vulnerability in vulnerabilities" :key="vulnerability.id">
            {{ vulnerability.id }}: {{ vulnerability.description }}
          </li>
        </ul>
      </Card>
      <Card title="近期扫描趋势">
        <Bar :data="recentScansData" />
      </Card>
      <Card title="违规问题排行">
        <Bar :data="issuesRankingData" />
      </Card>
      <Card title="违规应用排行">
        <Bar :data="appRankingData" />
      </Card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  padding: 20px;
  background-color: #f4f5f7;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px; /* Reduce the gap to make cards closer */
}

.info-box p {
  margin: 10px 0;
}

ul {
  padding: 0;
  list-style: none;
}

ul li {
  padding: 10px;
  margin-bottom: 5px; /* Reduce margin for a tighter look */
  background: #f2f2f2;
  border-radius: 4px;
}
</style>
