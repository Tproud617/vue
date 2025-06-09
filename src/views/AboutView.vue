<!-- 关于页面组件 - 展示系统的详细信息、功能特点、团队信息和联系方式 -->
<template>
  <div class="about-view">
    <!-- 动画背景 - 提供渐变色和浮动效果 -->
    <div class="animated-bg">
      <div class="bg-gradient-1"></div>
      <div class="bg-gradient-2"></div>
    </div>
    
    <!-- 页面标题区域 - 带有动画效果的标题 -->
    <header class="page-header fade-up" v-bind:class="{ 'animated': true, 'visible': animatedElements.header }">
      <h1 class="header-title">关于我们</h1>
      <!-- 标题装饰线 - 增强视觉效果 -->
      <div class="header-decoration"></div>
    </header>
    
    <div class="content-container">
      <!-- 主要内容区 - 描述系统的主要信息和使命 -->
      <section class="about-section main-info fade-up" v-bind:class="{ 'animated': true, 'visible': animatedElements.mainInfo }">
        <div class="section-header">
          <div class="icon-container">
            <el-icon :size="52" color="#42b983"><InfoFilled /></el-icon>
          </div>
          <h2>手机推荐系统</h2>
        </div>
        
        <p class="tagline">帮助您找到最适合自己的智能手机</p>
        
        <!-- 信息卡片 - 展示系统使命 -->
        <div class="info-card">
          <div class="card-content">
            <h3>我们的使命</h3>
            <p>在如今琳琅满目的手机市场中，我们致力于通过智能分析和用户体验设计，帮助用户轻松找到最适合自己需求的智能手机产品。无论您注重拍照、性能、续航还是性价比，我们都能为您提供个性化的推荐方案。</p>
          </div>
        </div>
      </section>
      
      <!-- 核心功能区 - 展示系统主要特性 -->
      <section class="about-section features fade-up" v-bind:class="{ 'animated': true, 'visible': animatedElements.features }">
        <h2 class="section-title">核心功能</h2>
        
        <!-- 功能卡片网格 - 使用v-for循环渲染功能卡片 -->
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon" :style="{ background: feature.color }">
              <el-icon :size="32"><component :is="feature.icon" /></el-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </section>
      
      <!-- 数据和技术区 - 展示数据来源和算法流程 -->
      <section class="about-section data-tech fade-up" v-bind:class="{ 'animated': true, 'visible': animatedElements.dataTech }">
        <div class="two-columns">
          <!-- 数据来源列 -->
          <div class="column">
            <h2 class="section-title">数据来源</h2>
            <div class="info-card">
              <div class="card-content">
                <p>我们的数据来源于以下渠道：</p>
                <!-- 数据源列表 - 使用自定义样式的列表 -->
                <ul class="data-sources">
                  <li><span class="bullet"></span>各大厂商官方规格数据</li>
                  <li><span class="bullet"></span>专业评测机构的性能测试</li>
                  <li><span class="bullet"></span>真实用户反馈与评分</li>
                  <li><span class="bullet"></span>市场销售数据与价格趋势</li>
                </ul>
                <p class="update-info">数据每周更新，确保信息准确性和时效性</p>
              </div>
            </div>
          </div>
          
          <!-- 推荐算法列 -->
          <div class="column">
            <h2 class="section-title">推荐算法</h2>
            <div class="info-card">
              <div class="card-content">
                <!-- 算法流程步骤 - 直观展示推荐过程 -->
                <div class="algorithm-process">
                  <div class="process-step">
                    <div class="step-number">1</div>
                    <div class="step-info">用户偏好分析</div>
                  </div>
                  <div class="process-connector"></div>
                  <div class="process-step">
                    <div class="step-number">2</div>
                    <div class="step-info">参数匹配计算</div>
                  </div>
                  <div class="process-connector"></div>
                  <div class="process-step">
                    <div class="step-number">3</div>
                    <div class="step-info">性价比评估</div>
                  </div>
                  <div class="process-connector"></div>
                  <div class="process-step">
                    <div class="step-number">4</div>
                    <div class="step-info">个性化推荐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 发展历程区 - 时间线展示项目发展 -->
      <section class="about-section timeline fade-up" v-bind:class="{ 'animated': true, 'visible': animatedElements.timeline }">
        <h2 class="section-title">发展历程</h2>
        
        <!-- 时间线容器 - 垂直方向展示发展里程碑 -->
        <div class="timeline-container">
          <div class="timeline-item" v-for="(item, index) in timeline" :key="index">
            <div class="timeline-marker" :class="{ 'active': index === 0 }"></div>
            <div class="timeline-content">
              <span class="timeline-date">{{ item.date }}</span>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 团队成员区 - 展示项目团队信息 -->
      <section class="about-section team fade-up" v-bind:class="{ 'animated': true, 'visible': animatedElements.team }">
        <h2 class="section-title">我们的团队</h2>
        
        <!-- 团队成员网格 - 使用v-for循环渲染成员卡片 -->
        <div class="team-grid">
          <div class="team-member" v-for="(member, index) in teamMembers" :key="index">
            <div class="member-avatar" :style="{ backgroundImage: `url(${member.avatar})` }">
              <div class="member-overlay"></div>
            </div>
            <h3>{{ member.name }}</h3>
            <p class="member-title">{{ member.title }}</p>
          </div>
        </div>
      </section>
      
      <!-- 联系方式区 - 提供联系信息 -->
      <section class="about-section contact fade-up" v-bind:class="{ 'animated': true, 'visible': animatedElements.contact }">
        <h2 class="section-title">联系我们</h2>
        
        <!-- 联系卡片 - 包含多种联系方式 -->
        <div class="contact-card">
          <div class="contact-methods">
            <div class="contact-method">
              <el-icon :size="28"><Message /></el-icon>
              <p>邮件：<a href="mailto:Tproud617@qq.com">Tproud617@qq.com</a></p>
            </div>
            <div class="contact-method">
              <el-icon :size="28"><Service /></el-icon>
              <p>客服热线：666-666-6666</p>
            </div>
            <div class="contact-method">
              <el-icon :size="28"><Location /></el-icon>
              <p>地址：中国·清远市清城区广东财贸职业学院</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 导航按钮区 - 提供页面跳转功能 -->
      <div class="fixed-actions-wrapper">
        <div class="fixed-actions" :class="{ 'force-visible': true }">
          <button class="custom-button primary-button" @click="goHome">
          <el-icon><HomeFilled /></el-icon>
          返回首页
          </button>
          <button class="custom-button success-button" @click="goRecommend">
          <el-icon><Search /></el-icon>
          开始推荐
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  InfoFilled, 
  HomeFilled, 
  Search, 
  Message, 
  Service, 
  Location, 
  DataAnalysis, 
  Histogram, 
  Monitor, 
  Avatar
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航方法 - 页面跳转功能
const goHome = () => {
  router.push('/')
}

