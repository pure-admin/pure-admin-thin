<!-- src/components/ProjectDetails.vue -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const projectName = ref("");

onMounted(() => {
  projectName.value = route.params.name as string;
});

const projectDetails = ref({
  creator: "Asiv",
  createTime: "2024-7-11 15:30:46",
  team: "Asiv's Team",
  scanDetails: {
    softwareComposition: {
      scanTimes: "0x111",
      avgScanTime: "20s",
      sourceBranch: "main"
    },
    componentCount: 23,
    vulnerabilities: 0,
    licenses: 0
  }
});
</script>

<template>
  <div class="project-details">
    <h1>项目详情: {{ projectName }}</h1>
    <p>创建人: {{ projectDetails.creator }}</p>
    <p>创建时间: {{ projectDetails.createTime }}</p>
    <p>团队: {{ projectDetails.team }}</p>

    <h2>扫描详情</h2>
    <div class="scan-info">
      <p>
        软件成分分析扫描次数:
        {{ projectDetails.scanDetails.softwareComposition.scanTimes }}
      </p>
      <p>
        平均扫描时间:
        {{ projectDetails.scanDetails.softwareComposition.avgScanTime }}
      </p>
      <p>
        源代码分支:
        {{ projectDetails.scanDetails.softwareComposition.sourceBranch }}
      </p>
    </div>

    <h2>组件信息</h2>
    <p>组件数量: {{ projectDetails.scanDetails.componentCount }}</p>
    <p>漏洞数: {{ projectDetails.scanDetails.vulnerabilities }}</p>
    <p>许可证数量: {{ projectDetails.scanDetails.licenses }}</p>
  </div>
</template>

<style scoped lang="scss">
.project-details {
  padding: 20px;
}

.scan-info {
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
