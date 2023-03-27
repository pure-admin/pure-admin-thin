<script setup lang="ts">
import ComingSoon from '@/views/error/fight.vue'
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'ComingSoon'
})
</script>

<template>
  <div>
    <h1>实时数据</h1>
    <ComingSoon />
  </div>
</template>
