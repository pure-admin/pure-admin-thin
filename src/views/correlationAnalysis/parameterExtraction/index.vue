<template>
  <div class="container">
    <!-- 左侧部分 -->
    <div class="left">
      <!-- 数据导入部分 -->
      <div class="data-import">
        <h1 style="font-size: 30px">关键参数提取</h1>
        <div class="icon-text-container">
          <el-icon size="32px" style="margin-top: -10px; color: #2d7dbc"
            ><FolderAdd
          /></el-icon>
          <span class="section-title">数据导入</span>
        </div>
        <div class="file-upload">
          <div class="file-input-container">
            <p style="margin: 0; font-weight: bolder">请选择输入数据集</p>
            <input
              type="file"
              class="file-input"
              @change="handleInputFileUpload"
            />
            <button @click="uploadInputFile">点击上传</button>
          </div>
        </div>
        <div class="file-upload">
          <div class="file-input-container">
            <p style="margin: 0; font-weight: bolder">请选择输出数据集</p>
            <input
              type="file"
              class="file-input"
              @change="handleOutputFileUpload"
            />
            <button @click="uploadOutputFile">点击上传</button>
          </div>
        </div>
      </div>
      <!-- 数据展示和建立随机森林模型部分 -->
      <div class="left-bottom">
        <div class="data-display-section">
          <div class="icon-text-container">
            <el-icon size="32px" style="margin-top: -10px; color: #2d7dbc"
              ><Loading
            /></el-icon>
            <span class="section-title">数据展示</span>
          </div>
          <button class="button-style" @click="showInputFileInfo">
            显示输入数据集
          </button>
          <div v-if="inputFileInfo">
            <p>
              列数: {{ inputFileInfo.columnCount }} 数据条数:
              {{ inputFileInfo.dataCount }}
            </p>
          </div>

          <div class="table-container" v-if="inputFileInfo">
            <el-table
              :data="inputFileInfo.columns.map(column => ({ name: column }))"
              style="width: 100%"
            >
              <el-table-column prop="name" label="列名" />
            </el-table>
          </div>

          <button
            class="button-style"
            @click="showOutputFileInfo"
            style="margin-top: 20px"
          >
            显示输出数据集
          </button>
          <div v-if="outputFileInfo">
            <p>
              列数: {{ outputFileInfo.columnCount }} 数据条数:
              {{ outputFileInfo.dataCount }}
            </p>
          </div>
          <div class="table-container" v-if="outputFileInfo">
            <el-table
              :data="outputFileInfo.columns.map(column => ({ name: column }))"
              style="width: 100%"
            >
              <el-table-column prop="name" label="列名" />
            </el-table>
          </div>
        </div>
        <div class="random-forest-model-section">
          <div class="icon-text-container">
            <el-icon size="32px" style="margin-top: -10px; color: #2d7dbc"
              ><Connection
            /></el-icon>
            <div class="section-title">建立随机森林模型</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧部分 -->
    <div class="right">
      <div class="algorithm-selection">
        <div class="section-title">关键工艺参数算法选取</div>
        <div class="algorithm-input">
          <label for="algorithm">模型：</label>
          <select id="algorithm">
            <option value="逐渐消除">逐渐消除</option>
          </select>
          <button>确定</button>
        </div>
      </div>
      <div class="result-display">
        <div class="section-title">数据展示</div>
        <div class="data-display" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { uploadLocalFile, getFileInfo } from "@/api/correlation"; // 导入上传文件和获取文件信息API
import { ElMessage, ElTable, ElTableColumn } from "element-plus";

const inputFile = ref<File | null>(null);
const outputFile = ref<File | null>(null);

const inputFileInfo = ref<{
  columnCount: number;
  columns: string[];
  dataCount: number;
} | null>({ columnCount: 0, columns: [], dataCount: 0 });
const outputFileInfo = ref<{
  columnCount: number;
  columns: string[];
  dataCount: number;
} | null>({ columnCount: 0, columns: [], dataCount: 0 });

const handleInputFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    inputFile.value = target.files[0];
  }
};

const handleOutputFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    outputFile.value = target.files[0];
  }
};

const uploadInputFile = async () => {
  if (!inputFile.value) {
    ElMessage.error("请选择输入数据集文件");
    return;
  }

  const formData = new FormData();
  formData.append("file", inputFile.value);
  formData.append("file_type", "input"); // 添加文件类型

  try {
    const response = await uploadLocalFile(formData);
    if ("message" in response) {
      ElMessage.success(response.message);
    } else if ("error" in response) {
      ElMessage.error(response.error);
    }
  } catch (error) {
    ElMessage.error("文件上传失败");
  }
};

