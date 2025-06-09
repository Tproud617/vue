
# 智能手机推荐系统

在如今琳琅满目的手机市场中，我们致力于通过智能分析和用户体验设计，帮助用户轻松找到最适合自己需求的智能手机产品。无论您注重拍照、性能、续航还是性价比，我们都能为您提供个性化的推荐方案。


## 技术栈
 - 框架: Vue 3.4.21（使用组合式API）
 - 路由: Vue Router 4.5.1
 - 状态管理: Pinia 3.0.2
 - UI组件库: Element Plus 2.9.10
 - 构建工具: Vite 5.2.0
 - 部署方式: 配置为在生产环境下使用'/vue/'作为基础路径

 
## 项目结构
    ├─ src/                    # 源代码目录
    │  ├─ views/               # 视图组件
    │  │  ├─ HomeView.vue      # 首页
    │  │  ├─ RecommendView.vue # 推荐页面
    │  │  ├─ DetailView.vue    # 手机详情页
    │  │  ├─ CompareView.vue   # 手机对比页面
    │  │  ├─ FavoriteView.vue  # 收藏页面
    │  │  └─ AboutView.vue     # 关于页面
    │  ├─ router/              # 路由配置
    │  │  └─ index.js         
    │  ├─ stores/              # 状态管理
    │  │  └─ phone.js          # 手机数据和用户偏好管理
    │  ├─ data/                # 静态数据
    │  │  └─ phones.json       # 手机数据
    │  ├─ App.vue              # 应用根组件
    │  └─ main.js              # 应用入口文件
    ├─ public/                 # 公共资源目录
    ├─ index.html              # HTML入口文件
    └─ vite.config.js          # Vite配置文件


## 作者

- [唐子豪](https://www.github.com/Tproud617)
- 郑灿森 陈烁翰 刘鑫 李景浩 胡叶远 莫骏宇


## 致谢

 - 感谢所有使用、贡献和提出宝贵建议的朋友们！你们的支持是本项目前进的动力。