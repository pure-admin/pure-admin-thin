// Nếu biến `global` chưa được định nghĩa, gán `window` cho `global`
if (typeof (window as any).global === "undefined") {
  (window as any).global = window;
}

export {};
