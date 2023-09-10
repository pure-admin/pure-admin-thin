<script setup lang="ts">
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
<style lang="scss" scoped>
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box-card {
  width: 100%;
  margin-bottom: 10px;
}

.text {
  align-items: center;
  height: 5px;
  font-size: 14px;
}

.item {
  margin-bottom: 5px;
}

.icon-text {
  display: flex;
  align-items: center;
}
</style>
