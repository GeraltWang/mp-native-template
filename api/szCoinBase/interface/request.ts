// 完整请求响应参数（不包含data），继承微信小程序的RequestSuccessCallbackResult
export interface AnyResult extends WechatMiniprogram.RequestSuccessCallbackResult {
  data: any;
}

// 完整请求响应参数 （包含data），data声明为泛型
export interface SpecResult<T> extends AnyResult {
  data: T;
}

export interface Result {
  code: number | string;
  msg: string | null;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
  data: T;
}

export interface PromiseCatchResult<T> extends Array<T | null> {
  0: T | null;
  1: T | null;
}

export interface RequestConfig {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT' | undefined;
  data?: any;
  options?: RequestOptions;
}

interface RequestOptions {
  needLoading?: boolean;
  loadingText?: string;
  header?: any;
}

export interface HttpConfig {
  url: string;
  data?: any;
  options?: RequestOptions;
}

export interface UploadFileConfig {
  url: string;
  filePath: string;
  name: string;
  options?: RequestOptions;
}
