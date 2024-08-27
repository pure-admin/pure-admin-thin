<script setup lang="ts">
import { ref, onMounted } from "vue";
import { http } from "@/utils/http";
import { useRouter } from "vue-router";
import {
  genFileId,
  type FormInstance,
  type UploadFile,
  type UploadInstance,
  type UploadProps,
  type UploadRawFile
} from "element-plus";
import { ArrowDown } from "@element-plus/icons-vue";

const uploadVisible = ref(false);
const importVisible = ref(false);

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

interface UploadForm {
  userUUID: string;
  projectName: string;
  projectDesc: string;
}

interface ImportForm {
  userUUID: string;
  repoUrl: string;
  repoType: string;
  repoUsername?: string;
  repoPassword?: string;
  repoToken?: string;
}

const importRules = {
  repoUrl: [{ required: true, message: "请输入仓库地址", trigger: "blur" }],
  repoType: [{ required: true, message: "请选择仓库类型", trigger: "change" }]
};

const uploadRules = {
  projectName: [{ required: true, message: "请输入项目名称", trigger: "blur" }]
};

const importForm = ref<ImportForm>({
  userUUID: null,
  repoUrl: null,
  repoType: null,
  repoUsername: null,
  repoPassword: null,
  repoToken: null
});

const uploadForm = ref<UploadForm>({
  userUUID: null,
  projectName: null,
  projectDesc: null
});

const file = ref();
const uploadFile = ref<UploadInstance>();
const changeFile = (upload: UploadFile) => {
  file.value = upload;
};

const handleExceed: UploadProps["onExceed"] = files => {
  uploadFile.value!.clearFiles();
  const _file = files[0] as UploadRawFile;
  _file.uid = genFileId();
  uploadFile.value!.handleStart(_file);
};

const importFormRef = ref<FormInstance>();
const uploadFormRef = ref<FormInstance>();

const repoVis = ref("public"); // public or private

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
    var projectSrc = "";
    switch (res[i].projectType) {
      case "upload":
        projectSrc = "本地上传";
        break;
      case "github":
        projectSrc = "Github";
        break;
      case "gitlab":
        projectSrc = "Gitlab";
        break;
      case "gitee":
        projectSrc = "Gitee";
        break;
      case "bitbucket":
        projectSrc = "BitBucket";
        break;
    }
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
      projectSource: projectSrc
    });
  }
  projectStats.value.totalProjects = res.length;
  projectStats.value.unscanned = unScanned;
  projectStats.value.outdatedScans = outdatedScans;
  projectStats.value.scanned = scanned;
};

const handleSubmitUpload = async (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  await formRef.validate((valid, fields) => {
    if (valid) {
      uploadForm.value.userUUID = "5";
      console.log(uploadForm.value);
      console.log(file.value);
      const jsonStr = JSON.stringify(uploadForm.value);
      const blob = new Blob([jsonStr], { type: "application/json" });
      let formData = new FormData();
      formData.append("file", file.value.raw);
      formData.append("uploadProjectRequest", blob);
      http
        .request("post", "project/api/project/v1/new/upload", {
          headers: {
            "Content-Type": "multipart/form-data; charset=utf-8"
          },
          data: formData
        })
        .then(res => {
          console.log(res);
          handleClose("upload");
          fetchProjects();
        });
    } else {
      console.log("error submit", fields);
    }
  });
};

const handleSubmitImport = async (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  await formRef.validate((valid, fields) => {
    if (valid) {
      console.log(importForm.value);
      // TODO: 获取userUUID
      importForm.value.userUUID = "5";
      http
        .request("post", "project/api/project/v1/new/import", {
          data: importForm.value
        })
        .then(res => {
          console.log(res);
          handleClose("import");
          fetchProjects();
        });
    } else {
      console.log("error submit", fields);
    }
  });
};

const handleClose = form => {
  if (form === "upload") {
    uploadVisible.value = false;
    uploadFormRef.value.resetFields();
    uploadForm.value = {
      userUUID: null,
      projectName: null,
      projectDesc: null
    };
    uploadFile.value.clearFiles();
  } else {
    importVisible.value = false;
    importFormRef.value.resetFields();
    importForm.value = {
      userUUID: null,
      repoUrl: null,
      repoType: null,
      repoUsername: null,
      repoPassword: null,
      repoToken: null
    };
  }
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
            <el-dropdown-item @click="uploadVisible = true"
              >从文件上传</el-dropdown-item
            >
            <el-dropdown-item @click="importVisible = true"
              >从远程仓库导入</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button class="refresh_btn" size="large" @click="fetchProjects"
        >刷新项目列表</el-button
      >
    </div>
    <!-- TODO: 项目筛选功能 -->
    <!-- <div class="filter-container">
      <input type="text" placeholder="选择搜索类型(ID或name或者tags)" />
      <input type="text" placeholder="根据搜索类型搜索" />
    </div> -->
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

    <div class="dialog-container">
      <el-dialog
        v-model="importVisible"
        width="50%"
        title="从远程仓库导入"
        @close="handleClose('import')"
      >
        <el-form
          ref="importFormRef"
          :model="importForm"
          :rules="importRules"
          label-position="right"
          label-width="auto"
        >
          <el-form-item label="仓库地址" prop="repoUrl">
            <el-input
              v-model="importForm.repoUrl"
              placeholder="请输入仓库地址"
            />
          </el-form-item>
          <el-form-item label="仓库类型" prop="repoType">
            <el-col :span="6">
              <el-select v-model="importForm.repoType">
                <el-option label="Github" value="github" />
                <el-option label="Gitlab" value="gitlab" />
                <el-option label="Gitee" value="gitee" />
                <el-option label="BitBucket" value="bitbucket" />
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="仓库可见性">
            <el-radio-group v-model="repoVis">
              <el-radio-button label="公开" value="public" checked />
              <el-radio-button label="私有" value="private" />
            </el-radio-group>
          </el-form-item>
          <div v-if="repoVis === 'private'">
            <el-form-item label="仓库用户名">
              <el-input v-model="importForm.repoUsername" />
            </el-form-item>
            <el-form-item label="仓库密码">
              <el-input v-model="importForm.repoPassword" type="password" />
            </el-form-item>
            <el-form-item label="仓库令牌">
              <el-input v-model="importForm.repoToken" />
            </el-form-item>
          </div>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="importVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="handleSubmitImport(importFormRef)"
            >
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog
        v-model="uploadVisible"
        width="50%"
        title="从文件上传"
        @close="handleClose('upload')"
      >
        <el-form
          ref="uploadFormRef"
          :model="uploadForm"
          :rules="uploadRules"
          label-position="right"
          label-width="auto"
        >
          <el-form-item label="项目名称" prop="projectName">
            <el-input
              v-model="uploadForm.projectName"
              placeholder="请输入项目名称"
            />
          </el-form-item>
          <el-form-item label="项目介绍">
            <el-input
              v-model="uploadForm.projectDesc"
              placeholder="请输入项目介绍"
            />
          </el-form-item>
          <el-form-item label="上传文件">
            <el-upload
              ref="uploadFile"
              action="none"
              :auto-upload="false"
              :limit="1"
              :on-change="changeFile"
              :on-exceed="handleExceed"
            >
              <el-button type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="uploadVisible = false">取消</el-button>
            <el-button
              type="primary"
              @click="handleSubmitUpload(uploadFormRef)"
            >
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
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