const goRecommend = () => {
  router.push('/recommend')
}

// 动画控制状态 - 管理各区域的滚动动画效果
const animatedElements = ref({
  header: false,
  mainInfo: false,
  features: false,
  dataTech: false,
  timeline: false,
  team: false,
  contact: false,
  actions: false
})

// 滚动监听配置 - 定义监听元素进入视口的参数
const observerOptions = {
  root: null, // 使用视口作为根
  rootMargin: '0px 0px -10% 0px', // 当元素进入视口的底部10%时触发
  threshold: 0.1 // 当元素10%的部分可见时触发
}

// 创建观察者数组 - 用于存储所有滚动观察器
let observers = []

// 设置滚动观察 - 监听元素进入视口并触发动画
const setupScrollObservers = () => {
  // 清除之前的观察者
  observers.forEach(observer => observer.disconnect())
  observers = []
  
  // 观察所有可动画元素
  const sections = [
    { selector: '.page-header', key: 'header' },
    { selector: '.main-info', key: 'mainInfo' },
    { selector: '.features', key: 'features' },
    { selector: '.data-tech', key: 'dataTech' },
    { selector: '.timeline', key: 'timeline' },
    { selector: '.team', key: 'team' },
    { selector: '.contact', key: 'contact' },
    { selector: '.actions-container', key: 'actions' }
  ]
  
  sections.forEach(section => {
    const element = document.querySelector(section.selector)
    if (element) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animatedElements.value[section.key] = true
            observer.unobserve(entry.target) // 触发一次后不再观察
          }
        })
      }, observerOptions)
      
      observer.observe(element)
      observers.push(observer)
    }
  })
}

// 生命周期钩子 - 组件挂载时初始化
onMounted(() => {
  // 设置页面初始位置
  window.scrollTo(0, 0)
  
  // 启动基于滚动的动画
  setupScrollObservers()
  
  // 首先显示标题
  setTimeout(() => {
    animatedElements.value.header = true
  }, 300)
})

// 组件卸载时清理资源
onUnmounted(() => {
  // 清除所有观察者
  observers.forEach(observer => observer.disconnect())
})

// 功能特点数据
const features = ref([
  {
    icon: 'DataAnalysis',
    title: '智能推荐',
    description: '根据用户偏好和使用场景，提供个性化的手机推荐',
    color: 'linear-gradient(135deg, #42b983, #2f9768)'
  },
  {
    icon: 'Histogram',
    title: '详细对比',
    description: '多维度参数对比，直观展示不同机型的优缺点',
    color: 'linear-gradient(135deg, #409EFF, #2e88e5)'
  },
  {
    icon: 'Monitor',
    title: '实时数据',
    description: '定期更新手机数据，确保推荐结果的时效性',
    color: 'linear-gradient(135deg, #f56c6c, #d04545)'
  },
  {
    icon: 'Avatar',
    title: '用户收藏',
    description: '支持收藏感兴趣的机型，方便随时查看和对比',
    color: 'linear-gradient(135deg, #e6a23c, #c88326)'
  }
])

// 时间线数据 - 展示项目发展历程
const timeline = ref([
  {
    date: '2025年6月',
    title: '3.0版本发布',
    description: '全新UI设计，系统全面升级，提供更智能的手机推荐'
  },
  {
    date: '2023年10月',
    title: '2.0版本更新',
    description: '添加对比功能，支持多达4款手机的详细参数对比'
  },
  {
    date: '2023年5月',
    title: '收藏功能上线',
    description: '用户可以收藏感兴趣的手机型号，方便后续查看'
  },
  {
    date: '2023年1月',
    title: '项目启动',
    description: '手机推荐系统1.0版本开发并上线测试'
  }
])

