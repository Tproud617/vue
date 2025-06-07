<!-- 对比页面组件 - 用于比较多台手机的详细参数 -->
<template>
  <div class="compare-view">
    <!-- 背景渐变效果 -->
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
    <div class="bg-gradient-3"></div>
    
    <el-container>
      <!-- 顶部标题栏 -->
      <el-header>
        <h1 class="header-title">
          <el-icon class="header-icon"><data-analysis /></el-icon>
          手机参数对比
        </h1>
        <div class="header-actions">
          <el-button 
            type="danger" 
            @click="clearCompareList" 
            :disabled="comparePhones.length === 0"
            class="clear-btn"
          >
            <el-icon><delete /></el-icon>
            清空对比列表
          </el-button>
        </div>
      </el-header>
      
      <el-main>
        <!-- 空状态展示 - 当对比列表为空时显示 -->
        <div 
          v-if="comparePhones.length === 0" 
          class="empty-container"
        >
          <div class="empty-illustration">
            <div class="empty-icon">
              <el-icon><data-analysis /></el-icon>
            </div>
            <div class="empty-phones">
              <div class="empty-phone phone1"></div>
              <div class="empty-phone phone2"></div>
              <div class="empty-phone phone3"></div>
              <div class="empty-phone phone4"></div>
            </div>
          </div>
          <h2 class="empty-title">对比列表为空</h2>
          <p class="empty-description">添加手机到对比列表，可以更直观地比较它们的参数差异</p>
          <el-button type="primary" @click="goToRecommend" size="large" class="add-phone-btn">
            <el-icon><plus /></el-icon>
            去添加手机
          </el-button>
        </div>
        
        <!-- 对比内容 - 当有手机可对比时显示 -->
        <transition name="fade-scale" v-else>
          <div class="compare-container">
          <!-- 对比头部信息 -->
          <div class="compare-header">
            <h2 class="compare-title">已添加 {{ comparePhones.length }} 台手机</h2>
            <el-tag type="info" effect="dark" class="compare-tag">
              最多可添加4台手机进行对比
            </el-tag>
          </div>
          
            <!-- 手机卡片列表 - 使用过渡动画 -->
            <transition-group name="phone-list" tag="div" class="phone-cards">
            <div 
              v-for="(phone, index) in comparePhones" 
              :key="phone.id"
              class="phone-card"
            >
              <!-- 手机图片展示区 -->
              <div class="phone-image-wrapper">
                <img :src="phone.image" :alt="phone.name" class="phone-image">
                  <div class="phone-model-shadow"></div>
                <!-- 移除按钮浮层 -->
                <div class="remove-overlay">
                  <el-button 
                    type="danger" 
                    circle 
                    @click="removePhone(phone.id)"
                    class="remove-btn"
                    title="移除此手机"
                  >
                    <el-icon><close /></el-icon>
                  </el-button>
                </div>
              </div>
              <h3 class="phone-name">{{ phone.name }}</h3>
              <div class="phone-price">¥{{ phone.price.toLocaleString() }}</div>
                <div class="phone-badge">
                  <el-tag size="small" type="success">{{ phone.brand }}</el-tag>
                </div>
            </div>
            
              <!-- 添加更多手机的卡片 -->
              <div v-if="comparePhones.length < 4" :key="'add'" class="add-more-card" @click="goToRecommend">
              <div class="add-icon-container">
                <el-icon class="add-icon"><plus /></el-icon>
              </div>
              <div class="add-text">添加更多手机</div>
            </div>
            </transition-group>
          
            <!-- 参数对比表格 -->
            <div class="compare-table-container">
          <el-table 
            :data="tableData" 
            border 
            style="width: 100%"
            class="compare-table"
            stripe
            highlight-current-row
            :header-cell-style="{background:'#f9fbff', color: '#409EFF'}"
          >
            <!-- 参数名称列 - 固定在左侧 -->
            <el-table-column 
              prop="property" 
              label="参数项" 
              width="180" 
              fixed="left"
              header-align="center"
              align="center"
              class-name="property-column"
            />
            <!-- 动态生成每台手机的参数列 -->
            <el-table-column 
              v-for="(phone, index) in comparePhones" 
              :key="phone.id"
              :label="phone.name"
              :prop="'phone' + index"
              header-align="center"
              align="center"
              class-name="value-column"
            >
              <template #header>
                <div class="table-phone-header">
                  <div class="table-phone-name">{{ phone.name }}</div>
                  <el-tag size="small" type="success" class="table-phone-brand">{{ phone.brand }}</el-tag>
                </div>
              </template>
              
              <template #default="scope">
                <div 
                  class="cell-value"
                  :class="{'highlight': isHighlightedValue(scope.row, index)}"
                >
                  {{ scope.row['phone' + index] }}
                </div>
              </template>
            </el-table-column>
          </el-table>
            </div>
          
          <!-- 页面底部操作区 -->
          <div class="compare-actions">
            <el-button @click="goToRecommend" type="primary" class="action-btn">
              <el-icon><back /></el-icon>
              返回推荐页
            </el-button>
          </div>
        </div>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { ElMessageBox, ElMessage } from 'element-plus'
