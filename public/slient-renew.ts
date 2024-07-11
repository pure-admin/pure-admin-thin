import { useOidcStore } from "vue3-oidc";

const { state: oidcState } = useOidcStore();
oidcState.value.userManager?.signinSilentCallback();

const LOGIN_REQUIRED = "login_required";
const searchParams = new URLSearchParams(window.location.search);
const error = searchParams.get("error");
const state = searchParams.get("state");
const isLocalService = location.origin.includes(
  "://localhost" || "0.0.0.0" || "127.0.0.0"
);

console.error(`Error: \n error: ${error} \n state: ${state}`);

if (error === LOGIN_REQUIRED && import.meta.env && !isLocalService) {
  localStorage.clear();
  sessionStorage.clear();
  top?.location.reload();
}
