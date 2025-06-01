<template>
  <div class="home-view">
    <el-row :gutter="40" class="home-container">
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="8" class="phone-column">
        <div class="phone-wrapper">
          <div class="phone-model iphone-16-pro" @mousemove="handleMouseMove" @mouseleave="resetPhonePosition">
            <div class="dynamic-island">
              <div class="dynamic-island-content">
                <div class="island-pill"></div>
                <div class="island-camera"></div>
              </div>
            </div>
            <div class="screen">
              <div class="status-bar">
                <div class="time">{{ currentTime }}</div>
                <div class="indicators">
                  <span class="signal"></span>
                  <span class="wifi"></span>
                  <span class="battery"></span>
                </div>
              </div>
              <div class="app-grid">
                <div class="app app-photos" @click="animateApp">
                  <div class="app-icon-content photos-icon"></div>
                  <span class="app-label">照片</span>
                </div>
                <div class="app app-camera" @click="animateApp">
                  <div class="app-icon-content camera-icon"></div>
                  <span class="app-label">相机</span>
                </div>
                <div class="app app-calendar" @click="animateApp">
                  <div class="app-icon-content calendar-icon"></div>
                  <span class="app-label">日历</span>
                </div>
                <div class="app app-maps" @click="animateApp">
                  <div class="app-icon-content maps-icon"></div>
                  <span class="app-label">地图</span>
                </div>
                <div class="app app-messages" @click="animateApp">
                  <div class="app-icon-content messages-icon"></div>
                  <span class="app-label">信息</span>
                </div>
                <div class="app app-mail" @click="animateApp">
                  <div class="app-icon-content mail-icon"></div>
                  <span class="app-label">邮件</span>
                </div>
                <div class="app app-safari" @click="animateApp">
                  <div class="app-icon-content safari-icon"></div>
                  <span class="app-label">Safari</span>
                </div>
                <div class="app app-music" @click="animateApp">
                  <div class="app-icon-content music-icon"></div>
                  <span class="app-label">音乐</span>
                </div>
                <div class="app app-store" @click="animateApp">
                  <div class="app-icon-content appstore-icon"></div>
                  <span class="app-label">App Store</span>
                </div>
                <div class="app app-settings" @click="animateApp">
                  <div class="app-icon-content settings-icon"></div>
                  <span class="app-label">设置</span>
                </div>
                <div class="app app-notes" @click="animateApp">
                  <div class="app-icon-content notes-icon"></div>
                  <span class="app-label">备忘录</span>
                </div>
                <div class="app app-health" @click="animateApp">
                  <div class="app-icon-content health-icon"></div>
                  <span class="app-label">健康</span>
                </div>
              </div>
              <div class="dock">
                <div class="dock-app dock-phone" @click="animateApp">
                  <div class="app-icon-content phone-icon"></div>
                </div>
                <div class="dock-app dock-messages" @click="animateApp">
                  <div class="app-icon-content messages-icon"></div>
                </div>
                <div class="dock-app dock-safari" @click="animateApp">
                  <div class="app-icon-content safari-icon"></div>
                </div>
                <div class="dock-app dock-music" @click="animateApp">
                  <div class="app-icon-content music-icon"></div>
                </div>
              </div>
            </div>
            <div class="side-buttons">
              <div class="volume-up"></div>
              <div class="volume-down"></div>
              <div class="action-button"></div>
              <div class="power-button"></div>
            </div>
            <div class="phone-reflection"></div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="16" class="content-column">
        <div class="content">
          <el-card class="welcome-card" shadow="hover">
            <h1 class="title">手机推荐系统</h1>
            <p class="description">我们将根据您的需求和偏好，为您推荐最适合的手机</p>
            <div class="features">
              <div class="feature-item">
                <el-icon :size="36" color="#42b983"><Histogram /></el-icon>
                <h3>智能匹配</h3>
                <p>基于您的偏好自动匹配最适合的手机型号</p>
              </div>
              <div class="feature-item">
                <el-icon :size="36" color="#42b983"><DataAnalysis /></el-icon>
                <h3>详细对比</h3>
                <p>多维度参数对比，助您做出明智选择</p>
              </div>
              <div class="feature-item">
                <el-icon :size="36" color="#42b983"><Refresh /></el-icon>
                <h3>实时更新</h3>
                <p>手机数据库定期更新，确保信息准确性</p>
              </div>
            </div>
            <el-button type="primary" size="large" class="start-btn" @click="$router.push('/recommend')">
              开始推荐
              <el-icon class="el-icon--right"><arrow-right /></el-icon>
            </el-button>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Histogram, DataAnalysis, Refresh } from '@element-plus/icons-vue'

