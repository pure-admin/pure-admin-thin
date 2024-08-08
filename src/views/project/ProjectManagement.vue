<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const getStatLabel = (key: string): string => {
  const labels: { [key: string]: string } = {
    totalProjects: "项目总数",
    scanTimes: "扫描次数",
    unscanned: "未扫描",
    outdatedScans: "未更新扫描",
    scanned: "已扫描"
  };
  return labels[key] || key;
};

const projectStats = ref({
  totalProjects: 32,
  scanTimes: 9,
  unscanned: 2,
  outdatedScans: 4,
  scanned: 4
});

const projects = ref([
  {
    name: "TestProject",
    status: "已更新",
    riskLevel: "严重",
    lastScan: "2024-7-12",
    riskDistribution: "高-2-中-1-低-3",
    scanType: "软件成分分析",
    scanTime: "20s",
    projectLink: "github.com/a/b",
    projectSource: "Github"
  }
]);

const router = useRouter();

const navigateToDetails = () => {
  router.push({ path: "/project/detail" });
};
</script>
<template>
  <div class="project-management">
    <div class="stats-container">
      <div v-for="(value, key) in projectStats" :key="key" class="stat-card">
        <p>{{ getStatLabel(key) }}</p>
        <h2>{{ value }}</h2>
      </div>
    </div>
    <div class="actions">
      <button class="btn">+ 新建项目</button>
    </div>
    <div class="filter-container">
      <input type="text" placeholder="选择搜索类型(ID或name或者tags)" />
      <input type="text" placeholder="根据搜索类型搜索" />
    </div>
    <table class="project-table">
      <thead>
        <tr>
          <th>项目名称</th>
          <th>更新状态</th>
          <th>风险等级</th>
          <th>最近一次扫描时间</th>
          <th>风险分布</th>
          <th>扫描类别</th>
          <th>扫描耗费时间</th>
          <th>项目地址</th>
          <th>项目来源</th>
          <th>扫描</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.name">
          <td>
            <a href="#" @click.prevent="navigateToDetails">
              {{ project.name }}
            </a>
          </td>
          <td>{{ project.status }}</td>
          <td>{{ project.riskLevel }}</td>
          <td>{{ project.lastScan }}</td>
          <td>{{ project.riskDistribution }}</td>
          <td>{{ project.scanType }}</td>
          <td>{{ project.scanTime }}</td>
          <td>
            <a
              :href="'https://' + project.projectLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ project.projectLink }}
            </a>
          </td>
          <td>{{ project.projectSource }}</td>
          <td><button class="scan-btn">扫描</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss">
.project-management {
  padding: 20px;
  background-color: #f4f5f7;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.stat-card {
  flex: 1;
  padding: 20px;
  margin: 0 10px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.actions {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  background: #4caf50;
  border: none;
  border-radius: 4px;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filter-container input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.project-table {
  width: 100%;
  border-collapse: collapse;
}

.project-table th,
.project-table td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}

.project-table th {
  background-color: #f2f2f2;
}

.project-table td a {
  color: #3498db;
  text-decoration: none;
  cursor: pointer;
}

.scan-btn {
  padding: 5px 10px;
  color: white;
  cursor: pointer;
  background: #3498db;
  border: none;
  border-radius: 4px;
}
</style>