// 团队成员数据 - 展示项目团队信息
const teamMembers = ref([
  {
    name: '唐子豪',
    title: '项目总负责人',
    avatar: '/vue/images/唐子豪.png'
  },
  {
    name: '郑灿森',
    title: '数据分析工程师',
    avatar: '/vue/images/郑灿森.png'
  },
  {
    name: '陈烁翰',
    title: '算法工程师',
    avatar: '/vue/images/陈烁翰.png'
  },
  {
    name: '刘鑫',
    title: '前端开发工程师',
    avatar: '/vue/images/刘鑫.png'
  },
  {
    name: '李景浩',
    title: '后端开发工程师',
    avatar: '/vue/images/李景浩.png'
  },
  {
    name: '胡叶远',
    title: 'UI设计工程师',
    avatar: '/vue/images/胡叶远.png'
  },
  {
    name: '莫骏宇',
    title: '运维工程师',
    avatar: '/vue/images/莫骏宇.png'
  }
])

// 联系方式数据 - 展示联系信息
const contactMethods = ref([
  {
    icon: 'Message',
    text: '邮件：Tproud617@qq.com'
  },
  {
    icon: 'Service',
    text: '客服热线：666-666-6666'
  },
  {
    icon: 'Location',
    text: '地址：中国·清远市清城区广东财贸职业学院'
  }
])
</script>

<style scoped>
.about-view {
  min-height: 100vh; /* 设置最小高度为视口高度，确保页面至少充满整个屏幕 */
  background-color: #f5f7fa; /* 设置背景颜色为浅灰色 */
  position: relative; /* 设置相对定位，作为子元素定位的参考点 */
  overflow-x: hidden; /* 隐藏水平方向溢出内容 */
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
}

/* 淡入上升动画 - 元素进入视口时的动画效果 */
.fade-up {
  opacity: 0; /* 设置不透明度为0，初始状态完全透明 */
  transform: translateY(40px); /* 初始状态向下偏移40像素 */
  transition: all 0s; /* 设置过渡效果为0秒，初始状态没有过渡效果 */
  pointer-events: none; /* 禁用鼠标事件，使元素不响应鼠标操作 */
  will-change: opacity, transform; /* 提示浏览器将要变化的属性，优化性能 */
}

.fade-up.animated {
  transition: opacity 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), 
              transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加不透明度和位移的过渡效果，持续0.6秒 */
}

.fade-up.animated.visible {
  opacity: 1; /* 设置不透明度为1，元素完全可见 */
  transform: translateY(0); /* 恢复原位，不再偏移 */
  pointer-events: auto; /* 启用鼠标事件，使元素可以响应鼠标操作 */
}

/* 动画背景 - 渐变色背景和浮动效果 */
.animated-bg {
  position: fixed; /* 设置固定定位，相对于视口 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满整个视口 */
  height: 100%; /* 高度占满整个视口 */
  background: linear-gradient(135deg, rgba(245, 247, 250, 0.97) 0%, rgba(195, 207, 226, 0.97) 100%); /* 设置135度角的渐变背景 */
  z-index: -1; /* 设置层级为-1，确保在其他内容之下 */
}

/* 背景渐变元素 - 创建浮动效果 */
.bg-gradient-1,
.bg-gradient-2 {
  position: absolute; /* 设置绝对定位，相对于父元素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  filter: blur(70px); /* 添加70像素的模糊效果 */
  z-index: 0; /* 设置层级为0 */
  opacity: 0.5; /* 设置不透明度为0.5 */
  will-change: transform; /* 提示浏览器将要变化的属性，优化性能 */
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 设置径向渐变背景，从中心向外扩散 */
  width: 50vw; /* 设置宽度为视口宽度的50% */
  height: 50vw; /* 设置高度为视口宽度的50% */
  top: -10vw; /* 顶部位置偏移-10vw */
  right: -10vw; /* 右侧位置偏移-10vw */
  animation: float-1 15s ease-in-out infinite alternate; /* 应用float-1动画，持续15秒，无限循环，交替方向 */
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 设置径向渐变背景，从中心向外扩散 */
  width: 60vw; /* 设置宽度为视口宽度的60% */
  height: 60vw; /* 设置高度为视口宽度的60% */
  bottom: -20vw; /* 底部位置偏移-20vw */
  left: -20vw; /* 左侧位置偏移-20vw */
  animation: float-2 20s ease-in-out infinite alternate; /* 应用float-2动画，持续20秒，无限循环，交替方向 */
}

/* 浮动动画 - 背景渐变的移动效果 */
@keyframes float-1 {
  0% {
    transform: translate(0, 0); /* 动画开始时不位移 */
  }
  100% {
    transform: translate(-5vw, 5vw); /* 动画结束时向左下移动 */
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0); /* 动画开始时不位移 */
  }
  100% {
    transform: translate(5vw, -5vw); /* 动画结束时向右上移动 */
  }
}

/* 标题区样式 - 增强标题的视觉效果 */
.page-header {
  text-align: center; /* 文字居中对齐 */
  padding: 60px 0 20px; /* 设置内边距，上60像素，左右0，下20像素 */
  position: relative; /* 设置相对定位 */
  margin-bottom: 40px; /* 设置下边距为40像素 */
  width: 100%; /* 宽度占满父元素 */
}

