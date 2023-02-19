interface IDate {
  [key: string]: number;
}

/** 正则格式化日期 */
export const formatDate = (date: Date, dateFormat: string) => {
  /* 单独格式化年份，根据y的字符数量输出年份
    * 例如：yyyy => 2019
          yy => 19
          y => 9
    */
  if (/(y+)/.test(dateFormat)) {
    dateFormat = dateFormat.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  /** 格式化月、日、时、分、秒 */
  const o: IDate = {
    "m+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "i+": date.getMinutes(),
    "s+": date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(dateFormat)) {
      /** 取出对应的值 */
      const str = o[k] + "";
      /* 根据设置的格式，输出对应的字符
       * 例如: 早上8时，hh => 08，h => 8
       * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
       * 例如: 下午15时，hh => 15, h => 15
       */
      dateFormat = dateFormat.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return dateFormat;
};

/** 日期时间补零 */
export const padLeftZero = (str: string | any[]) => {
  return ("00" + str).substr(str.length);
};
