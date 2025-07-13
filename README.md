# 沪上史者

## 项目概述

专注于上海历史可视化的 3D 地图应用。项目使用现代 React 技术栈，结合 ECharts GL 实现高性能 3D 地图渲染、AI 智能对话和时间轴交互的综合性历史文化平台。

## 安装

- 建议使用`node20`或以上版本
- `npm install` - 安装依赖
- 由于 3D 地图组件存在尚未解决的[issue:移动端 geo 地图点击事件无响应](https://github.com/apache/echarts/issues/18627#issuecomment-1566804110)，需要在安装依赖后、首次使用 vite 运行项目前，将`node_modules/zrender/lib/dom/HandlerProxy.js`中`scope.touching = true;`这一行代码手动注释

## 开发命令

- `npm run dev` - 启动开发服务器，使用 Vite 和热模块替换
- `npm run build` - 构建生产版本（先运行 TypeScript 编译器，然后运行 Vite 构建）
- `npm run lint` - 运行 ESLint 检查代码质量
- `npm run preview` - 本地预览生产构建

## 其他技术信息

请参考本项目的`CLAUDE.md`文档
