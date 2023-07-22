<template>
  <div class="main" v-loading="loading">
    <!-- 注意template和div之间 不要加注释  会导致后续的页面渲染空白 -->
    <!-- v-loading指令  可以直接调用Loading动画  -->
    <el-row :gutter="30">
      <el-col :span="12" class="card-box">
        <el-card>
          <template #header><span>CPU</span></template>
          <el-table
            :data="cpuInfoTable"
            :show-header="true"
            style="width: 100%"
          >
            <el-table-column prop="field" label="属性" />
            <el-table-column prop="value" label="值" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12" class="card-box">
        <el-card>
          <template #header><span>内存</span></template>
          <el-table
            :data="memoryInfoTable"
            :show-header="true"
            style="width: 100%"
            :cell-class-name="cellClassName"
          >
            <el-table-column prop="field" label="属性" />
            <el-table-column prop="machine" label="服务器" />
            <el-table-column prop="jvm" label="JVM" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header><span>服务器信息</span></template>
          <el-descriptions :column="2">
            <el-descriptions-item
              v-for="(item, index) in serverInfoTable"
              :key="index"
              :label="item.field"
              >{{ item.value }}</el-descriptions-item
            >
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header><span>JVM信息</span></template>
          <el-descriptions :column="2">
            <el-descriptions-item
              v-for="(item, index) in jvmInfoTable"
              :key="index"
              :label="item.field"
              :span="item.span"
              >{{ item.value }}</el-descriptions-item
            >
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header><span>磁盘状态</span></template>
          <el-table
            :data="diskInfoTable"
            :show-header="true"
            style="width: 100%"
          >
            <el-table-column prop="dirName" label="盘符路径" />
            <el-table-column prop="sysTypeName" label="文件系统" />
            <el-table-column prop="typeName" label="盘符类型" />
            <el-table-column prop="total" label="总大小" />
            <el-table-column prop="free" label="可用大小" />
            <el-table-column prop="used" label="已用大小" />
            <el-table-column
              prop="usage"
              label="已用百分比"
              :formatter="(row, column, cellValue) => cellValue + '%'"
              width="180"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <el-row />
  </div>
</template>

<script setup lang="ts">
import { getServerInfoApi, ServerInfo } from "@/api/system/monitor";
import { onBeforeMount, ref } from "vue";

/** 组件name最好和菜单表中的router_name一致 */
defineOptions({
  name: "ServerInfo"
});

const loading = ref(true);

const cpuInfoTable = ref([]);
const memoryInfoTable = ref([]);
const serverInfoTable = ref([]);
const jvmInfoTable = ref([]);
const diskInfoTable = ref([]);

async function getList() {
  loading.value = true;
  const { data } = await getServerInfoApi().finally(() => {
    loading.value = false;
  });
  const serverInfo = data as ServerInfo;

  cpuInfoTable.value = [
    {
      field: "核心数",
      value: serverInfo.cpuInfo.cpuNum
    },
    {
      field: "用户使用率",
      value: serverInfo.cpuInfo.used + "%"
    },
    {
      field: "系统使用率",
      value: serverInfo.cpuInfo.sys + "%"
    },
    {
      field: "当前空闲率",
      value: serverInfo.cpuInfo.free + "%"
    }
  ];

  memoryInfoTable.value = [
    {
      field: "总内存",
      machine: serverInfo.memoryInfo.total + "G",
      jvm: serverInfo.jvmInfo.total + "M"
    },
    {
      field: "已用内存",
      machine: serverInfo.memoryInfo.used + "G",
      jvm: serverInfo.jvmInfo.used + "M"
    },
    {
      field: "剩余内存",
      machine: serverInfo.memoryInfo.free + "G",
      jvm: serverInfo.jvmInfo.free + "M"
    },
    {
      field: "使用率",
      machine: serverInfo.memoryInfo.usage + "%",
      jvm: serverInfo.jvmInfo.usage + "%",
      // 设置warning  页面上会红字显示
      warning: serverInfo.jvmInfo.usage > 30
    }
  ];

  serverInfoTable.value = [
    {
      field: "服务器名称",
      value: serverInfo.systemInfo.computerName
    },
    {
      field: "操作系统",
      value: serverInfo.systemInfo.osName
    },
    {
      field: "服务器IP",
      value: serverInfo.systemInfo.computerIp
    },
    {
      field: "系统架构",
      value: serverInfo.systemInfo.osArch
    }
  ];

  jvmInfoTable.value = [
    {
      field: "JDK名称",
      value: serverInfo.jvmInfo.name,
      span: 1
    },
    {
      field: "JDK版本",
      value: serverInfo.jvmInfo.version,
      span: 1
    },
    {
      field: "启动时间",
      value: serverInfo.jvmInfo.startTime,
      span: 1
    },
    {
      field: "运行时长",
      value: serverInfo.jvmInfo.runTime,
      span: 1
    },
    {
      field: "安装路径",
      value: serverInfo.jvmInfo.home,
      span: 2
    },
    {
      field: "项目路径",
      value: serverInfo.systemInfo.userDir,
      span: 2
    },
    {
      field: "运行参数",
      value: serverInfo.jvmInfo.inputArgs,
      span: 2
    }
  ];

  diskInfoTable.value = serverInfo.diskInfos;
}

function cellClassName({ row }) {
  if (row.warning) {
    return "text-red-500";
  }
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
