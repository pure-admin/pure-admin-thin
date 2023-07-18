<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref, unref, onMounted, nextTick } from "vue";

defineOptions({
  name: "FrameView"
});

const loading = ref(true);
const currentRoute = useRoute();
const frameSrc = ref<string>("");
const frameRef = ref<HTMLElement | null>(null);
const { VITE_APP_BASE_API } = import.meta.env;

if (unref(currentRoute.meta)?.frameSrc) {
  frameSrc.value = unref(currentRoute.meta)?.frameSrc as string;
  // 如果是内部链接的话， 需要加上后端服务器地址前缀
  if (unref(currentRoute.meta).isFrameSrcInternal) {
    frameSrc.value = `${VITE_APP_BASE_API}${frameSrc.value}`;
  }
}
unref(currentRoute.meta)?.frameLoading === false && hideLoading();

function hideLoading() {
  loading.value = false;
}

function init() {
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;
    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent("onload", () => {
        hideLoading();
      });
    } else {
      iframe.onload = () => {
        hideLoading();
      };
    }
  });
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="frame" v-loading="loading" element-loading-text="加载中...">
    <iframe :src="frameSrc" class="frame-iframe" ref="frameRef" />
  </div>
</template>

<style lang="scss" scoped>
.frame {
  z-index: 998;
  height: calc(100vh - 88px);

  .frame-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}

.main-content {
  margin: 2px 0 0 !important;
}
</style>
