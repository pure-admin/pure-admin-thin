import { ref, onMounted } from "vue";
import { getCode } from "@/api/login";

/**
 * 绘制图形验证码
 * @param width - 图形宽度
 * @param height - 图形高度
 */
export const useImageVerify = () => {
  const imgCode = ref("");
  const imgSrc = ref("");

  function getImgCode() {
    getCode().then(data => {
      if (data.status) {
        imgCode.value = data.data.uuid;
        imgSrc.value = data.data.img;
      }
    });
  }

  onMounted(() => {
    getImgCode();
  });
  return {
    imgSrc,
    imgCode,
    getImgCode
  };
};
