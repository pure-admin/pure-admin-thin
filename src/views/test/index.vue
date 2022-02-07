<template>
  <div class="aa">
    aaaa
    {{ num }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const num = ref("22222222");
const str = "111";
console.log(str);
</script>

<style lang="sass" scoped></style>