// 当前时间
const currentTime = ref('12:30')
let timeInterval = null

// 更新时间
const updateTime = () => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  currentTime.value = `${hours}:${minutes}`
}

// 3D手机位置效果
const handleMouseMove = (e) => {
  const phoneEl = e.currentTarget
  const rect = phoneEl.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  // 计算旋转角度
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateY = ((x - centerX) / centerX) * 5
  const rotateX = ((centerY - y) / centerY) * 5
  
  // 应用旋转
  phoneEl.style.transform = `perspective(2000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
}

const resetPhonePosition = (e) => {
  e.currentTarget.style.transform = 'perspective(2000px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)'
}

// 应用图标动画
const animateApp = (e) => {
  const app = e.currentTarget
  app.classList.add('app-pressed')
  setTimeout(() => {
    app.classList.remove('app-pressed')
  }, 300)
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 60000) // 每分钟更新一次时间
})

onUnmounted(() => {
  if (timeInterval) clearInterval(timeInterval)
})
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.bg-gradient-1,
.bg-gradient-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: 0;
  opacity: 0.5;
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 50vw;
  height: 50vw;
  top: -10vw;
  right: -10vw;
  animation: float-1 15s ease-in-out infinite alternate;
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 60vw;
  height: 60vw;
  bottom: -20vw;
  left: -20vw;
  animation: float-2 20s ease-in-out infinite alternate;
}

@keyframes float-1 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-5vw, 5vw);
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(5vw, -5vw);
  }
}

.home-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.phone-column {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}

.phone-wrapper {
  perspective: 1500px;
  transform-style: preserve-3d;
  position: relative;
}

.phone-wrapper::before {
  content: '';
  position: absolute;
  width: 250px;
  height: 40px;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
  border-radius: 50%;
  z-index: -1;
  filter: blur(10px);
}

.content-column {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 100%;
  max-width: 600px;
  transition: all 0.5s ease;
}

.welcome-card {
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: none;
}

.welcome-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -1px;
}

.description {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.brand-filter {
  margin: 20px 0;
  text-align: left;
}

.brand-filter h3 {
  margin-bottom: 15px;
  color: #606266;
}

.brand-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.brand-tag {
  cursor: pointer;
  user-select: none;
  margin: 0;
  transition: all 0.3s ease;
}

.brand-tag:hover {
  transform: scale(1.05);
}

.phone-list {
  margin-top: 30px;
}

.phone-list h3 {
  margin-bottom: 20px;
  color: #606266;
  text-align: left;
}

.phone-card {
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.phone-card:hover {
  transform: translateY(-5px);
}

.phone-image {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
}

.phone-card h4 {
  margin: 10px 0;
  font-size: 16px;
  color: #303133;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.no-results {
  margin: 40px 0;
}

.features {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  gap: 20px;
}

.feature-item {
  flex: 1;
  min-width: 150px;
  padding: 20px 15px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-item h3 {
  font-size: 1.2rem;
  color: #333;
  margin: 12px 0 8px;
}

.feature-item p {
  font-size: 0.95rem;
  color: #666;
  margin: 0;
}

.start-btn {
  padding: 15px 40px;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border-radius: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 20px rgba(66, 185, 131, 0.3);
}

.start-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 25px rgba(66, 185, 131, 0.4);
}

.start-btn .el-icon {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.start-btn:hover .el-icon {
  transform: translateX(5px);
}

/* iPhone 16 Pro Max 模型样式 */
.phone-model {
  position: relative;
  width: 300px;
  height: 580px;
  background: linear-gradient(145deg, 
    #f0f0f0 0%, 
    #dadada 20%, 
    #c8c8c8 40%,
    #d5d5d5 60%, 
    #e8e8e8 80%,
    #f5f5f5 100%
  );
  border-radius: 50px;
  box-shadow:
    0 0 0 1px rgba(230, 230, 230, 0.4),
    0 35px 65px rgba(0, 0, 0, 0.3),
    0 20px 35px rgba(0, 0, 0, 0.2);
  z-index: 0;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: visible;
  cursor: pointer;
  animation: phone-float 3s ease-in-out infinite;
}

@keyframes phone-float {
  0%, 100% {
    transform: perspective(2000px) translateY(0) rotateX(1deg) rotateY(-3deg) scale(1);
    box-shadow:
      0 0 0 1px rgba(230, 230, 230, 0.4),
      0 35px 65px rgba(0, 0, 0, 0.3),
      0 20px 35px rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: perspective(2000px) translateY(-15px) rotateX(-1deg) rotateY(3deg) scale(1.02);
    box-shadow:
      0 0 0 1px rgba(230, 230, 230, 0.4),
      0 50px 80px rgba(0, 0, 0, 0.25),
      0 30px 45px rgba(0, 0, 0, 0.15);
  }
}

/* 银色边框 */
.iphone-16-pro {
  background: linear-gradient(145deg, 
    #e8e8e8 0%, 
    #d6d6d6 15%, 
    #c0c0c0 30%, 
    #b8b8b8 45%,
    #c5c5c5 60%, 
    #d8d8d8 75%,
    #e8e8e8 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.8);
  position: relative;
}

.iphone-16-pro::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.5) 15%,
    rgba(255, 255, 255, 0.2) 30%,
    rgba(255, 255, 255, 0.15) 45%,
    rgba(255, 255, 255, 0.2) 60%,
    rgba(255, 255, 255, 0.5) 75%,
    rgba(255, 255, 255, 0.95) 100%
  );
  border-radius: inherit;
  z-index: 2;
  pointer-events: none;
  opacity: 0.9;
  animation: metal-shine 4s linear infinite;
}

.iphone-16-pro::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
  background-size: 100px 100px;
  opacity: 0.07;
  mix-blend-mode: overlay;
  pointer-events: none;
}

@keyframes metal-shine {
  0%, 100% {
    opacity: 0.9;
    background-position: 0% 0%;
  }
  50% {
    opacity: 0.7;
    background-position: 100% 100%;
  }
}

.phone-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: inherit;
  pointer-events: none;
  z-index: 5;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  animation: reflection-pulse 4s ease-in-out infinite;
}

@keyframes reflection-pulse {
  0%, 100% {
    opacity: 0.8;
    background-position: 0% 0%;
  }
  50% {
    opacity: 0.6;
    background-position: 100% 100%;
  }
}

/* 侧边按钮 */
.side-buttons {
  position: absolute;
  right: -2px;
  top: 120px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 3;
}

.volume-up, .volume-down, .power-button {
  width: 3px;
  height: 30px;
  background: linear-gradient(to right, #777, #999);
  border-radius: 2px;
  box-shadow: 
    -1px 0 2px rgba(0, 0, 0, 0.5),
    inset 1px 0 1px rgba(255, 255, 255, 0.3);
}

.action-button {
  width: 3px;
  height: 35px;
  background: linear-gradient(to right, #777, #999);
  border-radius: 2px;
  margin-top: 40px;
  box-shadow: 
    -1px 0 2px rgba(0, 0, 0, 0.5),
    inset 1px 0 1px rgba(255, 255, 255, 0.3);
}

/* 添加更多硬件细节 */
.phone-model::after {
  content: '';
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: #333;
  border-radius: 3px;
  z-index: 10;
  box-shadow: 
    inset 0 0 0 1px rgba(255, 255, 255, 0.3),
    0 0 2px rgba(0, 0, 0, 0.5);
}

/* 添加麦克风和扬声器 */
.phone-model::before {
  content: '';
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: #333;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.5),
    0 0 2px rgba(0, 0, 0, 0.5);
}

/* 屏幕 */
.screen {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  background: linear-gradient(125deg, #2C5364, #203A43, #0F2027);
  border-radius: 42px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 
    inset 0 0 15px rgba(0, 0, 0, 0.7),
    inset 0 0 3px rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  padding: 0;
}

/* 添加玻璃质感 */
.screen::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 20%, rgba(94, 176, 255, 0.3) 0%, rgba(94, 176, 255, 0) 50%),
    radial-gradient(circle at 80% 40%, rgba(111, 123, 247, 0.3) 0%, rgba(111, 123, 247, 0) 60%),
    radial-gradient(circle at 60% 80%, rgba(61, 99, 236, 0.3) 0%, rgba(61, 99, 236, 0) 40%);
  opacity: 0.7;
  z-index: 0;
  animation: background-shift 15s ease-in-out infinite alternate;
}

/* 添加轻微的指纹和污渍效果 */
.screen::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
  z-index: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  opacity: 0.02;
  mix-blend-mode: overlay;
}

/* 锁屏效果 */
.app-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 100%);
  opacity: 0.4;
  z-index: -1;
  pointer-events: none;
}

/* 动态岛 */
.dynamic-island {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 34px;
  background: #000;
  border-radius: 20px;
  z-index: 10;
  box-shadow: 
    0 0 5px rgba(0, 0, 0, 0.8),
    inset 0 0 2px rgba(255, 255, 255, 0.1);
  overflow: hidden;
  animation: subtle-pulse 3s ease-in-out infinite;
}

.dynamic-island::after {
  content: '';
  position: absolute;
  top: -10%;
  left: -10%;
  right: -10%;
  bottom: -10%;
  background: radial-gradient(
    ellipse at 30% 40%,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 60%
  );
  opacity: 0.7;
  pointer-events: none;
}

@keyframes subtle-pulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(1.02);
  }
}

.dynamic-island-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.island-pill {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 5px;
  background: rgba(60, 60, 60, 0.9);
  border-radius: 3px;
  opacity: 0.5;
}

.island-camera {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 10px;
  height: 10px;
  background: #1a1a1a;
  border-radius: 50%;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.5),
    inset 0 0 2px rgba(255, 255, 255, 0.1),
    0 0 0 1px rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

.island-camera::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  background: #000;
  border-radius: 50%;
  box-shadow: 
    inset 0 0 2px rgba(0, 0, 0, 0.8),
    0 0 1px rgba(255, 255, 255, 0.1);
}

.island-camera::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, transparent 40%, rgba(0, 132, 255, 0.5) 100%);
  border-radius: 50%;
  animation: camera-glow 4s ease-in-out infinite;
}

@keyframes camera-glow {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.5;
  }
}

/* 修改状态栏背景 */
.status-bar {
  height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 38px 25px 0;
  color: white;
  font-size: 14px;
  position: relative;
  z-index: 1;
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.time {
  font-weight: 600;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
}

.indicators {
  display: flex;
  gap: 8px;
}

.signal {
  width: 18px;
  height: 12px;
  position: relative;
  overflow: hidden;
}

.signal::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  mask-image: linear-gradient(to right, 
    #000 0%, #000 70%, 
    #000 70%, #000 75%, transparent 75%,
    transparent 80%, #000 80%, #000 85%, transparent 85%);
  -webkit-mask-image: linear-gradient(to right, 
    #000 0%, #000 70%, 
    #000 70%, #000 75%, transparent 75%,
    transparent 80%, #000 80%, #000 85%, transparent 85%);
  animation: signal-pulse 2s ease-in-out infinite;
}

@keyframes signal-pulse {
  0%, 100% {
    opacity: 0.9;
  }
  50% {
    opacity: 0.7;
  }
}

.wifi {
  width: 16px;
  height: 12px;
  position: relative;
  overflow: hidden;
}

.wifi::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 2px;
  mask-image: radial-gradient(
    circle at bottom center,
    transparent 0%,
    transparent 40%,
    #000 40.1%,
    #000 60%,
    transparent 60.1%,
    transparent 70%,
    #000 70.1%,
    #000 80%,
    transparent 80.1%
  );
  -webkit-mask-image: radial-gradient(
    circle at bottom center,
    transparent 0%,
    transparent 40%,
    #000 40.1%,
    #000 60%,
    transparent 60.1%,
    transparent 70%,
    #000 70.1%,
    #000 80%,
    transparent 80.1%
  );
  transform: scale(1.5);
}

.battery {
  width: 22px;
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  position: relative;
  overflow: hidden;
}

.battery::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 2px;
  bottom: 2px;
  width: 60%;
  background: rgba(80, 220, 100, 0.9);
  border-radius: 1px;
  box-shadow: 0 0 5px rgba(80, 220, 100, 0.5);
  animation: battery-pulse 5s ease-in-out infinite;
}

@keyframes battery-pulse {
  0%, 100% {
    width: 60%;
    background: rgba(80, 220, 100, 0.9);
  }
  30% {
    width: 40%;
    background: rgba(255, 204, 0, 0.9);
  }
  60% {
    width: 75%;
    background: rgba(80, 220, 100, 0.9);
  }
}

.battery::after {
  content: '';
  position: absolute;
  right: -3px;
  top: 3px;
  bottom: 3px;
  width: 2px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0 1px 1px 0;
}

/* 应用网格 - 添加半透明叠加层 */
.app-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(3, 1fr);
  gap: 15px;
  padding: 25px 15px;
  position: relative;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  overflow: visible;
}

.app-grid::before {
  content: '';
  position: absolute;
  inset: 0;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.05);
  z-index: 0;
}

/* 应用图标优化 */
.app {
  border-radius: 25%;
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transform-style: preserve-3d;
  height: auto;
  aspect-ratio: 1/1;
  max-width: 100%;
  width: 100%;
  margin: 0;
}

.app::before {
    content: '';
    position: absolute;
  inset: 0;
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%);
  border-radius: inherit;
  z-index: 2;
}

.app:hover {
  transform: scale(1.15) translateY(-8px) translateZ(20px) rotateX(10deg);
  box-shadow: 
    0 18px 35px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.15);
  }

.app-pressed {
  transform: scale(0.9) !important;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) !important;
  transition: all 0.1s ease-in-out !important;
}

.app-icon-content {
  width: 65%;
  height: 65%;
  position: relative;
  z-index: 1;
  border-radius: 22%;
  margin-bottom: 4px;
  box-shadow: 
    0 3px 8px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.app-icon-content::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0) 70%);
  z-index: 2;
  border-radius: inherit;
}

.app-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;
  margin-top: 5px;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Dock应用图标样式 */
.dock {
  height: 85px;
  margin: 5px 16px 18px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.4),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 0 5px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  z-index: 2;
  box-sizing: border-box;
  padding: 0 10px;
  }

.dock::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(0, 0, 0, 0.05) 100%
  );
  border-radius: inherit;
  z-index: 0;
}

.dock::after {
  content: '';
  position: absolute;
  left: 15%;
  right: 15%;
  height: 4px;
  bottom: 12px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  filter: blur(1px);
}

.dock-app {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 8px 20px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  transform-style: preserve-3d;
  transform: translateZ(0);
}

.dock-app::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%);
  border-radius: inherit;
  z-index: 2;
}

.dock-app:hover {
  transform: scale(1.25) translateY(-12px) translateZ(30px) rotateX(10deg);
  box-shadow: 
    0 20px 35px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.2);
}

.dock-app:hover ~ .dock-app {
  transform: translateX(8px);
}

.dock-app:hover ~ .dock-app:hover {
  transform: scale(1.25) translateY(-12px) translateZ(30px) rotateX(10deg);
}

.dock-app .app-icon-content {
  width: 85%;
  height: 85%;
  border-radius: 22%;
}

/* 重新设计应用图标具体样式，添加更逼真的效果 */
.photos-icon {
  background: linear-gradient(145deg, #f45d5d, #e13a3a);
  position: relative;
  overflow: hidden;
}

.photos-icon::before {
  content: '';
  position: absolute;
  width: 80%;
  height: 80%;
  top: 10%;
  left: 10%;
  background: 
    radial-gradient(circle at 25% 25%, #ffeb3b 0%, #ffeb3b 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 75% 25%, #4caf50 0%, #4caf50 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 25% 75%, #03a9f4 0%, #03a9f4 12%, transparent 12.1%, transparent),
    radial-gradient(circle at 75% 75%, #9c27b0 0%, #9c27b0 12%, transparent 12.1%, transparent),
    linear-gradient(to bottom, transparent 0%, transparent 100%);
  border-radius: 20%;
}

.camera-icon {
  background: linear-gradient(145deg, #3d3d3d, #292929);
  position: relative;
  overflow: hidden;
}

.camera-icon::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  background: linear-gradient(145deg, #555, #444);
  border-radius: 50%;
  box-shadow: 
    inset 0 0 0 2px rgba(0, 0, 0, 0.4),
    inset 0 0 10px rgba(0, 0, 0, 0.6),
    0 0 0 3px rgba(30, 30, 30, 0.8);
}

.camera-icon::after {
  content: '';
  position: absolute;
  width: 20%;
  height: 20%;
  top: 12%;
  right: 12%;
  background: linear-gradient(145deg, #ffa726, #ff9800);
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(255, 152, 0, 0.6);
}

.calendar-icon {
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.calendar-icon::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 30%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #ff3b30, #e62d20);
  border-radius: 12px 12px 0 0;
}

.calendar-icon::after {
  content: '';
  position: absolute;
  width: 70%;
  height: 50%;
  bottom: 15%;
  left: 15%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  content: attr(data-date);
}

.maps-icon {
  background: linear-gradient(145deg, #f8f8f8, #ececec);
  position: relative;
  overflow: hidden;
}

.maps-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(120deg, 
      rgba(76, 217, 100, 0.6) 0%, 
      rgba(156, 204, 101, 0.6) 30%,
      rgba(255, 235, 59, 0.6) 50%,
      rgba(255, 193, 7, 0.6) 70%,
      rgba(255, 87, 34, 0.6) 100%);
  mask-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));
  -webkit-mask-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6));
}

.maps-icon::after {
  content: '';
  position: absolute;
  width: 35%;
  height: 35%;
  top: 32%;
  left: 32%;
  background: #4285f4;
  border-radius: 50%;
  box-shadow: 
    0 0 0 3px rgba(255, 255, 255, 0.7),
    0 0 10px rgba(66, 133, 244, 0.8);
}

.messages-icon {
  background: linear-gradient(145deg, #30d158, #2cc156);
  position: relative;
  overflow: hidden;
}

.messages-icon::before {
  content: '';
  position: absolute;
  width: 70%;
  height: 55%;
  top: 22%;
  left: 15%;
  background: white;
  border-radius: 20px;
  box-shadow: 
    inset 0 -3px 6px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.2);
}

.messages-icon::after {
  content: '';
  position: absolute;
  width: 30%;
  height: 30%;
  bottom: 18%;
  left: 20%;
  background: white;
  transform: rotate(45deg);
  border-radius: 2px;
  z-index: -1;
}

.mail-icon {
  background: linear-gradient(145deg, #1e88e5, #1976d2);
  position: relative;
  overflow: hidden;
}

.mail-icon::before {
  content: '';
  position: absolute;
  width: 80%;
  height: 50%;
  top: 25%;
  left: 10%;
  background: linear-gradient(to bottom, #fff 0%, #f8f8f8 100%);
  border-radius: 4px;
  transform: perspective(120px) rotateX(12deg);
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.mail-icon::after {
  content: '';
  position: absolute;
  width: 80%;
  height: 20%;
  top: 25%;
  left: 10%;
  background: linear-gradient(to bottom, #1565c0 0%, #0d47a1 100%);
  border-radius: 4px 4px 0 0;
  transform: perspective(120px) rotateX(12deg);
}

.safari-icon {
  background: linear-gradient(145deg, #ffffff, #f6f6f6);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.safari-icon::before {
  content: '';
  position: absolute;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  background: 
    radial-gradient(circle at center, white 0%, white 35%, transparent 35.1%),
    conic-gradient(
      from 45deg,
      #ff3b30 0%,
      #ff9500 12.5%,
      #ffcc00 25%,
      #4cd964 37.5%,
      #5ac8fa 50%,
      #007aff 62.5%,
      #5856d6 75%,
      #ff2d55 87.5%,
      #ff3b30 100%
    );
  border-radius: 50%;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.safari-icon::after {
  content: '';
  position: absolute;
  width: 44%;
  height: 44%;
  top: 28%;
  left: 28%;
  background: 
    radial-gradient(circle at center, #007aff 0%, #007aff 10%, transparent 10.1%),
    radial-gradient(circle at center, transparent 0%, transparent 40%, #007aff 40.1%, #007aff 70%, transparent 70.1%);
  border-radius: 50%;
  transform: rotate(45deg);
}

.music-icon {
  background: linear-gradient(145deg, #fc3c44, #ed2c3a);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.music-icon::before {
  content: '';
  position: absolute;
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  background: 
    radial-gradient(circle at 70% 30%, white 0%, white 30%, transparent 30.1%),
    linear-gradient(to bottom, white, white);
  border-radius: 0 0 50% 50%;
  box-shadow: 
    2px 2px 5px rgba(0, 0, 0, 0.2),
    -2px 0 3px rgba(0, 0, 0, 0.1);
}

.music-icon::after {
  content: '';
  position: absolute;
  width: 15%;
  height: 35%;
  top: 20%;
  right: 30%;
  background: white;
  border-radius: 2px;
  box-shadow: 
    2px 2px 3px rgba(0, 0, 0, 0.2);
}

.appstore-icon {
  background: linear-gradient(145deg, #0571ff, #0b62ed);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.appstore-icon::before {
  content: '';
  position: absolute;
  width: 66%;
  height: 66%;
  top: 17%;
  left: 17%;
  background: white;
  -webkit-mask: 
    linear-gradient(45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(-45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(90deg, black 0%, black 100%);
  mask: 
    linear-gradient(45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(-45deg, transparent 0%, transparent 40%, black 40.1%, black 60%, transparent 60.1%),
    linear-gradient(90deg, black 0%, black 100%);
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.settings-icon {
  background: linear-gradient(145deg, #ececec, #e0e0e0);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.settings-icon::before {
  content: '';
  position: absolute;
  width: 78%;
  height: 78%;
  top: 11%;
  left: 11%;
  background: linear-gradient(145deg, #8e8e93, #7a7a7f);
  -webkit-mask: 
    radial-gradient(circle at center, transparent 0%, transparent 25%, black 25.1%, black 37%, transparent 37.1%),
    repeating-conic-gradient(
      transparent 0deg,
      transparent 30deg,
      black 30.1deg,
      black 60deg
    );
  mask: 
    radial-gradient(circle at center, transparent 0%, transparent 25%, black 25.1%, black 37%, transparent 37.1%),
    repeating-conic-gradient(
      transparent 0deg,
      transparent 30deg,
      black 30.1deg,
      black 60deg
    );
  border-radius: 50%;
  box-shadow: 
    0 0 0 1px rgba(0, 0, 0, 0.1),
    0 2px 5px rgba(0, 0, 0, 0.15);
}

.notes-icon {
  background: linear-gradient(145deg, #fffef8, #f8f6e8);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.notes-icon::before {
  content: '';
  position: absolute;
  width: 85%;
  height: 80%;
  top: 10%;
  left: 7.5%;
  background: 
    linear-gradient(to bottom, 
      transparent 0%, 
      transparent 19%, 
      #d1d1d1 19.1%, 
      #d1d1d1 19.5%, 
      transparent 19.6%,
      transparent 39%, 
      #d1d1d1 39.1%, 
      #d1d1d1 39.5%, 
      transparent 39.6%,
      transparent 59%, 
      #d1d1d1 59.1%, 
      #d1d1d1 59.5%, 
      transparent 59.6%,
      transparent 79%, 
      #d1d1d1 79.1%, 
      #d1d1d1 79.5%, 
      transparent 79.6%
    );
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 1px 3px rgba(0, 0, 0, 0.1);
}

.notes-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 8%;
  top: 0;
  left: 0;
  background: linear-gradient(to bottom, #f8e283, #f5d151);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.health-icon {
  background: linear-gradient(145deg, #ff2d55, #ff3b50);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.health-icon::before {
  content: '';
  position: absolute;
  width: 68%;
  height: 68%;
  top: 16%;
  left: 16%;
  background: white;
  -webkit-mask: linear-gradient(
    to bottom,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
  mask: linear-gradient(
    to bottom,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.health-icon::after {
  content: '';
  position: absolute;
  width: 68%;
  height: 68%;
  top: 16%;
  left: 16%;
  background: white;
  -webkit-mask: linear-gradient(
    to right,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
  mask: linear-gradient(
    to right,
    black 0%,
    black 40%,
    transparent 40.1%,
    transparent 60%,
    black 60.1%,
    black 100%
  );
}

.phone-icon {
  background: linear-gradient(145deg, #35c759, #30b24d);
  position: relative;
  overflow: hidden;
  box-shadow: 
    inset 0 0 0 1px rgba(0, 0, 0, 0.05),
    0 2px 5px rgba(0, 0, 0, 0.1);
}

.phone-icon::before {
  content: '';
  position: absolute;
  width: 65%;
  height: 65%;
  top: 17.5%;
  left: 17.5%;
  background: white;
  border-radius: 12%;
  -webkit-mask: 
    radial-gradient(circle at center, black 0%, black 75%, transparent 75.1%);
  mask: 
    radial-gradient(circle at center, black 0%, black 75%, transparent 75.1%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* 响应式调整 */
@media (max-width: 992px) {
  .home-container {
    gap: 40px;
  }
  
  .phone-column {
    margin-bottom: 20px;
  }
  
  .features {
    flex-direction: column;
    align-items: center;
  }
  
  .feature-item {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 768px) {
  .phone-column {
    margin-bottom: 40px;
  }
  
  .title {
    font-size: 2.2rem;
  }
  
  .description {
    font-size: 1.1rem;
  }
  
  .phone-model {
    width: 260px;
    height: 520px;
  }
  
  .welcome-card {
    padding: 30px;
  }
}

@media (max-width: 480px) {
  .phone-model {
    width: 230px;
    height: 470px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .app-grid {
    gap: 8px;
    padding: 15px 10px;
  }
  
  .dock-app {
    width: 40px;
    height: 40px;
  }
  
  .welcome-card {
    padding: 20px;
  }

  .app-label {
    font-size: 8px;
  }

  .dynamic-island {
    width: 100px;
    height: 26px;
    border-radius: 16px;
}
  
  .status-bar {
    height: 28px;
    padding: 35px 20px 0;
    font-size: 12px;
  }
}
</style>