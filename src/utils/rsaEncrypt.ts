import JSEncrypt from "jsencrypt";
// 密钥对生成 http://web.chacuo.net/netrsakeypair
const publicKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD\n" +
  "2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==";

// 加密
export const encrypt = (txt: string) => {
  const crypt = new JSEncrypt();
  // 设置公钥
  crypt.setPublicKey(publicKey);
  const enc = crypt.encrypt(txt);
  return enc; // 对需要加密的数据进行加密
};
