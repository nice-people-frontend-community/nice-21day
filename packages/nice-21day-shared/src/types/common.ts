export enum EState {
  /** 启用 */
  Enable = 'enable',
  /** 禁用 */
  Disable = 'disable',
}

/** 分页封装器 */
export interface IPageFactory<T> {
  rows: T[];
  total: number;
  offset: number;
  limit: number;
  pageNumber?: number;
  pageSize?: number;
}

/** ajax 封装好的返回值 */
export interface IAjaxResponseFactory<T> {
  status?: number;
  success: boolean;
  result: T;
}
