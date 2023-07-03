/*
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-04-14 15:50:28
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-04-14 16:00:16
 * @FilePath: /mp-native-template/api/szCoinBase/enum/index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
export enum CODE_ENUM {
  SUCCESS = 0,
  UNAUTHORIZED = 10001,
  FORBIDDEN = 10003,
  ERROR = 10000
}

export enum HTTP_STATUS_ENUM {
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  REQUEST_TIMEOUT = 408,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504
}