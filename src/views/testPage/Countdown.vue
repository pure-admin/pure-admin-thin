<script setup lang="ts">
import { ref, onMounted, unref } from "vue";
import { formatDate } from "@/utils/formatDate";
import Flippers from "./Flippers.vue";
// defineOptions({
//   name: "Countdown"
// });

const flipObjs = ref([]);

const flipperHour1 = ref(null);
const flipperHour2 = ref(null);
const flipperMinute1 = ref(null);
const flipperMinute2 = ref(null);
const flipperSecond1 = ref(null);
const flipperSecond2 = ref(null);

// 初始化数字
const init = () => {
  const now = new Date();
  const nowTimeStr = formatDate(new Date(now.getTime()), "hhiiss");
  for (let i = 0; i < flipObjs.value.length; i++) {
    flipObjs?.value[i]?.setFront(nowTimeStr[i]);
  }
};
// 倒计时
const start = () => {
  const now = new Date();
  const nowTimeStr = formatDate(new Date(now.getTime()), "hhiiss");
  setInterval(() => {
    for (let i = 0; i < flipObjs.value.length; i++) {
      flipObjs?.value[i]?.setBack(nowTimeStr[i]);
    }
  }, 1000);
};
onMounted(() => {
  flipObjs.value = [
    unref(flipperHour1),
    unref(flipperHour2),
    unref(flipperMinute1),
    unref(flipperMinute2),
    unref(flipperSecond1),
    unref(flipperSecond2)
  ];
  init();
  start();
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