import { Delete, Plus, Close, DataAnalysis, Back } from '@element-plus/icons-vue'

const router = useRouter()
const phoneStore = usePhoneStore()

// 获取对比列表中的手机数据
const comparePhones = computed(() => phoneStore.comparePhones)

// 生成表格数据 - 将手机参数处理成可比较的格式
const tableData = computed(() => {
  const properties = [
    { property: '品牌', key: 'brand', highlight: true },
    { property: '价格', key: 'price', format: (val) => `¥${val.toLocaleString()}`, highlight: true },
    { property: '屏幕尺寸', key: 'screen', format: (val) => `${val}英寸`, highlight: true },
    { property: '存储容量', key: 'storage', format: (val) => `${val}GB`, highlight: true },
    { property: '相机评分', key: 'camera', format: (val) => `${val}星`, highlight: true },
    { property: '性能评分', key: 'performance', format: (val) => `${val}星`, highlight: true },
    { property: '电池评分', key: 'battery', format: (val) => `${val}星`, highlight: true },
    { property: '特性', key: 'features', format: (val) => val.join(', '), highlight: false }
  ]
  
  return properties.map(prop => {
    const row = { 
      property: prop.property,
      key: prop.key,
      highlight: prop.highlight
    }
    
    comparePhones.value.forEach((phone, index) => {
      const value = phone[prop.key]
      row['phone' + index] = prop.format ? prop.format(value) : value
      row['raw' + index] = value // 保存原始值用于比较
    })
    
    return row
  })
})

// 判断某个值是否应该高亮显示（是同行中的最佳值）
const isHighlightedValue = (row, index) => {
  // 如果这个属性不需要高亮，直接返回false
  if (!row.highlight) return false
  
  // 如果只有一台手机，不需要高亮
  if (comparePhones.value.length <= 1) return false
  
  // 根据属性类型判断最佳值
  const key = row.key
  const rawValue = row['raw' + index]
  
  // 对于这些属性，值越大越好
  const betterIfHigher = ['screen', 'storage', 'camera', 'performance', 'battery']
  
  // 对于价格，值越低越好
  const betterIfLower = ['price']
  
  // 检查是否是最佳值
  let isBest = true
  
  for (let i = 0; i < comparePhones.value.length; i++) {
    if (i === index) continue // 跳过自己
    
    const otherValue = row['raw' + i]
    
    if (betterIfHigher.includes(key) && otherValue > rawValue) {
      isBest = false
      break
    }
    
    if (betterIfLower.includes(key) && otherValue < rawValue) {
      isBest = false
      break
    }
  }
  
  return isBest
}

// 移除手机 - 从对比列表中删除手机
const removePhone = (phoneId) => {
  ElMessageBox.confirm('确定要从对比列表中移除这台手机吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    phoneStore.removeFromCompare(phoneId)
    ElMessage.success('已从对比列表中移除')
  }).catch(() => {
    // 用户取消操作
  })
}

// 清空对比列表 - 移除所有对比中的手机
const clearCompareList = async () => {
  try {
    await ElMessageBox.confirm('确定要清空对比列表吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    phoneStore.clearCompareList()
    ElMessage.success('对比列表已清空')
  } catch {
    // 用户取消操作
  }
}

// 跳转到推荐页面 - 用于添加更多手机或返回
const goToRecommend = () => {
  router.push('/recommend')
}
</script>

<style scoped>
.compare-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
  padding-bottom: 40px;
}

.bg-gradient-1,
.bg-gradient-2,
.bg-gradient-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.6;
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 70vw;
  height: 70vw;
  top: -20vw;
  right: -20vw;
  animation: float-1 20s ease-in-out infinite alternate;
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 80vw;
  height: 80vw;
  bottom: -30vw;
  left: -20vw;
  animation: float-2 25s ease-in-out infinite alternate;
}

.bg-gradient-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  z-index: 0;
  opacity: 0.6;
  background: radial-gradient(circle, rgba(66, 185, 131, 0.2) 0%, rgba(255, 255, 255, 0) 70%);
  width: 90vw;
  height: 90vw;
  top: -40vw;
  left: -40vw;
  animation: float-3 30s ease-in-out infinite alternate;
}

