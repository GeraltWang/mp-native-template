// 完整请求响应参数（不包含data），继承微信小程序的RequestSuccessCallbackResult
interface AnyResult extends WechatMiniprogram.RequestSuccessCallbackResult {
  data: any;
}

interface SpecResult<T> extends AnyResult {
  data: T;
}

interface Result {
  code: number | string;
  msg: string | null;
}

// 请求响应参数（包含data）
interface ResultData<T = any> extends Result {
  data: T;
}

interface PromiseCatchResult<T> extends Array<T | null> {
  0: T | null;
  1: T | null;
}

interface RequestConfig {
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

interface HttpConfig {
  url: string;
  data?: any;
  options?: RequestOptions;
}

interface UploadFileConfig {
  url: string;
  filePath: string;
  name: string;
  options?: RequestOptions;
}
