import { WebStorageStateStore } from "oidc-client-ts";
import { unref } from "vue";
import type { VueOidcSettings } from "vue3-oidc";
import { createOidc, useOidcStore } from "vue3-oidc";
import { setToken } from "@/utils/auth";
import dayjs from "dayjs";
import { message } from "@/utils/message";
const { state } = useOidcStore();

const oidcSettings: VueOidcSettings = {
  authority: "https://identity.medlatec.vn",
  scope: "openid emp_id profile",
  client_id: "App_vuejs_4a29575e49a579b2f96722c38578dfc9",
  client_secret:
    "secret_a252294002546cc7cc455f6a8b0ccb6bd1e6ad0b50ceb60db902a08080918ebd",
  redirect_uri: origin + "/oidc-callback",
  post_logout_redirect_uri: origin + "/signout",
  response_type: "code",
  loadUserInfo: true,
  userStore: new WebStorageStateStore({
    prefix: "admin-pure-oidc",
    store: window.sessionStorage
  }),
  automaticSilentRenew: true,
  monitorSession: true,
  silent_redirect_uri: location.origin + "/silent-renew.html",
  onSigninRedirectCallback() {
    message("Login success", { type: "success" });
    location.href = unref(state).redirect_uri || "/welcome";
  }
};

function runAuth() {
  createOidc({
    oidcSettings: oidcSettings, //your oidc settings
    auth: false, //if auth is true,will auto authenticate
    refreshToken: {
      enable: true,
      time: 10 * 1000
    },
    //your oidc events
    events: {
      addUserLoaded: user => {
        const avv = {
          /** Token truy cập */
          accessToken: user.access_token.toString(),
          /** Thời gian hết hạn của accessToken (dưới dạng timestamp) */
          expires: dayjs(user.expires_at).toDate(),
          /** Token dùng để làm mới accessToken */
          refreshToken: user.profile.emp_id.toString(),
          /** Ảnh đại diện */
          avatar: "https://api-hr.medlatec.vn/" + user.profile.avatar,
          /** Tên đăng nhập */
          username: user.profile.preferred_username.toString(),
          /** Biệt danh */
          nickname: user.profile.full_name.toString()
        };
        setToken(avv);
      },
      addUserSignedOut: () => {}
    }
  });
}

runAuth();
