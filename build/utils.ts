import dayjs from "dayjs";
import { readdir, stat } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { sum, formatBytes } from "@pureadmin/utils";
import {
  name,
  version,
  engines,
  dependencies,
  devDependencies
} from "../package.json";

/** Đường dẫn tuyệt đối của thư mục làm việc hiện tại khi khởi động tiến trình `node` */
const root: string = process.cwd();

/**
 * @description Tạo một đường dẫn tuyệt đối mới dựa trên đoạn đường dẫn tùy chọn
 * @param dir Đoạn đường dẫn, mặc định là `build`
 * @param metaUrl URL đầy đủ của mô-đun, cần truyền `import.meta.url` nếu gọi ngoài thư mục `build`
 */
const pathResolve = (dir = ".", metaUrl = import.meta.url) => {
  // Đường dẫn tuyệt đối của thư mục hiện tại
  const currentFileDir = dirname(fileURLToPath(metaUrl));
  // Đường dẫn tuyệt đối của thư mục build
  const buildDir = resolve(currentFileDir, "build");
  // Đường dẫn tuyệt đối đã được giải quyết
  const resolvedPath = resolve(currentFileDir, dir);
  // Kiểm tra xem đường dẫn tuyệt đối đã giải quyết có nằm trong thư mục build không
  if (resolvedPath.startsWith(buildDir)) {
    // Nếu trong thư mục build, trả về đường dẫn tệp hiện tại
    return fileURLToPath(metaUrl);
  }
  // Nếu không trong thư mục build, trả về đường dẫn tuyệt đối đã giải quyết
  return resolvedPath;
};

/** Đặt biệt danh */
const alias: Record<string, string> = {
  "@": pathResolve("../src"),
  "@build": pathResolve()
};

/** Thông tin về tên nền tảng, phiên bản, phiên bản `node` và `pnpm` cần thiết để chạy, phụ thuộc, và thời gian xây dựng cuối cùng */
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

/** Xử lý biến môi trường */
const wrapperEnv = (envConf: Recordable): ViteEnv => {
  // Giá trị mặc định
  const ret: ViteEnv = {
    VITE_PORT: 8848,
    VITE_PUBLIC_PATH: "",
    VITE_ROUTER_HISTORY: "",
    VITE_CDN: false,
    VITE_HIDE_HOME: "false",
    VITE_COMPRESSION: "none"
  };

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName =
      realName === "true" ? true : realName === "false" ? false : realName;

    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};

const fileListTotal: number[] = [];

/** Lấy tổng kích thước của tất cả các tệp trong thư mục chỉ định */
const getPackageSize = options => {
  const { folder = "dist", callback, format = true } = options;
  readdir(folder, (err, files: string[]) => {
    if (err) throw err;
    let count = 0;
    const checkEnd = () => {
      ++count == files.length &&
        callback(format ? formatBytes(sum(fileListTotal)) : sum(fileListTotal));
    };
    files.forEach((item: string) => {
      stat(`${folder}/${item}`, async (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          fileListTotal.push(stats.size);
          checkEnd();
        } else if (stats.isDirectory()) {
          getPackageSize({
            folder: `${folder}/${item}/`,
            callback: checkEnd
          });
        }
      });
    });
    files.length === 0 && callback(0);
  });
};

export { root, pathResolve, alias, __APP_INFO__, wrapperEnv, getPackageSize };