.header-title {
  font-size: 3.5rem; /* 设置字体大小为3.5倍根元素字体大小 */
  font-weight: 800; /* 设置字体粗细为800 */
  background: linear-gradient(to right, #37a873, #287057, #37a873); /* 设置从左到右的渐变背景 */
  -webkit-background-clip: text; /* 设置背景裁剪为文本 */
  -webkit-text-fill-color: transparent; /* 设置文本填充颜色为透明 */
  background-clip: text; /* 设置背景裁剪为文本 */
  margin: 0; /* 移除默认边距 */
  letter-spacing: 0px; /* 设置字母间距为0 */
  animation: shimmer 5s infinite; /* 应用shimmer动画，持续5秒，无限循环 */
  background-size: 200% 100%; /* 设置背景大小，宽度为元素的2倍，高度与元素相同 */
  display: inline-block; /* 设置为行内块元素 */
  filter: drop-shadow(0 2px 4px rgba(66, 185, 131, 0.3)); /* 添加投影效果 */
  transition: all 0.5s ease; /* 添加所有属性变化的过渡效果，持续0.5秒 */
  text-rendering: geometricPrecision; /* 设置文本渲染方式为几何精确度 */
}

/* 标题悬停效果 */
.header-title:hover {
  transform: scale(1.05); /* 鼠标悬停时放大1.05倍 */
  filter: drop-shadow(0 3px 6px rgba(66, 185, 131, 0.5)); /* 增强投影效果 */
}

/* 标题下方装饰线 */
.header-decoration {
  width: 120px; /* 设置宽度为120像素 */
  height: 4px; /* 设置高度为4像素 */
  background: linear-gradient(to right, transparent, #42b983, transparent); /* 设置从左到右的渐变背景 */
  margin: 15px auto 0; /* 设置上边距为15像素，左右自动居中，下边距为0 */
  border-radius: 2px; /* 设置边框圆角为2像素 */
}

/* 标题闪烁动画 */
@keyframes shimmer {
  0% {
    background-position: -100% 0; /* 动画开始时，背景位置在左侧外部 */
  }
  100% {
    background-position: 200% 0; /* 动画结束时，背景位置移动到右侧外部，形成闪烁效果 */
  }
}

/* 内容容器 - 控制页面内容的宽度和间距 */
.content-container {
  max-width: 1200px; /* 设置最大宽度为1200像素 */
  margin: 0 auto; /* 上下边距为0，左右自动居中 */
  padding: 0 20px 60px; /* 设置内边距，上0，左右20像素，下60像素 */
  width: 100%; /* 宽度占满父元素 */
}

/* Sections - 移除内置动画，使用新的滚动动画 */
.about-section {
  margin-bottom: 80px; /* 设置下边距为80像素 */
  width: 100%; /* 宽度占满父元素 */
}

/* Main Info */
.main-info {
  text-align: center; /* 文字居中对齐 */
}

.section-header {
  margin-bottom: 20px; /* 设置下边距为20像素 */
}

.section-header h2 {
  font-size: 2.5rem; /* 设置字体大小为2.5倍根元素字体大小 */
  color: #303133; /* 设置文字颜色为深灰色 */
  margin: 15px 0; /* 设置上下边距为15像素，左右边距为0 */
  transition: color 0.3s ease; /* 添加颜色变化的过渡效果，持续0.3秒 */
}

.section-header:hover h2 {
  color: #42b983; /* 鼠标悬停时，文字颜色变为绿色 */
}

.icon-container {
  display: inline-flex; /* 设置为行内弹性容器 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  width: 96px; /* 设置宽度为96像素 */
  height: 96px; /* 设置高度为96像素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  background: white; /* 设置背景颜色为白色 */
  box-shadow: 0 15px 35px rgba(66, 185, 131, 0.2); /* 添加阴影效果 */
  margin-bottom: 20px; /* 设置下边距为20像素 */
  position: relative; /* 设置相对定位 */
  animation: pulse 3s infinite; /* 应用pulse动画，持续3秒，无限循环 */
  transition: transform 0.3s ease; /* 添加变换的过渡效果，持续0.3秒 */
}

.icon-container:hover {
  transform: scale(1.1) rotate(5deg); /* 鼠标悬停时放大1.1倍并旋转5度 */
  box-shadow: 0 20px 40px rgba(66, 185, 131, 0.3); /* 增强阴影效果 */
}

.icon-container::after {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  width: 100%; /* 宽度占满父元素 */
  height: 100%; /* 高度占满父元素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  border: 1px solid rgba(66, 185, 131, 0.3); /* 添加1像素宽的绿色边框 */
  animation: ripple 2s infinite; /* 应用ripple动画，持续2秒，无限循环 */
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(66, 185, 131, 0.4); /* 动画开始时，阴影较小 */
  }
  70% {
    box-shadow: 0 0 0 15px rgba(66, 185, 131, 0); /* 动画进行70%时，阴影扩大并渐隐 */
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 185, 131, 0); /* 动画结束时，阴影完全消失 */
  }
}

@keyframes ripple {
  0% {
    transform: scale(1); /* 动画开始时，伪元素与父元素同大小 */
    opacity: 1; /* 动画开始时完全不透明 */
  }
  100% {
    transform: scale(1.5); /* 动画结束时，伪元素放大1.5倍 */
    opacity: 0; /* 动画结束时完全透明 */
  }
}

