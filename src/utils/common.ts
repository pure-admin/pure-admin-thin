import { PaginationProps } from "@pureadmin/table";
import { Sort } from "element-plus";

export class CommonUtils {
  static getBeginTimeSafely(timeRange: string[]): string {
    if (timeRange == null) {
      return undefined;
    }

    if (timeRange.length <= 0) {
      return undefined;
    }

    if (timeRange[0] == null) {
      return undefined;
    }

    return timeRange[0];
  }

  static getEndTimeSafely(timeRange: string[]): string {
    if (timeRange == null) {
      return undefined;
    }

    if (timeRange.length <= 1) {
      return undefined;
    }

    if (timeRange[1] == null) {
      return undefined;
    }

    return timeRange[1];
  }

  static fillPaginationParams(
    baseQuery: BasePageQuery,
    pagination: PaginationProps
  ) {
    baseQuery.pageNum = pagination.currentPage;
    baseQuery.pageSize = pagination.pageSize;
  }

  static fillSortParams(baseQuery: BasePageQuery, sort: Sort) {
    if (sort == null) {
      return;
    }
    baseQuery.orderColumn = sort.prop;
    baseQuery.orderDirection = sort.order;
  }

  // 私有构造函数，防止类被实例化
  private constructor() {}
}
