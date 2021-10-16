<script setup lang="ts">
import { reactive } from "vue";
import info, { ContextProps } from "../components/ReInfo/index.vue";

const contextInfo: ContextProps = reactive({
  userName: "",
  passWord: "",
  verify: null,
  svg: null
});
</script>

<template>
  <div class="register">
    <info :ruleForm="contextInfo" />
  </div>
</template>
