<!-- src/components/Card.vue -->
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 10px; /* Reduce the margin to make cards closer */
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.card-header {
  padding: 10px 15px; /* Reduce padding for a tighter look */
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
}

.card-content {
  padding: 15px; /* Reduce padding for a tighter look */
}
</style>
