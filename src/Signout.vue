<script lang="ts" setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuth, useOidcStore } from "vue3-oidc";
const router = useRouter();

const { state } = useOidcStore();

const userManager = computed(() => state.value.userManager);

/**
 * manually login will be redirected to the callback route
 * Đăng nhập thủ công sẽ được chuyển hướng đến tuyến gọi lại
 */
const { signinRedirect } = useAuth();

const popup = () => {
  userManager.value?.signinPopup();
};
</script>

<template>
  <div>
    <h1>Chưa đăng nhập</h1>
    <button @click="router.push('/Welcome')">Home</button>
    <button @click="signinRedirect!()">SignIn</button>
    <button @click="popup">Popup_SignIn</button>
  </div>
</template>

<style lang="less" scoped></style>
