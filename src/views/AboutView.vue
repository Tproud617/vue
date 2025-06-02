<template>
  <div class="about-view">
    <!-- Animated Background -->
    <div class="animated-bg"></div>
    
    <!-- Header -->
    <header class="page-header">
      <h1 class="header-title">关于我们</h1>
      <div class="header-decoration"></div>
    </header>
    
    <div class="content-container">
      <!-- Main content -->
      <section class="about-section main-info">
        <div class="section-header">
          <div class="icon-container">
            <el-icon :size="52" color="#42b983"><InfoFilled /></el-icon>
          </div>
          <h2>手机推荐系统</h2>
        </div>
        
        <p class="tagline">帮助您找到最适合自己的智能手机</p>
        
        <div class="info-card">
          <div class="card-content">
            <h3>我们的使命</h3>
            <p>在如今琳琅满目的手机市场中，我们致力于通过智能分析和用户体验设计，帮助用户轻松找到最适合自己需求的智能手机产品。无论您注重拍照、性能、续航还是性价比，我们都能为您提供个性化的推荐方案。</p>
          </div>
        </div>
      </section>
      
      <!-- Features -->
      <section class="about-section features">
        <h2 class="section-title">核心功能</h2>
        
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
      
      <!-- Data & Tech -->
      <section class="about-section data-tech">
        <div class="two-columns">
          <div class="column">
            <h2 class="section-title">数据来源</h2>
            <div class="info-card">
              <div class="card-content">
                <p>我们的数据来源于以下渠道：</p>
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
          
          <div class="column">
            <h2 class="section-title">推荐算法</h2>
            <div class="info-card">
              <div class="card-content">
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
      
      <!-- Timeline -->
      <section class="about-section timeline">
        <h2 class="section-title">发展历程</h2>
        
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
      
      <!-- Team -->
      <section class="about-section team">
        <h2 class="section-title">我们的团队</h2>
        
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
      
      <!-- Contact -->
      <section class="about-section contact">
        <h2 class="section-title">联系我们</h2>
        
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
      
      <!-- Actions -->
      <div class="actions-container">
        <el-button type="primary" size="large" @click="goHome" class="action-button">
          <el-icon><HomeFilled /></el-icon>
          返回首页
        </el-button>
        <el-button type="success" size="large" @click="goRecommend" class="action-button">
          <el-icon><Search /></el-icon>
          开始推荐
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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

const goHome = () => {
  router.push('/')
}

const goRecommend = () => {
  router.push('/recommend')
}

// Features data
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

// Timeline data
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

// Team members data
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
</script>

<style scoped>
.about-view {
  min-height: 100vh;
  background-color: #f5f7fa;
  position: relative;
  overflow-x: hidden;
}

/* Animated background */
.animated-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(245, 247, 250, 0.97) 0%, rgba(195, 207, 226, 0.97) 100%);
  z-index: -1;
}

.animated-bg::before,
.animated-bg::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  opacity: 0.4;
  filter: blur(80px);
  animation: float 15s infinite alternate ease-in-out;
}

.animated-bg::before {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.5) 0%, rgba(66, 185, 131, 0) 70%);
  top: 10%;
  left: 15%;
  animation-delay: -5s;
}

.animated-bg::after {
  background: radial-gradient(circle, rgba(64, 158, 255, 0.5) 0%, rgba(64, 158, 255, 0) 70%);
  bottom: 10%;
  right: 15%;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-50px, 50px);
  }
  100% {
    transform: translate(50px, -50px);
  }
}

/* Header */
.page-header {
  text-align: center;
  padding: 40px 0 20px;
  position: relative;
  margin-bottom: 40px;
}

.header-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(to right, #42b983, #2f9768, #42b983);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: 1px;
  animation: shimmer 2.5s infinite;
  background-size: 200% 100%;
}

.header-decoration {
  width: 120px;
  height: 4px;
  background: linear-gradient(to right, transparent, #42b983, transparent);
  margin: 15px auto 0;
  border-radius: 2px;
}

@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

/* Content Container */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
}

/* Sections */
.about-section {
  margin-bottom: 60px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.about-section:nth-child(2) { animation-delay: 0.2s; }
.about-section:nth-child(3) { animation-delay: 0.4s; }
.about-section:nth-child(4) { animation-delay: 0.6s; }
.about-section:nth-child(5) { animation-delay: 0.8s; }
.about-section:nth-child(6) { animation-delay: 1s; }

.section-title {
  font-size: 2rem;
  color: #303133;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: #42b983;
  margin: 15px auto 0;
  border-radius: 2px;
}

/* Main Info */
.main-info {
  text-align: center;
}

.section-header {
  margin-bottom: 20px;
}

.section-header h2 {
  font-size: 2.5rem;
  color: #303133;
  margin: 15px 0;
}

.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 15px 35px rgba(66, 185, 131, 0.2);
  margin-bottom: 20px;
  position: relative;
  animation: pulse 3s infinite;
}

