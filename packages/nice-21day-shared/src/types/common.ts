export enum EState {
  /** 启用 */
  Enable = 'enable',
  /** 禁用 */
  Disable = 'disable',
}

/**
 * 分页查询参数
 */
export interface IPageParams {
  /** 从 1 开始 */
  number: number;
  size: number;
}

/** 分页封装器 */
export interface IPageFactory<T> extends IPageParams {
  rows: T[];
  total: number;
}

/** ajax 封装好的返回值 */
export interface IAjaxResponseFactory<T> {
  success: boolean;
  data: T;
  message?: string;
}
