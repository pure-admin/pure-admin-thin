import forage from "localforage";
import type { LocalForage, ProxyStorage, ExpiresData } from "./types.d";

class StorageProxy implements ProxyStorage {
  protected storage: LocalForage;
  constructor(storageModel) {
    this.storage = storageModel;
    this.storage.config({
      // Ưu tiên sử dụng IndexedDB làm driver chính, nếu không hỗ trợ IndexedDB sẽ tự động hạ cấp xuống localStorage (WebSQL đã bị loại bỏ, xem chi tiết tại https://developer.chrome.com/blog/deprecating-web-sql)
      driver: [this.storage.INDEXEDDB, this.storage.LOCALSTORAGE],
      name: "pure-admin"
    });
  }

  /**
   * @description Lưu dữ liệu với tên khóa tương ứng vào kho lưu trữ ngoại tuyến
   * @param k Tên khóa
   * @param v Giá trị
   * @param m Thời gian lưu trữ (đơn vị phút, mặc định là 0 phút, lưu trữ vĩnh viễn)
   */
  public async setItem<T>(k: string, v: T, m = 0): Promise<T> {
    return new Promise((resolve, reject) => {
      this.storage
        .setItem(k, {
          data: v,
          expires: m ? new Date().getTime() + m * 60 * 1000 : 0
        })
        .then(value => {
          resolve(value.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description Lấy giá trị tương ứng với tên khóa từ kho lưu trữ ngoại tuyến
   * @param k Tên khóa
   */
  public async getItem<T>(k: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.storage
        .getItem(k)
        .then((value: ExpiresData<T>) => {
          value && (value.expires > new Date().getTime() || value.expires === 0)
            ? resolve(value.data)
            : resolve(null);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description Xóa giá trị tương ứng với tên khóa từ kho lưu trữ ngoại tuyến
   * @param k Tên khóa
   */
  public async removeItem(k: string) {
    return new Promise<void>((resolve, reject) => {
      this.storage
        .removeItem(k)
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description Xóa tất cả các tên khóa từ kho lưu trữ ngoại tuyến, đặt lại cơ sở dữ liệu
   */
  public async clear() {
    return new Promise<void>((resolve, reject) => {
      this.storage
        .clear()
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description Lấy tất cả các khóa từ kho dữ liệu
   */
  public async keys() {
    return new Promise<string[]>((resolve, reject) => {
      this.storage
        .keys()
        .then(keys => {
          resolve(keys);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

/**
 * Bao bọc lại [localforage](https://localforage.docschina.org/) hỗ trợ thiết lập thời gian hết hạn, cung cấp gợi ý kiểu dữ liệu đầy đủ
 */
export const localForage = () => new StorageProxy(forage);
