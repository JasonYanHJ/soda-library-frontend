# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 开发命令

- `npm run dev` - 启动开发服务器，使用 Vite 和热模块替换
- `npm run build` - 构建生产版本（先运行 TypeScript 编译器，然后运行 Vite 构建）
- `npm run lint` - 运行 ESLint 检查代码质量
- `npm run preview` - 本地预览生产构建

## 项目概述

"沪上史者" - 专注于上海历史可视化的 3D 地图应用。项目使用现代 React 技术栈，结合 ECharts GL 实现高性能 3D 地图渲染和时间轴交互。

## 核心技术栈

- **React 18** + **TypeScript** - 现代 React 开发框架
- **Vite 6.2.0** - 快速构建工具和开发服务器
- **ECharts 5.6.0** + **ECharts GL 2.0.9** - 3D 地图可视化核心引擎
- **Tailwind CSS 4.1.11** - 实用优先的 CSS 框架
- **use-resize-observer** - 响应式组件调整大小
- **vite-plugin-singlefile** - 单文件构建支持

## 架构设计

### 模块化结构

项目采用按功能领域划分的模块化架构：

```
src/modules/
├── map/                      # 地图可视化模块
│   ├── Shanghai3DMap.tsx     # 上海3D地图主组件
│   └── components/
│       ├── ECharts3DMap.tsx  # 可复用的3D地图组件
│       └── index.d.ts        # TypeScript类型声明
└── time-slider/              # 时间滑块模块
    └── components/
        ├── SlideRuler.tsx    # 时间标尺组件
        └── CursorIcon.tsx    # 游标图标组件
```

### 关键架构组件

#### 3D 地图可视化系统

**`Shanghai3DMap.tsx`** - 主要 3D 地图组件：

- 从腾讯云 CDN 动态获取上海地图 GeoJSON 数据
- 配置 3D 地图视觉效果（正交投影、透视投影）
- 详细的视角控制和交互配置
- 数据驱动的地图渲染

**`ECharts3DMap.tsx`** - 可复用的 3D 地图组件：

- 完整的 ECharts 生命周期管理（初始化、销毁、内存清理）
- 响应式图表调整大小（基于 use-resize-observer）
- 异步数据加载和错误处理
- 防止内存泄漏的最佳实践

#### 时间滑块系统

**`SlideRuler.tsx`** - 时间标尺组件：

- 基于原生滚动的流畅滑动体验，支持移动端触摸手势
- 可配置的时间范围和刻度密度（startValue、endValue、unitWidth）
- 游标指示器：固定在中心位置，显示当前选中的时间点
- 实时数值标签：动态显示游标对应的具体数值
- 自动对齐功能：滚动结束后自动吸附到最近的刻度位置
- 自定义样式（隐藏滚动条、分层刻度线设计）

### ECharts GL 集成模式

- **动态地图注册**：使用获取的 GeoJSON 数据动态注册地图
- **类型安全**：通过 TypeScript 声明文件解决 ECharts GL 类型问题
- **按需引入**：只引入必要的 ECharts GL 模块以优化包大小
- **生命周期管理**：确保 ECharts 实例正确初始化和销毁

### 样式系统

- **Tailwind CSS v4**：使用最新语法和功能
- **自定义工具类**：在 App.css 中定义，如`scrollbar-hidden`
- **响应式设计**：适配不同屏幕尺寸的 3D 地图显示

## 关键文件和配置

- **`vite.config.ts`** - Vite 配置，包含 React 插件、Tailwind 集成和单文件构建
- **`src/App.tsx`** - 主应用组件，使用 Flexbox 布局整合地图和时间滑块
- **`src/App.css`** - 全局样式和自定义 Tailwind 工具类
- **`src/modules/map/components/index.d.ts`** - ECharts GL 的 TypeScript 类型声明

## 数据源

- **地图数据**：从腾讯云 CDN 获取上海地区 GeoJSON 数据
- **时间范围**：当前配置为 1840-2020 年历史时间段
- **可视化数据**：支持在 3D 地图上叠加历史数据点

## 开发约定

- **模块组织**：每个功能模块包含主组件和 components 子目录
- **组件设计**：优先考虑可复用性和性能优化
- **类型安全**：严格的 TypeScript 配置，确保类型检查
- **样式规范**：使用 Tailwind CSS 类名，避免内联样式
- **代码质量**：通过 ESLint 强制执行代码规范
- **交互设计**：确保移动端兼容性
- **状态管理**：使用 React hooks 进行本地状态管理
