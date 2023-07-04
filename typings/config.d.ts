interface Config {
  readonly mpName: string;
  readonly mpVersion: string;
  readonly mpThemeColor: string;
  readonly apiBaseUrl: string;
  readonly ossBaseUrl: string;
  readonly baseLoadingText: string;
  readonly tokenName: string;
  readonly tokenPrefix: string;
  readonly header: object;
  readonly storagePrefix: string;
  readonly storageExpireTime: number;
  readonly webviewUrl: object;
  readonly [key: string]: any;
}
