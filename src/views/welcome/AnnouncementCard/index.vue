<script setup>
defineOptions({
  name: "AnnouncementCard"
});
</script>
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <strong>公告</strong>
      </div>
    </template>
    <div class="text item flex">
      <div class="icon-text">
        <IconifyIconOnline
          icon="openmoji:megaphone"
          width="20px"
          height="20px"
        />
        <span>:用户公告</span>
      </div>
    </div>
  </el-card>
</template>