const uploadOutputFile = async () => {
  if (!outputFile.value) {
    ElMessage.error("请选择输出数据集文件");
    return;
  }

  const formData = new FormData();
  formData.append("file", outputFile.value);
  formData.append("file_type", "output"); // 添加文件类型

  try {
    const response = await uploadLocalFile(formData);
    if ("message" in response) {
      ElMessage.success(response.message);
    } else if ("error" in response) {
      ElMessage.error(response.error);
    }
  } catch (error) {
    ElMessage.error("文件上传失败");
  }
};

const showFileInfo = async (
  filename: string,
  setFileInfo: (info: any) => void
) => {
  try {
    const response = await getFileInfo(filename);
    if ("error" in response) {
      ElMessage.error(response.error);
    } else {
      setFileInfo({
        columnCount: response.column_count,
        columns: response.column_names,
        dataCount: response.data_count
      });
    }
  } catch (error) {
    ElMessage.error("获取文件信息失败");
  }
};

const showInputFileInfo = () => {
  if (!inputFile.value) {
    ElMessage.error("请先上传输入数据集文件");
    return;
  }
  showFileInfo(inputFile.value.name, info => {
    inputFileInfo.value = info;
    console.log(inputFileInfo.value);
  });
};

const showOutputFileInfo = () => {
  if (!outputFile.value) {
    ElMessage.error("请先上传输出数据集文件");
    return;
  }
  showFileInfo(outputFile.value.name, info => {
    outputFileInfo.value = info;
  });
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 80vh;
  padding: 20px;
  overflow: hidden; /* Ensure content stays within one page */
  background-color: #2d7dbc;
}

.left {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-right: 20px;
}

.data-import {
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  border-radius: 8px;
}

.icon-text-container {
  display: flex;
  gap: 10px; /* 设置图标和文本之间的间隙 */
  align-items: center; /* 垂直居中 */
}

.left-bottom {
  display: flex;
  flex: 1;
}

.data-display-section,
.random-forest-model-section {
  box-sizing: border-box;
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
}

.data-display-section {
  margin-right: 20px;
}

.right {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.section-title {
  margin-bottom: 10px;
  font-size: 24px;
  color: #2d7dbc;
}

.file-upload {
  margin-bottom: 20px; /* 增加每个文件上传块之间的间隙 */
}

.file-input-container {
  display: flex;
  gap: 10px; /* 设置元素之间的间隙 */
  align-items: center; /* 垂直居中 */
}

.file-input {
  padding: 10px; /* 内边距 */
  font-size: 16px; /* 字体大小 */
  border: 2px solid #ccc; /* 边框 */
  border-radius: 5px; /* 圆角 */
}

.file-upload button {
  padding: 10px 20px; /* 内边距 */
  font-size: 16px; /* 字体大小 */
  color: white; /* 白色文字 */
  cursor: pointer; /* 鼠标悬停时显示为手型 */
  background-color: #4caf50; /* 绿色背景 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  transition: background-color 0.3s ease; /* 背景颜色过渡效果 */
}

.file-upload button:hover {
  background-color: #45a049; /* 悬停时背景颜色变深 */
}

.parameter-setting,
.algorithm-selection,
.result-display {
  box-sizing: border-box;
  padding: 10px; /* Reduced padding */
  margin-bottom: 20px; /* Reduced margin */
  background-color: white;
  border-radius: 8px;
}

.parameter-input,
.algorithm-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.parameter-input input,
.algorithm-input select {
  margin-left: 10px;
}

.data-display {
  height: 200px;
  border: 1px solid #ccc;
}

.table-container {
  height: 100px;
  max-height: 100px;
  overflow-y: auto; /* 纵向滚动条 */
}

.column-item {
  padding: 10px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
}

.button-style {
  padding: 5px; /* 内边距 */
  font-size: 12px; /* 字体大小 */
  color: white; /* 白色文字 */
  cursor: pointer; /* 鼠标悬停时显示为手型 */
  background-color: #4caf50; /* 绿色背景 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  transition: background-color 0.3s ease; /* 背景颜色过渡效果 */
}

.button-style:hover {
  background-color: #45a049; /* 悬停时背景颜色变深 */
}
</style>
