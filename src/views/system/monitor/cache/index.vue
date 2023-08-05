<template>
  <div class="main" v-loading="loading">
    <!-- v-loading指令  可以直接调用Loading动画  -->
    <el-row :gutter="2">
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header><span>Redis信息</span></template>
          <el-descriptions :column="4">
            <el-descriptions-item
              v-for="(item, index) in cacheInfoTable"
              :key="index"
              :label="item.field"
              :span="item.span"
              >{{ item.value }}</el-descriptions-item
            >
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="12" class="card-box">
        <el-card>
          <template #header><span>命令统计</span></template>
          <div ref="commandChartRef" style="height: 420px" />
        </el-card>
      </el-col>
      <el-col :span="12" class="card-box">
        <el-card>
          <template #header><span>内存信息</span></template>
          <div ref="memoryChartRef" style="height: 420px" />
        </el-card>
      </el-col>
    </el-row>

    <el-row />
  </div>
</template>

<script setup lang="ts">
import { getCacheInfoApi, RedisCacheInfoDTO } from "@/api/system/monitor";
import { onBeforeMount, ref } from "vue";
import * as echarts from "echarts";
/** 组件name最好和菜单表中的router_name一致 */
defineOptions({
  name: "CacheInfo"
});

const loading = ref(true);

const cacheInfoTable = ref([]);
const commandChartRef = ref(null);
const memoryChartRef = ref(null);

async function getList() {
  loading.value = true;
  const { data } = await getCacheInfoApi().finally(() => {
    loading.value = false;
  });
  const cacheInfo = data as RedisCacheInfoDTO;

  cacheInfoTable.value = [
    {
      field: "Redis版本",
      value: cacheInfo.info.redis_version
    },
    {
      field: "运行模式",
      value: cacheInfo.info.redis_mode == "standalone" ? "单机" : "集群"
    },
    {
      field: "端口",
      value: cacheInfo.info.tcp_port
    },
    {
      field: "客户端数",
      value: cacheInfo.info.connected_clients
    },
    {
      field: "运行时间(天)",
      value: cacheInfo.info.uptime_in_days
    },
    {
      field: "使用内存",
      value: cacheInfo.info.used_memory_human
    },
    {
      field: "使用CPU",
      value: parseFloat(cacheInfo.info.used_cpu_user_children).toFixed(2)
    },
    {
      field: "内存配置",
      value: cacheInfo.info.total_system_memory_human
    },
    {
      field: "AOF是否开启",
      value: cacheInfo.info.aof_enabled == "0" ? "否" : "是"
    },
    {
      field: "RDB是否成功",
      value: cacheInfo.info.rdb_last_bgsave_status
    },
    {
      field: "Key数量",
      value: cacheInfo.dbSize
    },

    {
      field: "网络入口/出口",
      value: `${cacheInfo.info.instantaneous_input_kbps} kbs/ ${cacheInfo.info.instantaneous_output_kbps} kbs`
    }
  ];

  const commandChartInstance = echarts.init(commandChartRef.value, "macarons");
  commandChartInstance.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: "命令统计",
        type: "pie",
        roseType: "radius",
        radius: [15, 95],
        center: ["40%", "50%"],
        data: cacheInfo.commandStats,
        animationEasing: "cubicInOut",
        animationDuration: 1000
      }
    ]
  });
  const memoryChartInstance = echarts.init(memoryChartRef.value, "macarons");
  memoryChartInstance.setOption({
    tooltip: {
      formatter: `{b} <br/>{a} : ${cacheInfo.info.used_memory_human}`
    },
    series: [
      {
        name: "峰值",
        type: "gauge",
        min: 0,
        max: 1000,
        detail: {
          formatter: cacheInfo.info.used_memory_human
        },
        data: [
          {
            value: parseFloat(cacheInfo.info.used_memory_human),
            name: "内存消耗"
          }
        ]
      }
    ]
  });
}

onBeforeMount(() => {
  getList();
});
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}
</style>
