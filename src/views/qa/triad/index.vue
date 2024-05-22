<template>
  <div class="container">
    <div class="title">
      <el-icon style="font-size: 30px"><Setting /></el-icon>
      <h1>三元组管理</h1>
    </div>
    <div class="search-container">
      <el-input
        v-model="keyword"
        placeholder="输入关键词搜索"
        @input="searchTriples"
        clearable
        class="search-input"
        style="width: 300px"
      />
      <el-button @click="searchTriples" type="primary">搜索</el-button>
      <el-button @click="openAddDialog" type="success">新增</el-button>
    </div>
    <el-table :data="triples" style="width: 100%" stripe>
      <el-table-column prop="subject" label="主体">
        <template #default="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.subject"
            placement="top"
          >
            <span class="ellipsis">{{ scope.row.subject }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="relation" label="关系">
        <template #default="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.relation"
            placement="top"
          >
            <span class="ellipsis">{{ scope.row.relation }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="object" label="客体">
        <template #default="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.object"
            placement="top"
          >
            <span class="ellipsis">{{ scope.row.object }}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            @click="openUpdateDialog(scope.row)"
            type="primary"
            size="small"
            >修改</el-button
          >
          <el-button
            @click="confirmDelete(scope.row)"
            type="danger"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handlePageChange"
        :current-page="page"
        :page-size="limit"
        layout="prev, pager, next"
        :total="total"
      />
    </div>
    <!-- 删除确认对话框 -->
    <el-dialog
      title="确认删除"
      v-model="deleteDialogVisible"
      width="30%"
      @close="resetDeleteDialog"
    >
      <span>确认要删除这个三元组吗？</span>
      <template #footer>
        <el-button @click="deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteTraidConfirm">确认</el-button>
      </template>
    </el-dialog>
    <!-- 修改对话框 -->
    <el-dialog
      title="修改三元组"
      v-model="updateDialogVisible"
      width="50%"
      @close="resetUpdateDialog"
    >
      <el-form :model="updateForm">
        <el-form-item label="主体" :label-width="formLabelWidth">
          <el-input v-model="updateForm.new_subject" />
        </el-form-item>
        <el-form-item label="关系" :label-width="formLabelWidth">
          <el-input v-model="updateForm.new_relation" />
        </el-form-item>
        <el-form-item label="客体" :label-width="formLabelWidth">
          <el-input v-model="updateForm.new_object" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="updateDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="updateTraidConfirm">确认</el-button>
      </template>
    </el-dialog>
    <!-- 新增对话框 -->
    <el-dialog
      title="新增三元组"
      v-model="addDialogVisible"
      width="50%"
      @close="resetAddDialog"
    >
      <el-form :model="addForm">
        <el-form-item label="主体" :label-width="formLabelWidth">
          <el-input v-model="addForm.subject" />
        </el-form-item>
        <el-form-item label="关系" :label-width="formLabelWidth">
          <el-input v-model="addForm.relation" />
        </el-form-item>
        <el-form-item label="客体" :label-width="formLabelWidth">
          <el-input v-model="addForm.object" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addTraidConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  getTraids,
  searchTraid,
  updateTraid,
  deleteTraid,
  addTraid
} from "@/api/qa";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const triples = ref([]);
    const page = ref(1);
    const limit = ref(10);
    const keyword = ref("");
    const total = ref(0);

    const deleteDialogVisible = ref(false);
    const updateDialogVisible = ref(false);
    const addDialogVisible = ref(false);

    const deleteForm = ref({});
    const updateForm = ref({
      old_subject: "",
      old_relation: "",
      old_object: "",
      new_subject: "",
      new_relation: "",
      new_object: ""
    });
    const addForm = ref({
      subject: "",
      relation: "",
      object: ""
    });

    const formLabelWidth = "80px";

    const fetchTriples = async () => {
      try {
        const response = await getTraids(page.value, limit.value);
        triples.value = response.data;
        total.value = response.total;
      } catch (error) {
        console.error("Failed to fetch triples:", error);
        ElMessage.error("获取三元组失败");
      }
    };

    const searchTriples = async () => {
      try {
        if (keyword.value) {
          const response = await searchTraid(keyword.value);
          triples.value = response.data;
          total.value = response.total;
        } else {
          fetchTriples();
        }
      } catch (error) {
        console.error("Failed to search triples:", error);
        ElMessage.error("搜索三元组失败");
      }
    };

    const handlePageChange = newPage => {
      page.value = newPage;
      fetchTriples();
    };

    const confirmDelete = row => {
      deleteForm.value = { ...row };
      deleteDialogVisible.value = true;
    };

    const deleteTraidConfirm = async () => {
      try {
        await deleteTraid(deleteForm.value);
        ElMessage.success("删除成功");
        deleteDialogVisible.value = false;
        fetchTriples();
      } catch (error) {
        console.error("Failed to delete triple:", error);
        ElMessage.error("删除失败");
      }
    };

    const openUpdateDialog = row => {
      updateForm.value.old_subject = row.subject;
      updateForm.value.old_relation = row.relation;
      updateForm.value.old_object = row.object;
      updateForm.value.new_subject = row.subject;
      updateForm.value.new_relation = row.relation;
      updateForm.value.new_object = row.object;
      updateDialogVisible.value = true;
    };

    const updateTraidConfirm = async () => {
      try {
        await updateTraid(updateForm.value);
        ElMessage.success("修改成功");
        updateDialogVisible.value = false;
        fetchTriples();
      } catch (error) {
        console.error("Failed to update triple:", error);
        ElMessage.error("修改失败");
      }
    };

    const openAddDialog = () => {
      addDialogVisible.value = true;
    };

    const addTraidConfirm = async () => {
      try {
        await addTraid(addForm.value);
        ElMessage.success("新增成功");
        addDialogVisible.value = false;
        fetchTriples();
      } catch (error) {
        console.error("Failed to add triple:", error);
        ElMessage.error("新增失败");
      }
    };

    const resetDeleteDialog = () => {
      deleteForm.value = {};
    };

    const resetUpdateDialog = () => {
      updateForm.value = {
        old_subject: "",
        old_relation: "",
        old_object: "",
        new_subject: "",
        new_relation: "",
        new_object: ""
      };
    };

    const resetAddDialog = () => {
      addForm.value = {
        subject: "",
        relation: "",
        object: ""
      };
    };

    onMounted(() => {
      fetchTriples();
    });

    return {
      triples,
      page,
      limit,
      keyword,
      total,
      deleteDialogVisible,
      updateDialogVisible,
      addDialogVisible,
      deleteForm,
      updateForm,
      addForm,
      formLabelWidth,
      fetchTriples,
      searchTriples,
      handlePageChange,
      confirmDelete,
      deleteTraidConfirm,
      openUpdateDialog,
      updateTraidConfirm,
      openAddDialog,
      addTraidConfirm,
      resetDeleteDialog,
      resetUpdateDialog,
      resetAddDialog
    };
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.title el-icon {
  margin-right: 10px;
}

.search-container {
  /* display: flex; */

  /* align-items: center; */
  float: right;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  margin-right: 10px;
}

.pagination {
  float: right;
  margin-top: 20px;
}

.ellipsis {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
