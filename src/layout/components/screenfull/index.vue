<script setup lang="ts">
import { useFullscreen } from "@vueuse/core";

const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
  <div
    class="screen-full w-[36px] h-[48px] flex-ac cursor-pointer navbar-bg-hover"
    @click="toggle"
  >
    <FontIcon
      :title="isFullscreen ? '退出全屏' : '全屏'"
      :icon="isFullscreen ? 'team-iconexit-fullscreen' : 'team-iconfullscreen'"
    />
  </div>
</template>
