<script setup>
defineOptions({
  name: "PolicyCard"
});
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>可使用策略</span>
      </div>
    </template>
    <div class="text item flex" style="height: auto">
      <div class="icon-text">
        <div>
          <strong>默认策略</strong>
          <p>系统默认的策略</p>
        </div>
      </div>
    </div>
  </el-card>
</template>