.tagline {
  font-size: 1.5rem; /* 设置字体大小为1.5倍根元素字体大小 */
  color: #606266; /* 设置文字颜色为灰色 */
  margin-bottom: 30px; /* 设置下边距为30像素 */
  font-weight: 300; /* 设置字体粗细为300 */
}

/* Cards - 增强交互效果 */
.info-card {
  background: white; /* 设置背景颜色为白色 */
  border-radius: 16px; /* 设置边框圆角为16像素 */
  overflow: hidden; /* 隐藏溢出内容 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* 添加阴影效果 */
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease; /* 添加变换和阴影的过渡效果 */
}

.info-card:hover {
  transform: translateY(-10px); /* 鼠标悬停时向上移动10像素 */
  box-shadow: 0 20px 40px rgba(66, 185, 131, 0.15); /* 增强阴影效果 */
}

.card-content {
  padding: 25px; /* 设置内边距为25像素 */
}

.main-info .card-content h3 {
  font-size: 1.4rem; /* 设置字体大小为1.4倍根元素字体大小 */
  color: #42b983; /* 设置文字颜色为绿色 */
  margin-bottom: 15px; /* 设置下边距为15像素 */
  position: relative; /* 设置相对定位 */
  display: inline-block; /* 设置为行内块元素 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.main-info .card-content h3::after {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  bottom: -5px; /* 底部位置偏移-5像素 */
  left: 0; /* 左侧对齐 */
  width: 0; /* 初始宽度为0 */
  height: 2px; /* 设置高度为2像素 */
  background: linear-gradient(to right, #42b983, transparent); /* 设置从左到右的渐变背景 */
  transition: width 0.3s ease; /* 添加宽度变化的过渡效果，持续0.3秒 */
}

.main-info .card-content:hover h3::after {
  width: 100%; /* 鼠标悬停时，伪元素宽度扩展到100% */
}

.main-info .card-content p {
  color: #606266; /* 设置文字颜色为灰色 */
  line-height: 1.8; /* 设置行高为1.8倍字体大小 */
  font-size: 1.05rem; /* 设置字体大小为1.05倍根元素字体大小 */
}

/* Features - 增强卡片交互性 */
.features-grid {
  display: grid; /* 使用网格布局 */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 设置网格列，自动适应，最小宽度250像素，最大1等份 */
  grid-gap: 25px; /* 设置网格间距为25像素 */
}

.feature-card {
  background: white; /* 设置背景颜色为白色 */
  border-radius: 16px; /* 设置边框圆角为16像素 */
  padding: 25px; /* 设置内边距为25像素 */
  text-align: center; /* 文字居中对齐 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06); /* 添加阴影效果 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加所有属性的过渡效果 */
  height: 100%; /* 高度占满父元素 */
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  transform: translateZ(0); /* 启用GPU加速 */
}

.feature-card:hover {
  transform: translateY(-12px) scale(1.02); /* 鼠标悬停时向上移动12像素并放大1.02倍 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); /* 增强阴影效果 */
}

.feature-icon {
  width: 70px; /* 设置宽度为70像素 */
  height: 70px; /* 设置高度为70像素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  margin-bottom: 20px; /* 设置下边距为20像素 */
  color: white; /* 设置文字颜色为白色 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg); /* 鼠标悬停时，图标放大1.1倍并旋转5度 */
}

.feature-card h3 {
  font-size: 1.25rem; /* 设置字体大小为1.25倍根元素字体大小 */
  color: #303133; /* 设置文字颜色为深灰色 */
  margin: 0 0 15px; /* 设置下边距为15像素 */
  position: relative; /* 设置相对定位 */
  display: inline-block; /* 设置为行内块元素 */
  transition: color 0.3s ease; /* 添加颜色变化的过渡效果，持续0.3秒 */
}

.feature-card:hover h3 {
  color: #42b983; /* 鼠标悬停时，文字颜色变为绿色 */
}

.feature-card p {
  color: #606266; /* 设置文字颜色为灰色 */
  line-height: 1.7; /* 设置行高为1.7倍字体大小 */
  flex-grow: 1; /* 允许元素在需要时拉伸，占据剩余空间 */
}

/* 数据和技术双列布局恢复 */
.data-tech .two-columns {
  display: grid; /* 使用网格布局 */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 设置网格列，自动适应，最小宽度280像素，最大1等份 */
  grid-gap: 30px; /* 设置网格间距为30像素 */
}

/* 数据来源卡片增强 */
.data-sources {
  list-style: none; /* 移除列表样式 */
  padding: 0; /* 移除内边距 */
  margin: 20px 0; /* 设置上下边距为20像素 */
}

/* 数据来源卡片增强 */
.data-sources li {
  padding: 10px 0; /* 设置上下内边距为10像素 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  font-size: 1.05rem; /* 设置字体大小为1.05倍根元素字体大小 */
  color: #606266; /* 设置文字颜色为灰色 */
  transition: transform 0.3s ease; /* 添加变换的过渡效果，持续0.3秒 */
}

.data-sources li:hover {
  transform: translateX(5px); /* 鼠标悬停时向右移动5像素 */
  color: #303133; /* 鼠标悬停时，文字颜色变为深灰色 */
}

.bullet {
  width: 10px; /* 设置宽度为10像素 */
  height: 10px; /* 设置高度为10像素 */
  background: #42b983; /* 设置背景颜色为绿色 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  margin-right: 15px; /* 设置右边距为15像素 */
  flex-shrink: 0; /* 防止弹性收缩 */
  transition: transform 0.3s ease; /* 添加变换的过渡效果，持续0.3秒 */
}

.data-sources li:hover .bullet {
  transform: scale(1.3); /* 鼠标悬停时，圆点放大1.3倍 */
}

/* 算法流程动画增强 */
.process-step {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  padding: 12px 0; /* 设置上下内边距为12像素 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.process-step:hover {
  transform: translateX(8px); /* 鼠标悬停时向右移动8像素 */
}

.step-number {
  width: 36px; /* 设置宽度为36像素 */
  height: 36px; /* 设置高度为36像素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  background: linear-gradient(135deg, #42b983, #2f9768); /* 设置渐变背景 */
  color: white; /* 设置文字颜色为白色 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  font-weight: bold; /* 设置字体粗细为粗体 */
  margin-right: 15px; /* 设置右边距为15像素 */
  flex-shrink: 0; /* 防止弹性收缩 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.process-step:hover .step-number {
  transform: scale(1.2); /* 鼠标悬停时放大1.2倍 */
  box-shadow: 0 5px 15px rgba(66, 185, 131, 0.3); /* 添加阴影效果 */
}

.process-connector {
  width: 2px; /* 设置宽度为2像素 */
  height: 20px; /* 设置高度为20像素 */
  background: #42b983; /* 设置背景颜色为绿色 */
  margin-left: 18px; /* 设置左边距为18像素 */
}

.step-info {
  color: #303133; /* 设置文字颜色为深灰色 */
  font-weight: 500; /* 设置字体粗细为500 */
  font-size: 1.1rem; /* 设置字体大小为1.1倍根元素字体大小 */
}

.update-info {
  font-style: italic; /* 设置字体样式为斜体 */
  color: #909399; /* 设置文字颜色为灰色 */
  margin-top: 15px; /* 设置上边距为15像素 */
  font-size: 0.9rem; /* 设置字体大小为0.9倍根元素字体大小 */
}

/* 联系卡片样式恢复 */
.contact-card {
  background: white; /* 设置背景颜色为白色 */
  border-radius: 16px; /* 设置边框圆角为16像素 */
  overflow: hidden; /* 隐藏溢出内容 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* 添加阴影效果 */
  padding: 30px; /* 设置内边距为30像素 */
}

.contact-methods {
  display: grid; /* 使用网格布局 */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 设置网格列，自动适应，最小宽度280像素，最大1等份 */
  grid-gap: 20px; /* 设置网格间距为20像素 */
  margin-bottom: 30px; /* 设置下边距为30像素 */
}

.contact-method {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 15px; /* 设置元素间距为15像素 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.contact-method:hover {
  transform: translateY(-5px); /* 鼠标悬停时向上移动5像素 */
}

.contact-method .el-icon {
  color: #42b983; /* 设置图标颜色为绿色 */
  flex-shrink: 0; /* 防止弹性收缩 */
  transition: transform 0.3s ease; /* 添加变换的过渡效果，持续0.3秒 */
}

.contact-method:hover .el-icon {
  transform: scale(1.2); /* 鼠标悬停时，图标放大1.2倍 */
}

.contact-method p {
  margin: 0; /* 移除默认边距 */
  color: #606266; /* 设置文字颜色为灰色 */
}

.contact-method a {
  color: #409eff; /* 设置链接颜色为蓝色 */
  text-decoration: none; /* 移除下划线 */
  transition: color 0.3s; /* 添加颜色变化的过渡效果，持续0.3秒 */
}

.contact-method a:hover {
  color: #337ecc; /* 鼠标悬停时，链接颜色变深 */
}

/* 底部按钮容器和按钮样式完整修复 */
.actions-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
  flex-wrap: wrap;
}

