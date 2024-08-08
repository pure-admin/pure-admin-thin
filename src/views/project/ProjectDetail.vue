<!-- src/components/ProjectDetails.vue -->
<template>
  <div class="project-details-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <h2>{{ projectName }}</h2>
          <p>创建人: {{ creator }}</p>
          <p>创建时间: {{ createTime }}</p>
        </el-col>
        <el-col :span="12" class="text-right">
          <el-button type="primary">扫描</el-button>
          <el-button>设置</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!--    <el-row :gutter="20" class="stats-row">-->
    <!--      <el-col :span="8">-->
    <!--        <div class="stats-card">-->
    <!--          <h3>组件版本数</h3>-->
    <!--          <div ref="componentVersionsChart" class="chart-container" />-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="stats-card">-->
    <!--          <h3>安全漏洞</h3>-->
    <!--          <div ref="securityIssuesChart" class="chart-container" />-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--      <el-col :span="8">-->
    <!--        <div class="stats-card">-->
    <!--          <h3>有许可证的组件版本数</h3>-->
    <!--          <div ref="licensedVersionsChart" class="chart-container" />-->
    <!--        </div>-->
    <!--      </el-col>-->
    <!--    </el-row>-->

    <el-tabs v-model="activeTab">
      <el-tab-pane label="软件依赖成分分析" name="1">
        <el-row :gutter="20">
          <el-col :span="8">
            <div ref="componentsChart" class="chart-container" />
          </el-col>
          <el-col :span="8">
            <div ref="securityChart" class="chart-container" />
          </el-col>
          <el-col :span="8">
            <div ref="licensedChart" class="chart-container" />
          </el-col>
        </el-row>
        <el-table :data="components" stripe>
          <el-table-column prop="name" label="组件" />
          <el-table-column prop="platform" label="管理平台" />
          <el-table-column prop="currentVersion" label="当前版本" />
          <el-table-column prop="latestVersion" label="最新版本" />
          <el-table-column prop="highRisk" label="高危" />
          <el-table-column prop="mediumRisk" label="中危" />
          <el-table-column prop="lowRisk" label="低危" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="源代码静态检测" name="2">
        <!-- 这里可以添加源代码静态检测的内容 -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

interface ComponentInfo {
  name: string;
  platform: string;
  currentVersion: string;
  latestVersion: string;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
}

const projectName = ref("NiceAsiv/TestCaseDroid");
const creator = ref("NiceAsiv");
const createTime = ref("2024-06-30, 6:13:43 PM");
const activeTab = ref("1");

const components = ref<ComponentInfo[]>([
  {
    name: "log4j-core",
    platform: "Maven",
    currentVersion: "2.14.1",
    latestVersion: "2.23.1",
    highRisk: 2,
    mediumRisk: 0,
    lowRisk: 1
  },
  {
    name: "htmlunit",
    platform: "Maven",
    currentVersion: "2.1",
    latestVersion: "2.70.0",
    highRisk: 1,
    mediumRisk: 0,
    lowRisk: 2
  },
  {
    name: "TestCaseDroid",
    platform: "Maven",
    currentVersion: "1.2",
    latestVersion: "1.0",
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0
  },
  {
    name: "maven-jar-plugin",
    platform: "Maven",
    currentVersion: "3.2.0",
    latestVersion: "4.0.0-beta-1",
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0
  },
  {
    name: "maven-assembly-plugin",
    platform: "Maven",
    currentVersion: "3.3.0",
    latestVersion: "3.7.1",
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0
  }
]);

const componentsChart = ref(null);
const securityChart = ref(null);
const licensedChart = ref(null);
const componentVersionsChart = ref(null);
const securityIssuesChart = ref(null);
const licensedVersionsChart = ref(null);

onMounted(() => {
  const componentsChartInstance = echarts.init(componentsChart.value);
  const securityChartInstance = echarts.init(securityChart.value);
  const licensedChartInstance = echarts.init(licensedChart.value);
  const componentVersionsChartInstance = echarts.init(
    componentVersionsChart.value
  );
  const securityIssuesChartInstance = echarts.init(securityIssuesChart.value);
  const licensedVersionsChartInstance = echarts.init(
    licensedVersionsChart.value
  );

  const componentsOption = {
    title: {
      text: "组件版本分布"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      top: "5%",
      left: "center"
    },
    series: [
      {
        name: "组件版本数",
        type: "pie",
        radius: "50%",
        data: [
          { value: 2, name: "不合规" },
          { value: 21, name: "合规" }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  const securityOption = {
    title: {
      text: "安全漏洞"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      top: "5%",
      left: "center"
    },
    series: [
      {
        name: "安全漏洞数",
        type: "pie",
        radius: "50%",
        data: [
          { value: 3, name: "高" },
          { value: 1, name: "中" },
          { value: 2, name: "低" },
          { value: 1, name: "未知" }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  const licensedOption = {
    title: {
      text: "许可证信息"
    },
    tooltip: {
      trigger: "item"
    },
    legend: {
      top: "5%",
      left: "center"
    },
    series: [
      {
        name: "许可证数",
        type: "pie",
        radius: "50%",
        data: [
          { value: 2, name: "不合规" },
          { value: 15, name: "合规" }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  };

  const componentVersionsOption = {
    xAxis: {
      type: "category",
      data: ["不合规", "合规"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [2, 21],
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: function (params) {
            var colorList = ["#f56c6c", "#67c23a"];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };

  const securityIssuesOption = {
    xAxis: {
      type: "category",
      data: ["高", "中", "低", "未知"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [3, 1, 2, 1],
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: function (params) {
            var colorList = ["#f56c6c", "#e6a23c", "#f39c12", "#909399"];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };

  const licensedVersionsOption = {
    xAxis: {
      type: "category",
      data: ["不合规", "合规"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [2, 15],
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: function (params) {
            var colorList = ["#f56c6c", "#67c23a"];
            return colorList[params.dataIndex];
          }
        }
      }
    ]
  };

  componentsChartInstance.setOption(componentsOption);
  securityChartInstance.setOption(securityOption);
  licensedChartInstance.setOption(licensedOption);
  componentVersionsChartInstance.setOption(componentVersionsOption);
  securityIssuesChartInstance.setOption(securityIssuesOption);
  licensedVersionsChartInstance.setOption(licensedVersionsOption);
});
</script>

<style scoped lang="scss">
.project-details-container {
  padding: 20px; /* 添加内边距 */
  margin-left: 20px; /* 添加左侧间隙 */
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.text-right {
  text-align: right;
}

.chart-container {
  height: 200px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.stats-row {
  margin-top: 20px;
}

.stats-card {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
