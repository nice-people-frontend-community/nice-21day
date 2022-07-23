export enum EState {
  /** 启用 */
  Enable = 'enable',
  /** 禁用 */
  Disable = 'disable',
}

export enum EAUDIT_STATE {
  // 未审核
  PENDING = 'pending',
  // 审核通过
  VALID = 'valid',
  // 审核未通过
  INVALID = 'invalid',
}

/**
 * 是否携带用户详情
 * 是否携带训练营详情
 * 0 - false
 * 1 - true
 */
export enum EIsCarryOtherInfo {
  NO = 0,
  YES = 1,
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

export interface ICurentUser {
  id: string;
  login_name: string;
  nick_name: string;
  role: 'admin' | 'user';
  avatar?: string;
  wechat_openid?: string;
}
