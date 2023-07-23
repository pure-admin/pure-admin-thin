<template>
  <el-dialog
    v-model="visible"
    :fullscreen="fullScreen"
    class="v-dialog"
    :class="dialogClazz"
    :draggable="props.draggable"
    :show-close="false"
    v-bind="$attrs"
  >
    <template #header>
      <slot name="header">
        <div
          style="
            position: relative;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            font-weight: bold;
            color: rgb(118 131 164);
          "
        >
          <div v-text="props.title" />
          <div
            style="
              position: absolute;
              right: 0;
              display: flex;
              flex-direction: row;
              justify-content: center;
            "
          >
            <el-button
              v-if="props.showFullScreen"
              :icon="fullScreen ? FullScreenMinimize : FullScreenMaximize"
              link
              @click="requestFullScreen"
              class="header-btn"
            />
            <el-button
              :icon="Close"
              link
              @click="handleCloseClick"
              class="header-btn"
              style="margin-left: 0"
            />
          </div>
        </div>
      </slot>
    </template>
    <template v-if="useBodyScrolling">
      <el-scrollbar :max-height="bodyHeight" always>
        <slot name="default" />
      </el-scrollbar>
    </template>
    <template v-else>
      <slot name="default" />
    </template>

    <template #footer>
      <slot name="footer" v-if="!props.hiddenFooter">
        <div style="display: flex; justify-content: center">
          <el-button
            :loading="props.loading"
            type="primary"
            @click="handleConfirm"
            >{{ props.confirmText }}</el-button
          >
          <el-button :loading="props.loading" @click="handleCancel">{{
            cancelText
          }}</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { ElDialog, ElButton, ElScrollbar } from "element-plus";
import { DialogEmits, DialogProps } from "./dialog";
import { Close } from "@element-plus/icons-vue";
import FullScreenMaximize from "@/assets/svg/FullScreenMaximize.svg?component";
import FullScreenMinimize from "@/assets/svg/FullScreenMinimize.svg?component";

const props = withDefaults(defineProps<DialogProps>(), {
  fullScreen: undefined,
  confirmText: "确定",
  cancelText: "取消",
  disableFooter: false,
  useBodyScrolling: false,
  fixedBodyHeight: true,
  draggable: true,
  loading: false
});
const emits = defineEmits<DialogEmits>();

const visible = computed<boolean>({
  get: () => {
    return props.modelValue;
  },
  set: v => emits("update:modelValue", v)
});

const fullScreenState = ref(!!props.initFullScreen);
const fullScreen = computed<boolean>({
  get: () => {
    console.log("fullScreen getter", props.fullScreen, fullScreenState.value);
    // 非受控模式，状态完全由组件内部控制
    if (props.fullScreen === undefined) {
      return fullScreenState.value;
    } else {
      return props.fullScreen;
    }
  },
  set: v => {
    fullScreenState.value = v;
    console.log("fullScreen setter", v, props.fullScreen);
    // 受控模式，将状态更新到父组件
    if (props.fullScreen !== undefined) {
      emits("update:fullScreen", v);
    }
  }
});

// const fullScreen = ref<boolean>(false)
function requestFullScreen() {
  fullScreen.value = !fullScreen.value;
}

const bodyHeight = computed(() => {
  const footerHeight = props.hiddenFooter ? "0" : "52px";
  if (props.fullScreen) {
    // footerHeight=52,headerHeight=44,padding=12
    return `calc(100dvh - ${footerHeight} - 44px)`;
  } else {
    return `calc(70dvh - ${footerHeight} - 44px)`;
  }
});

const dialogClazz = computed(() => {
  const classList: string[] = ["v-dialog"];
  if (!props.fixedBodyHeight) {
    classList.push("flex-body");
  }
  if (props.hiddenFooter) {
    classList.push("hidden-footer");
  }
  return classList;
});

function handleConfirm() {
  emits("confirm");
}

function handleCancel() {
  emits("cancel");
}

function handleCloseClick() {
  visible.value = false;
}
</script>

<style scoped>
.header-btn :deep(.el-icon),
.header-btn :deep(.el-icon svg) {
  width: 24px;
  height: 24px;
}
</style>
