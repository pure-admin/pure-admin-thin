<script setup lang="ts">
import { ref, onMounted } from "vue";
import { http } from "@/utils/http";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";

const showDropdown = ref(false);

const getStatLabel = (key: string): string => {
  const labels: { [key: string]: string } = {
    totalProjects: "项目总数",
    unscanned: "未扫描",
    outdatedScans: "未更新扫描",
    scanned: "已扫描"
  };
  return labels[key] || key;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

const projectStats = ref({
  totalProjects: 0,
  unscanned: 0,
  outdatedScans: 0,
  scanned: 0
});

interface Project {
  name: string;
  status: string;
  riskLevel: string;
  lastUpdate: string;
  lastScan: string;
  riskDistribution: string;
  scanType: string;
  scanTime: string;
  projectSource: string;
}

const _projects = ref([
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

const projects = ref<Project[]>([]);

const getProjectList = async params => {
  var query = new URLSearchParams(params).toString();
  var ret = [];
  await http
    .request<any[]>("get", "/project/api/project/v1/getprojlist?" + query)
    .then(resSets => {
      // projects.value = res;
      for (let i = 0; i < resSets.length; i++) {
        ret.push(resSets[i]);
      }
    });
  return ret;
};

const fetchProjects = async () => {
  projects.value = [];
  var res = await getProjectList({ userUUID: "5" });
  var unScanned = 0;
  var outdatedScans = 0;
  var scanned = 0;
  console.log(res);
  for (let i = 0; i < res.length; i++) {
    if (res[i].lastScanStatus == null) unScanned++;
    else if (res[i].lastScanStatus == "outdated") outdatedScans++;
    else if (res[i].lastScanStatus == "scanned") scanned++;
    projects.value.push({
      name: res[i].projectName,
      status: res[i].lastScanStatus,
      riskLevel: null,
      lastUpdate: res[i].lastUpdateTime,
      lastScan: res[i].lastScanTime,
      riskDistribution: null,
      scanType: null,
      scanTime: null,
      // TODO: 项目地址和来源
      projectSource: null
    });
  }
  projectStats.value.totalProjects = res.length;
  projectStats.value.unscanned = unScanned;
  projectStats.value.outdatedScans = outdatedScans;
  projectStats.value.scanned = scanned;
};

onMounted(async () => {
  fetchProjects();
});
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
      <el-dropdown>
        <el-button type="primary" size="large" class="new_btn">
          + 新建项目<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>从文件上传</el-dropdown-item>
            <el-dropdown-item>从远程仓库导入</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button class="refresh_btn" size="large" @click="fetchProjects"
        >刷新项目列表</el-button
      >
    </div>
    <div class="filter-container">
      <input type="text" placeholder="选择搜索类型(ID或name或者tags)" />
      <input type="text" placeholder="根据搜索类型搜索" />
    </div>
    <table class="project-table">
      <thead>
        <tr>
          <th>项目名称</th>
          <th>状态</th>
          <th>风险等级</th>
          <th>最近一次更新时间</th>
          <th>最近一次扫描时间</th>
          <th>风险分布</th>
          <th>扫描类别</th>
          <th>扫描耗费时间</th>
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
          <td>
            {{
              project.lastUpdate == null ? null : formatDate(project.lastUpdate)
            }}
          </td>
          <td>
            {{ project.lastScan == null ? null : formatDate(project.lastScan) }}
          </td>
          <td>{{ project.riskDistribution }}</td>
          <td>{{ project.scanType }}</td>
          <td>{{ project.scanTime }}</td>
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

.new_btn {
  color: white;
  background: #4caf50;
  border: #4caf50;
}

.new_btn:hover {
  background: #3e8e41;
}

.refresh_btn {
  margin-left: 20px;
  color: white;
  background: #409eff;
}

.refresh_btn:hover {
  background: #2a80eb;
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
