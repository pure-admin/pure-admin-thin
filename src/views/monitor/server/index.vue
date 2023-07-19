<template>
  <div class="main">
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
import { onBeforeMount, reactive, ref } from "vue";

/** 组件name最好和菜单表中的router_name一致 */
defineOptions({
  name: "ServerInfo"
});

const server = reactive<ServerInfo>({
  cpuInfo: undefined,
  diskInfos: undefined,
  jvmInfo: undefined,
  memoryInfo: undefined,
  systemInfo: undefined
});

const cpuInfoTable = ref([]);
const memoryInfoTable = ref([]);
const serverInfoTable = ref([]);
const jvmInfoTable = ref([]);
const diskInfoTable = ref([]);

async function getList() {
  // pageLoading.value = true;
  const { data } = await getServerInfoApi();
  console.log(data);
  Object.assign(server, data);

  cpuInfoTable.value = [
    {
      field: "核心数",
      value: server.cpuInfo.cpuNum
    },
    {
      field: "用户使用率",
      value: server.cpuInfo.used + "%"
    },
    {
      field: "系统使用率",
      value: server.cpuInfo.sys + "%"
    },
    {
      field: "当前空闲率",
      value: server.cpuInfo.free + "%"
    }
  ];

  memoryInfoTable.value = [
    {
      field: "总内存",
      machine: server.memoryInfo.total + "G",
      jvm: server.jvmInfo.total + "M"
    },
    {
      field: "已用内存",
      machine: server.memoryInfo.used + "G",
      jvm: server.jvmInfo.used + "M"
    },
    {
      field: "剩余内存",
      machine: server.memoryInfo.free + "G",
      jvm: server.jvmInfo.free + "M"
    },
    {
      field: "使用率",
      machine: server.memoryInfo.usage + "%",
      jvm: server.jvmInfo.usage + "%",
      // 设置warning  页面上会红字显示
      warning: server.jvmInfo.usage > 30
    }
  ];

  serverInfoTable.value = [
    {
      field: "服务器名称",
      value: server.systemInfo.computerName
    },
    {
      field: "操作系统",
      value: server.systemInfo.osName
    },
    {
      field: "服务器IP",
      value: server.systemInfo.computerIp
    },
    {
      field: "系统架构",
      value: server.systemInfo.osArch
    }
  ];

  jvmInfoTable.value = [
    {
      field: "JDK名称",
      value: server.jvmInfo.name,
      span: 1
    },
    {
      field: "JDK版本",
      value: server.jvmInfo.version,
      span: 1
    },
    {
      field: "启动时间",
      value: server.jvmInfo.startTime,
      span: 1
    },
    {
      field: "运行时长",
      value: server.jvmInfo.runTime,
      span: 1
    },
    {
      field: "安装路径",
      value: server.jvmInfo.home,
      span: 2
    },
    {
      field: "项目路径",
      value: server.systemInfo.userDir,
      span: 2
    },
    {
      field: "运行参数",
      value: server.jvmInfo.inputArgs,
      span: 2
    }
  ];

  diskInfoTable.value = server.diskInfos;
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
