<script setup lang="ts">
import { ref, nextTick, unref } from "vue";
import { HTMLElementPlus } from "./types";
// import { formatDate } from "@vueuse/core";
import { formatDate } from "@/utils/formatDate";
import Flippers from "./Flippers.vue";
// defineOptions({
//   name: "Countdown"
// });

const flipObjs = ref<(HTMLElementPlus | null)[]>([]);

const flipperHour1 = ref<HTMLElementPlus | null>(null);
const flipperHour2 = ref<HTMLElementPlus | null>(null);
const flipperMinute1 = ref<HTMLElementPlus | null>(null);
const flipperMinute2 = ref<HTMLElementPlus | null>(null);
const flipperSecond1 = ref<HTMLElementPlus | null>(null);
const flipperSecond2 = ref<HTMLElementPlus | null>(null);

// 初始化数字
const init = () => {
  const now = new Date();
  const nowTimeStr = formatDate(new Date(now.getTime()), "hhiiss");
  for (let i = 0; i < flipObjs.value.length; i++) {
    flipObjs?.value[i]?.setFront(nowTimeStr[i]);
  }
};

nextTick(() => {
  flipObjs.value = [
    unref(flipperHour1),
    unref(flipperHour2),
    unref(flipperMinute1),
    unref(flipperMinute2),
    unref(flipperSecond1),
    unref(flipperSecond2)
  ];
  init();
});
</script>

<template>
  <div class="flip-clock">
    <Flippers ref="flipperHour1" />
    <Flippers ref="flipperHour2" />
    <em>:</em>
    <Flippers ref="flipperMinute1" />
    <Flippers ref="flipperMinute2" />
    <em>:</em>
    <Flippers ref="flipperSecond1" />
    <Flippers ref="flipperSecond2" />
  </div>
</template>

<style scoped>
.flip-clock .m-flipper {
  margin: 0 3px;
}

.flip-clock em {
  display: inline-block;
  line-height: 102px;
  font-size: 66px;
  font-style: normal;
  vertical-align: top;
}
</style>