.action-button {
  padding: 12px 25px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  font-size: 1.1rem !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
  position: relative !important;
  overflow: hidden !important;
  min-width: 180px !important;
  height: auto !important;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.action-button:hover::before {
  transform: translateX(100%);
}

.action-button:hover {
  transform: translateY(-8px) !important;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15) !important;
}

/* 时间线容器样式恢复 */
.timeline-container {
  position: relative; /* 设置相对定位 */
  padding: 20px 0; /* 设置上下内边距为20像素 */
}

.timeline-container::before {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  top: 0; /* 顶部对齐 */
  bottom: 0; /* 底部对齐 */
  left: 20px; /* 左侧位置偏移20像素 */
  width: 2px; /* 设置宽度为2像素 */
  background: #dcdfe6; /* 设置背景颜色为灰色 */
}

.timeline-date {
  display: inline-block; /* 设置为行内块元素 */
  padding: 4px 10px; /* 设置内边距，上下4像素，左右10像素 */
  background: #f0f9eb; /* 设置背景颜色为浅绿色 */
  color: #67c23a; /* 设置文字颜色为绿色 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
  font-size: 0.9rem; /* 设置字体大小为0.9倍根元素字体大小 */
  margin-bottom: 10px; /* 设置下边距为10像素 */
}

.timeline-title {
  font-size: 1.2rem; /* 设置字体大小为1.2倍根元素字体大小 */
  margin: 0 0 10px; /* 设置下边距为10像素 */
  color: #303133; /* 设置文字颜色为深灰色 */
}

