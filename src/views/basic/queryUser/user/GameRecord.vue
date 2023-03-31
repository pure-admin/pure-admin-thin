<template>
  <div>游戏记录-{{ id }}-{{ props.uid }}</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: 'GameRecord'
})

const props = defineProps(['uid'])

const route = useRoute()
// const router = useRouter()
const id = route.query?.id ? route.query?.id : route.params?.id
</script>

<style scoped></style>
