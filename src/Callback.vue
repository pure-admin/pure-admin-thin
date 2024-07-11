<script lang="ts" setup>
import { computed, onMounted, unref } from "vue";
import { useRouter } from "vue-router";
import { useOidcStore } from "vue3-oidc";
const { state, actions } = useOidcStore();

const userManager = computed(() => state.value.userManager);

const router = useRouter();

/**
 * manually handle login and will save user to state
 * Xử lý đăng nhập thủ công và lưu người dùng vào trạng thái
 */
onMounted(async () => {
  let user = (await unref(state).userManager?.getUser()) || unref(state).user;
  if (!user) {
    user = (await userManager.value?.signinRedirectCallback()) || null;
  }
  actions.value.setUser(user!);
  router.push("/welcome");
});
</script>

<template>
  <div>
    <h1>OIDC-CALLBACK</h1>
  </div>
</template>

<style lang="less" scoped></style>
