const { VITE_PUBLIC_PATH } = import.meta.env;

export const configConver = () => {
  if (VITE_PUBLIC_PATH === "./") {
    return window.location.origin + "/";
  }
  return window.location.origin + processPath(VITE_PUBLIC_PATH);
};

function processPath(str: string): string {
  if (str.startsWith("./")) {
    str = str.substring(1);
  } else if (!str.startsWith("/")) {
    str = "/" + str;
  }

  if (!str.endsWith("/")) {
    str += "/";
  }

  return str;
}