.timeline-description {
  color: #606266; /* 设置文字颜色为灰色 */
  margin: 0; /* 移除默认边距 */
  line-height: 1.5; /* 设置行高为1.5倍字体大小 */
}

/* 统一设置标题样式，与首页保持一致 */
.section-title {
  font-size: 1.6rem; /* 设置字体大小为1.6倍根元素字体大小 */
  color: #303133; /* 设置文字颜色为深灰色 */
  text-align: center; /* 文字居中对齐 */
  margin-bottom: 30px; /* 设置下边距为30像素 */
  position: relative; /* 设置相对定位 */
}

.section-title::after {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  bottom: -8px; /* 底部位置偏移-8像素 */
  left: 50%; /* 左侧位置为50% */
  transform: translateX(-50%); /* 水平居中 */
  width: 60px; /* 设置宽度为60像素 */
  height: 3px; /* 设置高度为3像素 */
  background: linear-gradient(to right, #42b983, #2f9768); /* 设置从左到右的渐变背景 */
  border-radius: 2px; /* 设置边框圆角为2像素 */
}

/* 响应式适配 */
@media (max-width: 768px) {
  .page-header {
    padding: 30px 0; /* 减少内边距，上下30像素 */
  }
  
  .header-title {
    font-size: 2.5rem; /* 减小标题字体大小为2.5倍根元素字体大小 */
  }
  
  .section-title {
    font-size: 1.4rem; /* 减小标题字体大小为1.4倍根元素字体大小 */
  }
  
  .section-header h2 {
    font-size: 2rem; /* 减小标题字体大小为2倍根元素字体大小 */
  }
  
  .tagline {
    font-size: 1.2rem; /* 减小标语字体大小为1.2倍根元素字体大小 */
  }
  
  .content-container {
    padding: 0 15px 40px; /* 减少内边距，左右15像素，下40像素 */
  }
  
  .about-section {
    margin-bottom: 50px; /* 减少下边距为50像素 */
  }
  
  .card-content {
    padding: 20px; /* 减少内边距为20像素 */
  }
  
  .timeline-item {
    padding-left: 40px; /* 减少左内边距为40像素 */
  }
  
  .contact-methods {
    grid-template-columns: 1fr; /* 改为单列布局 */
  }
  
  .actions-container {
    flex-direction: column; /* 改为垂直排列 */
    align-items: stretch; /* 水平拉伸对齐 */
    gap: 15px; /* 设置元素间距为15像素 */
  }
  
  .action-button {
    width: 100%; /* 宽度占满父元素 */
  }
  
  .icon-container {
    width: 80px; /* 减小宽度为80像素 */
    height: 80px; /* 减小高度为80像素 */
  }
}

@media (max-width: 480px) {
  .features-grid,
  .team-grid {
    grid-template-columns: 1fr; /* 改为单列布局 */
  }
  
  .timeline-content {
    padding: 15px; /* 减少内边距为15像素 */
  }
  
  .timeline-title {
    font-size: 1.1rem; /* 减小字体大小为1.1倍根元素字体大小 */
  }
}

/* 全新自定义按钮样式 */
.fixed-actions-wrapper {
  width: 100%; /* 宽度占满父元素 */
  display: block; /* 设置为块级元素 */
  margin: 40px 0 60px; /* 设置上边距为40像素，下边距为60像素 */
  position: relative; /* 设置相对定位 */
  z-index: 100; /* 设置层级为100，确保在其他内容之上 */
}

.fixed-actions {
  display: flex !important; /* 使用弹性布局 */
  justify-content: center !important; /* 水平居中对齐 */
  gap: 20px !important; /* 设置元素间距为20像素 */
  width: 100% !important; /* 宽度占满父元素 */
  flex-wrap: wrap !important; /* 允许元素换行 */
  opacity: 1 !important; /* 设置不透明度为1 */
  transform: none !important; /* 不应用变换 */
  pointer-events: auto !important; /* 启用鼠标事件 */
}

.force-visible {
  opacity: 1 !important; /* 设置不透明度为1 */
  transform: none !important; /* 不应用变换 */
  pointer-events: auto !important; /* 启用鼠标事件 */
  visibility: visible !important; /* 设置可见性为可见 */
}

.custom-button {
  padding: 14px 28px !important; /* 设置内边距，上下14像素，左右28像素 */
  display: flex !important; /* 使用弹性布局 */
  align-items: center !important; /* 垂直居中对齐 */
  justify-content: center !important; /* 水平居中对齐 */
  gap: 10px !important; /* 设置元素间距为10像素 */
  font-size: 1.1rem !important; /* 设置字体大小为1.1倍根元素字体大小 */
  border-radius: 8px !important; /* 设置边框圆角为8像素 */
  font-weight: 600 !important; /* 设置字体粗细为600 */
  cursor: pointer !important; /* 鼠标悬停时显示指针 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; /* 添加所有属性的过渡效果 */
  position: relative !important; /* 设置相对定位 */
  overflow: hidden !important; /* 隐藏溢出内容 */
  min-width: 180px !important; /* 设置最小宽度为180像素 */
  border: none !important; /* 移除边框 */
  color: white !important; /* 设置文字颜色为白色 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important; /* 添加阴影效果 */
}

.custom-button:hover {
  transform: translateY(-5px) !important; /* 鼠标悬停时向上移动5像素 */
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15) !important; /* 增强阴影效果 */
}

