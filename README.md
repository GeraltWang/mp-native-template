<!--
 * @Author: 王昶 wgeralt@outlook.com
 * @Date: 2023-02-12 22:08:44
 * @LastEditors: 王昶 wgeralt@outlook.com
 * @LastEditTime: 2023-07-04 10:18:31
 * @FilePath: /mp-native-template/README.md
 * @Description: 
-->
# Mp-Native-Template 微信小程序原生开发模板(ts版本)

Mp-Native-Template 基于微信小程序原生框架进行搭建，集成了[TDesign 微信小程序组件库](https://github.com/Tencent/tdesign-miniprogram)方便开发者快速构建标准化的页面，依赖[mobx-miniprogram](https://github.com/mobxjs/mobx)、[mobx-miniprogram-bindings](https://github.com/mobxjs/mobx)，结合微信小程序behaviors特性，实现可控的全局状态管理和便捷的store数据访问。该开发模板涵盖 UI框架、echarts数据可视化、请求处理&封装、全局状态管理、工具函数等功能，能够帮助开发者应对绝大多数场景。

## 构建运行
    1. 小程序开发工具中引入工程

    2. `npm install`

    3. 构建 npm

## 代码风格控制
小程序模版采用 `TypeScript` + `Sass` + `WXML` 进行开发。
采用 `ESLint` 进行代码风格约束，开发者可以根据使用习惯自行修改 `eslintrc` 文件

## 基础库版本
最低基础库版本`^2.6.5`

## 添加新页面
    1. 在 `pages `目录下创建对应的页面文件夹
    2. 在 `app.json` 文件中的 ` "pages"` 数组中加上页面路径
    3. [可选] 在 `project.config.json` 文件的 `"miniprogram-list"` 下添加页面配置

## Documentation

- [tdesign-miniprogram](https://tdesign.tencent.com/miniprogram/overview)
- [mobx-miniprogram](https://github.com/mobxjs/mobx)