@keyframes float-1 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-8vw, 8vw);
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(8vw, -8vw);
  }
}

@keyframes float-3 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-10vw, 10vw);
  }
}

.el-container {
  position: relative;
  z-index: 1;
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px !important;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0 25px;
}

.header-title {
  font-size: 2rem;
  background: linear-gradient(to right, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 12px;
  filter: drop-shadow(0 2px 3px rgba(66, 185, 131, 0.2));
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.header-title:hover {
  transform: scale(1.02);
  filter: drop-shadow(0 3px 5px rgba(66, 185, 131, 0.3));
}

.header-icon {
  font-size: 28px;
  color: #42b983;
  animation: pulse-icon 2s infinite;
  transform-origin: center;
}

@keyframes pulse-icon {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.clear-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.clear-btn:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.3);
}

.clear-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.clear-btn:hover:not(:disabled)::before {
  transform: translateX(100%);
}

.el-main {
  padding: 30px;
}

.empty-container {
  margin-top: 40px;
  animation: fade-in 1s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  margin: 60px auto;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-illustration {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.empty-icon {
  font-size: 64px;
  color: #42b983;
  margin-bottom: 30px;
  animation: pulse-icon-empty 2s ease-in-out infinite;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f8f9fa, #ffffff);
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(66, 185, 131, 0.2);
}

@keyframes pulse-icon-empty {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

.empty-phones {
  display: flex;
  gap: 15px;
  margin: 20px 0;
  position: relative;
}

.empty-phone {
  width: 15px;
  height: 40px;
  background: linear-gradient(to bottom, #42b983, #2f9768);
  border-radius: 4px;
  position: relative;
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.phone1 {
  height: 35px;
  animation-name: float-phone-compare;
  animation-delay: 0s;
}

.phone2 {
  height: 50px;
  animation-name: float-phone-compare;
  animation-delay: 0.3s;
}

.phone3 {
  height: 40px;
  animation-name: float-phone-compare;
  animation-delay: 0.6s;
}

.phone4 {
  height: 45px;
  animation-name: float-phone-compare;
  animation-delay: 0.9s;
}

@keyframes float-phone-compare {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.empty-title {
  color: #303133;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(to right, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 2px rgba(66, 185, 131, 0.1));
}

.empty-description {
  color: #606266;
  font-size: 16px;
  margin: 15px 0 30px;
  max-width: 320px;
  line-height: 1.6;
}

.add-phone-btn {
  padding: 14px 28px !important;
  font-size: 16px !important;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  border-radius: 10px !important;
  background: linear-gradient(135deg, #42b983, #2f9768) !important;
  border: none !important;
  position: relative !important;
  overflow: hidden !important;
  box-shadow: 0 8px 15px rgba(66, 185, 131, 0.3) !important;
}

.add-phone-btn:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 15px 25px rgba(66, 185, 131, 0.4) !important;
}

.add-phone-btn::before {
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

.add-phone-btn:hover::before {
  transform: translateX(100%);
}

.compare-container {
  background: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(15px);
  animation: slide-up 0.8s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0 0 30px 0;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.compare-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background: linear-gradient(to right, rgba(66, 185, 131, 0.05), rgba(255, 255, 255, 0));
}

.compare-title {
  margin: 0;
  color: #303133;
  font-size: 20px;
  font-weight: 700;
  position: relative;
  display: inline-block;
}

.compare-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(to right, #42b983, #2f9768);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.compare-title:hover::after {
  width: 100%;
}

.compare-tag {
  font-size: 13px;
  border-radius: 6px;
  padding: 6px 10px;
  background: linear-gradient(135deg, #42b983, #2f9768);
  color: white;
  font-weight: 500;
  box-shadow: 0 3px 10px rgba(66, 185, 131, 0.2);
  border: none;
}

.phone-cards {
  display: flex;
  gap: 20px;
  padding: 30px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: #c0c4cc #f0f2f5;
}

.phone-cards::-webkit-scrollbar {
  height: 6px;
}

.phone-cards::-webkit-scrollbar-track {
  background: #f0f2f5;
  border-radius: 3px;
}

.phone-cards::-webkit-scrollbar-thumb {
  background-color: #c0c4cc;
  border-radius: 3px;
}

.phone-card {
  min-width: 200px;
  background: white;
  border-radius: 16px;
  padding: 18px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  scroll-snap-align: start;
  transform: translateZ(0);
}

.phone-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.phone-image-wrapper {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
  background: linear-gradient(145deg, #f0f2f5, #ffffff);
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
}

.phone-image {
  height: 160px;
  object-fit: contain;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1));
  transform: translateZ(0);
  z-index: 2;
}

.phone-card:hover .phone-image {
  transform: scale(1.12) translateY(-8px);
  filter: drop-shadow(0 15px 20px rgba(0, 0, 0, 0.2));
}

.remove-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.phone-card:hover .remove-overlay {
  opacity: 1;
}

.remove-btn {
  transform: scale(0.8);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.remove-btn:hover {
  transform: scale(1);
}

.phone-name {
  margin: 0 0 10px 0;
  font-size: 16px;
  color: #303133;
  text-align: center;
  font-weight: 600;
  height: 44px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  transition: color 0.3s ease;
}

.phone-card:hover .phone-name {
  color: #42b983;
}

.phone-price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.phone-badge {
  margin-top: 5px;
  margin-bottom: 10px;
}

.add-more-card {
  min-width: 200px;
  height: 273px; /* 匹配调整后的手机卡片高度 */
  border: 2px dashed #c0c4cc;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s ease;
  scroll-snap-align: start;
  background: rgba(255, 255, 255, 0.7);
}

.add-more-card:hover {
  border-color: #42b983;
  background: rgba(66, 185, 131, 0.05);
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(66, 185, 131, 0.1);
}

.add-icon-container {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.4s ease;
}

.add-more-card:hover .add-icon-container {
  background: #42b983;
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 15px rgba(66, 185, 131, 0.2);
}

.add-icon {
  font-size: 28px;
  color: #909399;
  transition: all 0.3s ease;
}

.add-more-card:hover .add-icon {
  color: white;
}

.add-text {
  color: #909399;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.add-more-card:hover .add-text {
  color: #42b983;
  font-weight: 600;
  transform: scale(1.05);
}

.compare-table-container {
  margin: 20px 30px;
  transition: all 0.5s ease;
  opacity: 1;
  transform: translateY(0);
  animation: slide-up 0.8s ease-out 0.2s both;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.compare-table {
  margin: 10px 30px 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.table-phone-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
}

.table-phone-name {
  font-weight: 600;
  color: #303133;
}

.table-phone-brand {
  font-size: 12px;
  border-radius: 4px;
  padding: 2px 8px;
}

.cell-value {
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 6px;
}

.highlight {
  background: rgba(66, 185, 131, 0.1);
  color: #42b983;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px rgba(66, 185, 131, 0.2);
}

.compare-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.action-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  padding: 14px 28px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(to right, #409EFF, #337ecc);
  color: white;
  border: none;
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.3);
}

.action-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(64, 158, 255, 0.4);
}

.action-btn::before {
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

.action-btn:hover::before {
  transform: translateX(100%);
}

.property-column {
  font-weight: 600;
}

.value-column {
  min-width: 180px;
}

@media (max-width: 992px) {
  .compare-container {
    padding: 0 0 20px 0;
  }
  
  .compare-header {
    padding: 15px 20px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .phone-cards {
    padding: 20px;
  }
  
  .compare-table {
    margin: 0 20px 20px;
  }
}

@media (max-width: 768px) {
  .el-main {
    padding: 20px 15px;
  }
  
  .el-header {
    padding: 0 15px;
    height: auto !important;
    min-height: 70px;
    flex-wrap: wrap;
  }
  
  .header-title {
    font-size: 1.5rem;
    margin: 10px 0;
  }
  
  .clear-btn {
    margin: 10px 0;
  }
  
  .phone-card, .add-more-card {
    min-width: 160px;
  }
  
  .phone-image {
    height: 120px;
  }
}

@media (max-width: 576px) {
  .el-main {
    padding: 15px 10px;
  }
  
  .phone-cards {
    padding: 15px;
    gap: 15px;
  }
  
  .phone-card, .add-more-card {
    min-width: 140px;
  }
  
  .phone-name {
    font-size: 14px;
  }
  
  .compare-table {
    margin: 0 15px 15px;
  }
}

/* 淡入缩放过渡效果 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 列表项动画 */
.phone-list-enter-active,
.phone-list-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.phone-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.phone-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.phone-list-move {
  transition: transform 0.5s;
}

/* 添加手机倒影效果 */
.phone-model-shadow {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 70%;
  height: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  transform: translateX(-50%) scaleX(0.8);
  filter: blur(4px);
  opacity: 0.7;
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.phone-card:hover .phone-model-shadow {
  width: 75%;
  opacity: 0.9;
  filter: blur(6px);
  transform: translateX(-50%) scaleX(0.9);
}
</style>