.primary-button {
  background: linear-gradient(135deg, #409EFF, #337ecc) !important; /* 设置渐变背景 */
}

.success-button {
  background: linear-gradient(135deg, #42b983, #2f9768) !important; /* 设置渐变背景 */
}

.custom-button::before {
  content: '' !important; /* 为伪元素添加内容 */
  position: absolute !important; /* 设置绝对定位 */
  top: 0 !important; /* 顶部对齐 */
  left: 0 !important; /* 左侧对齐 */
  width: 100% !important; /* 宽度占满父元素 */
  height: 100% !important; /* 高度占满父元素 */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%) !important; /* 设置渐变背景，创建光效 */
  transform: translateX(-100%) !important; /* 初始位置在元素左侧外部 */
  transition: transform 0.6s ease !important; /* 添加变换的过渡效果，持续0.6秒 */
}

.custom-button:hover::before {
  transform: translateX(100%) !important; /* 鼠标悬停时，伪元素移动到右侧外部，形成扫光效果 */
}

.custom-button .el-icon {
  font-size: 1.2rem !important; /* 设置字体大小为1.2倍根元素字体大小 */
}

.timeline-item {
  padding-left: 50px; /* 设置左内边距为50像素 */
  position: relative; /* 设置相对定位 */
  margin-bottom: 20px; /* 设置下边距为20像素 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.timeline-marker {
  position: absolute; /* 设置绝对定位 */
  left: 15px; /* 左侧位置偏移15像素 */
  top: 8px; /* 顶部位置偏移8像素 */
  width: 12px; /* 设置宽度为12像素 */
  height: 12px; /* 设置高度为12像素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  background: #fff; /* 设置背景颜色为白色 */
  border: 2px solid #42b983; /* 添加2像素宽的绿色边框 */
  z-index: 1; /* 设置层级为1，确保在时间线前景中 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.timeline-marker.active {
  background: #42b983; /* 设置激活状态背景颜色为绿色 */
  transform: scale(1.2); /* 放大1.2倍 */
  box-shadow: 0 0 10px rgba(66, 185, 131, 0.5); /* 添加阴影效果 */
}

.timeline-content {
  background: white; /* 设置背景颜色为白色 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
  padding: 20px; /* 设置内边距为20像素 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05); /* 添加阴影效果 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果，持续0.3秒 */
}

.timeline-item:hover .timeline-content {
  box-shadow: 0 8px 25px rgba(66, 185, 131, 0.15); /* 鼠标悬停时增强阴影效果 */
  transform: translateY(-5px); /* 向上移动5像素 */
}

.timeline-item:hover .timeline-marker {
  transform: scale(1.3); /* 放大1.3倍 */
  border-color: #287057; /* 改变边框颜色为深绿色 */
}

/* 团队成员卡片 */
.team-grid {
  display: grid; /* 使用网格布局 */
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* 设置网格列，自动填充，最小宽度220像素，最大1等份 */
  grid-gap: 30px; /* 设置网格间距为30像素 */
}

.team-member {
  background: white; /* 设置背景颜色为白色 */
  border-radius: 16px; /* 设置边框圆角为16像素 */
  overflow: hidden; /* 隐藏溢出内容 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05); /* 添加阴影效果 */
  text-align: center; /* 文字居中对齐 */
  padding-bottom: 20px; /* 设置下内边距为20像素 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加所有属性的过渡效果 */
  position: relative; /* 设置相对定位 */
}

.team-member:hover {
  transform: translateY(-10px); /* 鼠标悬停时向上移动10像素 */
  box-shadow: 0 15px 30px rgba(66, 185, 131, 0.2); /* 增强阴影效果 */
}

.member-avatar {
  width: 100%; /* 宽度占满父元素 */
  height: 220px; /* 设置高度为220像素 */
  background-size: cover; /* 背景图片覆盖整个区域 */
  background-position: center; /* 背景图片居中 */
  position: relative; /* 设置相对定位 */
  margin-bottom: 15px; /* 设置下边距为15像素 */
}

.member-overlay {
  position: absolute; /* 设置绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满父元素 */
  height: 100%; /* 高度占满父元素 */
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%); /* 设置从上到下的渐变背景 */
  opacity: 0.5; /* 设置不透明度为0.5 */
  transition: opacity 0.3s ease; /* 添加不透明度变化的过渡效果，持续0.3秒 */
}

.team-member:hover .member-overlay {
  opacity: 0.2; /* 鼠标悬停时，降低不透明度为0.2，使图像更清晰 */
}

.team-member h3 {
  font-size: 1.2rem; /* 设置字体大小为1.2倍根元素字体大小 */
  margin: 8px 0 5px; /* 设置上边距为8像素，下边距为5像素 */
  color: #303133; /* 设置文字颜色为深灰色 */
  transition: color 0.3s ease; /* 添加颜色变化的过渡效果，持续0.3秒 */
}

.team-member:hover h3 {
  color: #42b983; /* 鼠标悬停时，文字颜色变为绿色 */
}

.member-title {
  font-size: 0.95rem; /* 设置字体大小为0.95倍根元素字体大小 */
  color: #909399; /* 设置文字颜色为灰色 */
  margin: 0; /* 移除默认边距 */
}
</style>