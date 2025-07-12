# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 开发命令

- `npm run dev` - 启动开发服务器，使用 Vite 和热模块替换
- `npm run build` - 构建生产版本（先运行 TypeScript 编译器，然后运行 Vite 构建）
- `npm run lint` - 运行 ESLint 检查代码质量
- `npm run preview` - 本地预览生产构建

## 项目概述

"沪上史者" - 专注于上海历史可视化的 3D 地图应用。项目使用现代 React 技术栈，结合 ECharts GL 实现高性能 3D 地图渲染、AI 智能对话和时间轴交互的综合性历史文化平台。

## 核心技术栈

- **React 18** + **TypeScript** - 现代 React 开发框架
- **Vite 6.2.0** - 快速构建工具和开发服务器
- **ECharts 5.6.0** + **ECharts GL 2.0.9** - 3D 地图可视化核心引擎
- **Ant Design 5.26.4** - 企业级 UI 设计语言和组件库
- **Tailwind CSS 4.1.11** - 实用优先的 CSS 框架
- **Styled Components 6.1.19** - CSS-in-JS 样式库
- **React Wrap Balancer 1.1.1** - 优化文本换行显示
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
├── ai-chat-box/              # AI智能对话模块
│   ├── AiChatBox.tsx         # AI聊天界面主组件
│   ├── AiChatBoxModal.tsx    # AI聊天弹窗组件
│   ├── AiChatMessage.tsx     # 消息显示组件
│   ├── api.tsx               # AI对话接口
│   └── useFluentStream.tsx   # 流式输出钩子
├── area-info/                # 地区信息模块
│   ├── AreaInfo.tsx          # 地区信息展示组件
│   └── AreaInfoModal.tsx     # 地区信息弹窗组件
├── control-buttons/          # 控制按钮模块
│   └── ControlButtons.tsx    # 浮动控制按钮组件
├── global-context/           # 全局状态管理模块
│   ├── GlobalContextProvider.tsx  # 全局上下文提供者
│   └── useGlobalContext.tsx  # 全局状态钩子
├── time-slider/              # 时间滑块模块
│   ├── TimeSlider.tsx        # 时间滑块主组件
│   └── components/
│       ├── SlideRuler.tsx    # 时间标尺组件
│       └── CursorIcon.tsx    # 游标图标组件
└── ui/                       # 通用UI组件模块
    └── Modal.tsx             # 自定义弹窗组件
```

### 关键架构组件

#### 3D 地图可视化系统

**`Shanghai3DMap.tsx`** - 主要 3D 地图组件：

- 动态获取上海地图 GeoJSON 数据
- 配置 3D 地图视觉效果（正交投影、透视投影）
- 详细的视角控制和交互配置
- 支持地区点击事件和信息弹窗

**`ECharts3DMap.tsx`** - 可复用的 3D 地图组件：

- 完整的 ECharts 生命周期管理（初始化、销毁、内存清理）
- 响应式图表调整大小（基于 use-resize-observer）
- 异步数据加载和错误处理
- 防止内存泄漏的最佳实践

#### AI 智能对话系统

**`AiChatBox.tsx`** - AI 聊天界面主组件：

- 基于 Ant Design 的现代化聊天界面
- 支持用户输入和 AI 响应的消息展示
- 自动滚动到底部，优化聊天体验
- 响应式设计，适配移动端和桌面端

**`AiChatMessage.tsx`** - 消息显示组件：

- 支持用户消息和 AI 消息的差异化显示
- 集成流式输出功能，提供逐字输出体验

**`useFluentStream.tsx`** - 流式输出钩子：

- 实现 AI 响应的逐字流式输出效果
- 优化用户体验，模拟真实对话感觉

#### 地区信息系统

**`AreaInfo.tsx`** - 地区信息展示组件：

- 动态获取选中地区的历史建筑和事件信息
- 支持加载状态和空数据状态的处理
- 使用 React Wrap Balancer 优化标签文本换行显示

#### 时间滑块系统

**`SlideRuler.tsx`** - 时间标尺组件：

- 基于原生滚动的流畅滑动体验，支持移动端触摸手势
- 可配置的时间范围和刻度密度
- 游标指示器：固定在中心位置，显示当前选中的时间点
- 实时数值标签：动态显示游标对应的具体数值
- 自动对齐功能：滚动结束后自动吸附到最近的刻度位置
- 动态刻度线高度：三层刻度系统，距离衰减形成焦点效果

#### 全局状态管理

**`GlobalContextProvider.tsx`** - 全局状态管理：

- 管理 AI 聊天弹窗开关状态
- 管理地区信息弹窗开关状态
- 管理当前选中地区信息
- 为所有子组件提供统一的状态访问接口

#### 控制按钮系统

**`ControlButtons.tsx`** - 浮动控制按钮：

- 使用 Styled Components 自定义样式的浮动按钮组
- 支持多个功能入口：目前实现 AI 对话入口

### ECharts GL 集成模式

- **动态地图注册**：使用获取的 GeoJSON 数据动态注册地图
- **类型安全**：通过 TypeScript 声明文件解决 ECharts GL 类型问题
- **按需引入**：只引入必要的 ECharts GL 模块以优化包大小
- **生命周期管理**：确保 ECharts 实例正确初始化和销毁

### 样式系统

- **Tailwind CSS v4**：使用最新语法和功能，提供实用优先的 CSS 类
- **Styled Components**：用于复杂组件样式定制，如浮动按钮和弹窗组件
- **Ant Design 主题**：通过 ConfigProvider 自定义组件主题和样式
- **自定义工具类**：在 App.css 中定义全局样式类
- **响应式设计**：适配移动端和桌面端的不同屏幕尺寸

## 关键文件和配置

- **`vite.config.ts`** - Vite 配置，包含 React 插件、Tailwind 集成和单文件构建
- **`src/App.tsx`** - 主应用组件，整合所有功能模块和全局状态管理
- **`src/App.css`** - 全局样式和自定义 Tailwind 工具类
- **`src/modules/map/components/index.d.ts`** - ECharts GL 的 TypeScript 类型声明
- **`src/modules/ui/Modal.tsx`** - 自定义弹窗组件，统一弹窗样式和行为

## 数据源和集成

- **地图数据**：动态获取上海地区 GeoJSON 数据
- **时间范围**：当前配置为 1840-2020 年历史时间段
- **历史数据**：支持地区相关的历史建筑和事件信息查询
- **AI 对话**：集成智能对话接口，提供历史文化知识问答

## 开发约定

- **模块组织**：按功能领域划分模块，每个模块独立管理相关组件
- **组件设计**：优先考虑可复用性和性能优化，使用 React hooks
- **类型安全**：严格的 TypeScript 配置，确保类型检查
- **样式规范**：Tailwind CSS + Styled Components + Ant Design 混合使用
- **代码质量**：通过 ESLint 强制执行代码规范
- **响应式设计**：确保移动端和桌面端兼容性
- **状态管理**：使用 React Context 进行全局状态管理，hooks 进行本地状态管理
- **用户体验**：注重交互流畅性，如流式输出、自动滚动、加载状态等
- **组件通信**：通过全局 Context 实现跨组件状态共享和事件通信
