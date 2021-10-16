<script setup lang="ts">
import { reactive } from "vue";
import info, { ContextProps } from "../components/ReInfo/index.vue";

const contextInfo: ContextProps = reactive({
  userName: "",
  passWord: "",
  verify: null,
  svg: null
});

// 登录
const onLogin = () => {};
</script>

<template>
  <div class="login">
    <info :ruleForm="contextInfo" @on-behavior="onLogin" />
  </div>
</template>
