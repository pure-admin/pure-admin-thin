<script setup lang="ts">
import { useI18n } from "vue-i18n";
import Motion from "./utils/motion";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { useNav } from "@/layout/hooks/useNav";
import { useLayout } from "@/layout/hooks/useLayout";
import { bg, avatar, illustration } from "./utils/static";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import dayjs from "dayjs";
import dayIcon from "@/assets/svg/day.svg?component";
import darkIcon from "@/assets/svg/dark.svg?component";
import globalization from "@/assets/svg/globalization.svg?component";
import Check from "@iconify-icons/ep/check";

import {
  computed,
  onMounted,
  ref,
  reactive,
  onBeforeUnmount,
  toRaw
} from "vue";
import { useAuth, useOidcStore } from "vue3-oidc";
import { type DataInfo, setToken, removeToken, userKey } from "@/utils/auth";
const { signinRedirect, signoutRedirect, autoAuthenticate } = useAuth();

defineOptions({
  name: "Login"
});
const router = useRouter();
const loading = ref(false);

const { initStorage } = useLayout();
initStorage();

const { t } = useI18n();
const { dataTheme, overallStyle, dataThemeChange } = useDataThemeChange();
dataThemeChange(overallStyle.value);
const { title, getDropdownItemStyle, getDropdownItemClass } = useNav();
const { locale, translationCh, translationEn } = useTranslationLang();

/** Use common function to prevent `removeEventListener` failure */
function onkeypress({ code }: KeyboardEvent) {
  if (["Enter", "NumpadEnter"].includes(code)) {
    signin();
  }
}

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});

const { state } = useOidcStore();

const user = computed(() => state.value.user?.profile);

const signin = () => {
  signinRedirect();
  setLogin();
  //The following operations are completed in the callback route
};

const setLogin = () => {
  if (state.value != null) {
    router.push("/welcome").then(() => {
      const avv = {
        /** Token truy cập */
        accessToken: state.value.token.toString(),
        /** Thời gian hết hạn của accessToken (dưới dạng timestamp) */
        expires: dayjs(state?.value.user.expires_in).toDate(),
        /** Token dùng để làm mới accessToken */
        refreshToken: user.value.emp_id.toString(),
        /** Ảnh đại diện */
        avatar: "https://api-hr.medlatec.vn/" + user.value.avatar,
        /** Tên đăng nhập */
        username: user.value.preferred_username.toString(),
        /** Biệt danh */
        nickname: user.value.full_name.toString()
      };
      setToken(avv);
      message(t("login.pureLoginSuccess"), { type: "success" });
      window.location.href = "/welcome";
    });
  }
};

onMounted(() => {
  autoAuthenticate();
});
</script>

<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="flex-c absolute right-5 top-3">
      <!-- Theme -->
      <el-switch
        v-model="dataTheme"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="dataThemeChange"
      />
      <!-- Globalization -->
      <el-dropdown trigger="click">
        <globalization
          class="hover:text-primary hover:!bg-[transparent] w-[20px] h-[20px] ml-1.5 cursor-pointer outline-none duration-300"
        />
        <template #dropdown>
          <el-dropdown-menu class="translation">
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'vi')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'vi')]"
              @click="translationCh"
            >
              <IconifyIconOffline
                v-show="locale === 'vi'"
                class="check-vi"
                :icon="Check"
              />
              Tiếng Việt
            </el-dropdown-item>
            <el-dropdown-item
              :style="getDropdownItemStyle(locale, 'en')"
              :class="['dark:!text-white', getDropdownItemClass(locale, 'en')]"
              @click="translationEn"
            >
              <span v-show="locale === 'en'" class="check-en">
                <IconifyIconOffline :icon="Check" />
              </span>
              English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="login-container">
      <div class="img">
        <component :is="toRaw(illustration)" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <avatar class="avatar" />
          <Motion>
            <h2 class="outline-none">{{ title }}</h2>
          </Motion>

          <el-form size="large">
            <Motion :delay="250">
              <el-button
                class="w-full mt-4"
                size="default"
                type="primary"
                :loading="loading"
                @click="signin()"
              >
                {{ t("login.pureLogin") }}
              </el-button>
            </Motion>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.translation {
  ::v-deep(.el-dropdown-menu__item) {
    padding: 5px 40px;
  }

  .check-vi {
    position: absolute;
    left: 20px;
  }

  .check-en {
    position: absolute;
    left: 20px;
  }
}
</style>
