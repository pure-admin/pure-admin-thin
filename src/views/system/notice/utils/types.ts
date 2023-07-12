interface AddNoticeRequest {
  noticeId?: number;
  /** 公告标题 */
  noticeTitle: string;
  /** 角色编号 */
  noticeType: string;
  /** 备注 */
  status: string;
  /** 备注 */
  noticeContent: string;
}

interface FormProps {
  formInline: AddNoticeRequest;
}

export type { AddNoticeRequest, FormProps };
