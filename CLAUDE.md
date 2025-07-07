# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 开发命令

- `npm run dev` - 启动开发服务器，使用 Vite 和热模块替换
- `npm run build` - 构建生产版本（先运行 TypeScript 编译器，然后运行 Vite 构建）
- `npm run lint` - 运行 ESLint 检查代码质量
- `npm run preview` - 本地预览生产构建

## 项目架构

这是一个基于 React + TypeScript 的应用，使用 Vite 构建，专注于使用 ECharts GL 进行 3D 地图可视化。项目结构遵循模块化方法：

### 核心技术栈

- **React 18** + TypeScript 作为 UI 框架
- **Vite** 用于构建工具和开发服务器
- **ECharts + ECharts GL** 用于 3D 地图渲染和可视化
- **Tailwind CSS** 用于样式
- **Ant Design Icons** 用于 UI 图标

### 关键架构组件

#### 地图可视化系统

- `src/modules/map/Shanghai3DMap.tsx` - 主要的 3D 地图组件，获取上海地图数据并配置 3D 可视化
- `src/modules/map/components/ECharts3DMap.tsx` - 可复用的 ECharts 3D 地图组件，具有适当的清理和调整大小处理
- 地图数据从外部 CDN 获取

#### 模块结构

- `src/modules/` - 基于功能的模块（地图）
- 每个模块包含其主要组件和一个 `components/` 子目录用于可复用部件
- `src/modules/time-slider/TimeSlider.tsx` - 时间滑块组件（目前为占位符）

### ECharts 集成模式

- ECharts 实例被正确初始化和销毁以防止内存泄漏
- 地图注册使用获取的 GeoJSON 数据动态完成
- 使用 `use-resize-observer` 实现响应式图表调整大小
- 为异步地图数据获取实现了加载状态

### 关键文件

- `vite.config.ts` - Vite 配置，包含 React、Tailwind 和单文件插件
- `src/App.tsx` - 主应用组件，渲染上海 3D 地图
- `src/modules/map/components/index.d.ts` - 地图模块的 TypeScript 声明文件
