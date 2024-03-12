export class ApiAbstract<T = any> {
  public status: number;
  public timestamp: Date;
  public message: string;
  public data: T | T[] | Page<T> | any;
}

export class Page<T> {
  content: T[];
  totalElements: number;
}

export class PageQuery {
  page?: number = 0;
  size?: number = 10;
  sort?: string = "id,asc";
}

export class VersionEntity {
  /**
   * 乐观锁
   */
  version: number;
}

export class BaseEntity extends VersionEntity {
  /**
   * 创建人
   */
  createBy?: string;
  /**
   * 创建时间
   */
  createTime?: Date;
  /**
   * 更新人
   */
  updateBy?: string;
  /**
   * 更新时间
   */
  updateTime?: Date;
  /**
   * 删除状态
   */
  deleted?: number;
}