.icon-container::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid rgba(66, 185, 131, 0.3);
  animation: ripple 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(66, 185, 131, 0.4);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(66, 185, 131, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(66, 185, 131, 0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.tagline {
  font-size: 1.5rem;
  color: #606266;
  margin-bottom: 30px;
  font-weight: 300;
}

/* Cards */
.info-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(66, 185, 131, 0.15);
}

.card-content {
  padding: 25px;
}

.main-info .card-content h3 {
  font-size: 1.4rem;
  color: #42b983;
  margin-bottom: 15px;
}

.main-info .card-content p {
  color: #606266;
  line-height: 1.8;
  font-size: 1.05rem;
}

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 25px;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.feature-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
}

.feature-card h3 {
  font-size: 1.25rem;
  color: #303133;
  margin: 0 0 15px;
}

.feature-card p {
  color: #606266;
  line-height: 1.6;
  flex-grow: 1;
}

/* Data & Tech */
.data-tech .two-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 30px;
}

.data-sources {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.data-sources li {
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 1.05rem;
  color: #606266;
}

.bullet {
  width: 10px;
  height: 10px;
  background: #42b983;
  border-radius: 50%;
  margin-right: 15px;
  flex-shrink: 0;
}

.update-info {
  font-style: italic;
  color: #909399;
  margin-top: 15px;
  font-size: 0.9rem;
}

/* Algorithm Process */
.algorithm-process {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.process-step {
  display: flex;
  align-items: center;
  padding: 12px 0;
}

.step-number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #42b983, #2f9768);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 15px;
  flex-shrink: 0;
}

.step-info {
  color: #303133;
  font-weight: 500;
  font-size: 1.1rem;
}

.process-connector {
  width: 2px;
  height: 20px;
  background: #42b983;
  margin-left: 18px;
}

/* Timeline */
.timeline-container {
  position: relative;
  padding: 20px 0;
}

.timeline-container::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 20px;
  width: 2px;
  background: #dcdfe6;
}

.timeline-item {
  position: relative;
  padding-left: 50px;
  margin-bottom: 35px;
}

.timeline-marker {
  position: absolute;
  top: 0;
  left: 13px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid #dcdfe6;
  z-index: 1;
}

.timeline-marker.active {
  background: #42b983;
  border-color: #42b983;
  box-shadow: 0 0 0 4px rgba(66, 185, 131, 0.2);
}

.timeline-content {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.timeline-item:hover .timeline-content {
  transform: translateX(5px);
}

.timeline-date {
  display: inline-block;
  padding: 4px 10px;
  background: #f0f9eb;
  color: #67c23a;
  border-radius: 12px;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.timeline-title {
  font-size: 1.2rem;
  margin: 0 0 10px;
  color: #303133;
}

.timeline-description {
  color: #606266;
  margin: 0;
  line-height: 1.5;
}

/* Team */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 25px;
}

.team-member {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.team-member:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
}

.member-avatar {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.member-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%);
}

.team-member h3 {
  font-size: 1.2rem;
  margin: 15px 0 5px;
  color: #303133;
}

.member-title {
  color: #909399;
  font-size: 0.9rem;
  margin: 0 0 15px;
}

/* Contact */
.contact-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 30px;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 20px;
  margin-bottom: 30px;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 15px;
}

.contact-method .el-icon {
  color: #42b983;
  flex-shrink: 0;
}

.contact-method p {
  margin: 0;
  color: #606266;
}

.contact-method a {
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-method a:hover {
  color: #337ecc;
}

/* Actions */
.actions-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
}

.action-button {
  padding: 12px 25px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  transition: all 0.3s;
}

.action-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Responsive */
@media (max-width: 768px) {
  .page-header {
    padding: 30px 0;
  }
  
  .header-title {
    font-size: 2.2rem;
  }
  
  .section-title {
    font-size: 1.7rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .tagline {
    font-size: 1.2rem;
  }
  
  .content-container {
    padding: 0 15px 40px;
  }
  
  .about-section {
    margin-bottom: 40px;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .timeline-item {
    padding-left: 40px;
  }
  
  .contact-methods {
    grid-template-columns: 1fr;
  }
  
  .actions-container {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  
  .action-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .features-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .icon-container {
    width: 80px;
    height: 80px;
  }
  
  .main-info .card-content p {
    font-size: 1rem;
  }
  
  .timeline-content {
    padding: 15px;
  }
  
  .timeline-title {
    font-size: 1.1rem;
  }
}
</style>