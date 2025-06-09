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
  min-height: 100vh; /* 设置最小高度为视口高度，确保页面至少充满整个屏幕 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); /* 设置135度角的渐变背景 */
  position: relative; /* 设置相对定位，作为子元素定位的参考点 */
  overflow: hidden; /* 隐藏溢出内容 */
  padding-bottom: 40px; /* 设置底部内边距为40像素 */
}

.bg-gradient-1,
.bg-gradient-2,
.bg-gradient-3 {
  position: absolute; /* 设置绝对定位 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  filter: blur(100px); /* 添加100像素的模糊效果 */
  z-index: 0; /* 设置层级为0 */
  opacity: 0.6; /* 设置不透明度为0.6 */
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 设置径向渐变背景 */
  width: 70vw; /* 设置宽度为视口宽度的70% */
  height: 70vw; /* 设置高度为视口宽度的70% */
  top: -20vw; /* 顶部位置偏移-20vw */
  right: -20vw; /* 右侧位置偏移-20vw */
  animation: float-1 20s ease-in-out infinite alternate; /* 应用float-1动画，持续20秒，无限循环，交替方向 */
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 设置径向渐变背景 */
  width: 80vw; /* 设置宽度为视口宽度的80% */
  height: 80vw; /* 设置高度为视口宽度的80% */
  bottom: -30vw; /* 底部位置偏移-30vw */
  left: -20vw; /* 左侧位置偏移-20vw */
  animation: float-2 25s ease-in-out infinite alternate; /* 应用float-2动画，持续25秒，无限循环，交替方向 */
}

.bg-gradient-3 {
  position: absolute; /* 设置绝对定位 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  filter: blur(100px); /* 添加100像素的模糊效果 */
  z-index: 0; /* 设置层级为0 */
  opacity: 0.6; /* 设置不透明度为0.6 */
  background: radial-gradient(circle, rgba(66, 185, 131, 0.2) 0%, rgba(255, 255, 255, 0) 70%); /* 设置径向渐变背景 */
  width: 90vw; /* 设置宽度为视口宽度的90% */
  height: 90vw; /* 设置高度为视口宽度的90% */
  top: -40vw; /* 顶部位置偏移-40vw */
  left: -40vw; /* 左侧位置偏移-40vw */
  animation: float-3 30s ease-in-out infinite alternate; /* 应用float-3动画，持续30秒，无限循环，交替方向 */
}

@keyframes float-1 {
  0% {
    transform: translate(0, 0); /* 动画开始时不位移 */
  }
  100% {
    transform: translate(-8vw, 8vw); /* 动画结束时向左上移动 */
  }
}

@keyframes float-2 {
  0% {
    transform: translate(0, 0); /* 动画开始时不位移 */
  }
  100% {
    transform: translate(8vw, -8vw); /* 动画结束时向右上移动 */
  }
}

@keyframes float-3 {
  0% {
    transform: translate(0, 0); /* 动画开始时不位移 */
  }
  100% {
    transform: translate(-10vw, 10vw); /* 动画结束时向左下移动 */
  }
}

.el-container {
  position: relative; /* 设置相对定位 */
  z-index: 1; /* 设置层级为1，确保在背景之上 */
}

.el-header {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-between; /* 两端对齐 */
  height: 80px !important; /* 设置高度为80像素 */
  background: rgba(255, 255, 255, 0.95); /* 设置半透明白色背景 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08); /* 添加阴影效果 */
  position: sticky; /* 设置粘性定位 */
  top: 0; /* 顶部对齐 */
  z-index: 100; /* 设置较高层级，确保在其他内容之上 */
  backdrop-filter: blur(15px); /* 添加背景模糊效果 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); /* 添加底部边框 */
  padding: 0 25px; /* 设置左右内边距为25像素 */
}

.header-title {
  font-size: 2rem; /* 设置字体大小为2倍根元素字体大小 */
  background: linear-gradient(to right, #42b983, #2f9768); /* 设置从左到右的渐变背景 */
  -webkit-background-clip: text; /* 设置背景裁剪为文本 */
  -webkit-text-fill-color: transparent; /* 设置文本填充颜色为透明 */
  background-clip: text; /* 设置背景裁剪为文本 */
  margin: 0; /* 移除默认边距 */
  font-weight: 800; /* 设置字体粗细为800 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 12px; /* 设置元素间距为12像素 */
  filter: drop-shadow(0 2px 3px rgba(66, 185, 131, 0.2)); /* 添加投影效果 */
  letter-spacing: 1px; /* 设置字母间距为1像素 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
}

.header-title:hover {
  transform: scale(1.02); /* 鼠标悬停时放大1.02倍 */
  filter: drop-shadow(0 3px 5px rgba(66, 185, 131, 0.3)); /* 增强投影效果 */
}

.header-icon {
  font-size: 28px; /* 设置字体大小为28像素 */
  color: #42b983; /* 设置文字颜色为绿色 */
  animation: pulse-icon 2s infinite; /* 应用pulse-icon动画，持续2秒，无限循环 */
  transform-origin: center; /* 设置变换原点为中心 */
}

@keyframes pulse-icon {
  0% {
    transform: scale(1); /* 动画开始时原始大小 */
  }
  50% {
    transform: scale(1.15); /* 动画中间时放大1.15倍 */
  }
  100% {
    transform: scale(1); /* 动画结束时恢复原始大小 */
  }
}

.clear-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加所有属性的过渡效果 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 8px; /* 设置元素间距为8像素 */
  border-radius: 8px; /* 设置边框圆角为8像素 */
  padding: 10px 16px; /* 设置内边距，上下10像素，左右16像素 */
  font-weight: 500; /* 设置字体粗细为500 */
  position: relative; /* 设置相对定位 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.clear-btn:hover:not(:disabled) {
  transform: translateY(-4px); /* 鼠标悬停且非禁用状态时向上移动4像素 */
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.3); /* 添加阴影效果 */
}

.clear-btn::before {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满父元素 */
  height: 100%; /* 高度占满父元素 */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    rgba(255, 255, 255, 0) 100%); /* 设置渐变背景，创建光效 */
  transform: translateX(-100%); /* 初始位置在元素左侧外部 */
  transition: transform 0.6s ease; /* 添加变换的过渡效果 */
}

.clear-btn:hover:not(:disabled)::before {
  transform: translateX(100%); /* 鼠标悬停且非禁用状态时，伪元素移动到右侧外部，形成扫光效果 */
}

.el-main {
  padding: 30px; /* 设置内边距为30像素 */
}

.empty-container {
  margin-top: 40px; /* 设置上边距为40像素 */
  animation: fade-in 1s ease-out; /* 应用fade-in动画，持续1秒 */
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  text-align: center; /* 文字居中对齐 */
  max-width: 500px; /* 设置最大宽度为500像素 */
  margin: 60px auto; /* 设置上下边距为60像素，左右自动居中 */
}

@keyframes fade-in {
  from {
    opacity: 0; /* 动画开始时完全透明 */
    transform: translateY(20px); /* 动画开始时向下偏移20像素 */
  }
  to {
    opacity: 1; /* 动画结束时完全不透明 */
    transform: translateY(0); /* 动画结束时恢复原位 */
  }
}

.empty-illustration {
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  margin-bottom: 20px; /* 设置下边距为20像素 */
}

.empty-icon {
  font-size: 64px; /* 设置字体大小为64像素 */
  color: #42b983; /* 设置文字颜色为绿色 */
  margin-bottom: 30px; /* 设置下边距为30像素 */
  animation: pulse-icon-empty 2s ease-in-out infinite; /* 应用pulse-icon-empty动画，持续2秒，无限循环 */
  transform-origin: center; /* 设置变换原点为中心 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  width: 100px; /* 设置宽度为100像素 */
  height: 100px; /* 设置高度为100像素 */
  background: linear-gradient(135deg, #f8f9fa, #ffffff); /* 设置渐变背景 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  box-shadow: 0 10px 30px rgba(66, 185, 131, 0.2); /* 添加阴影效果 */
}

@keyframes pulse-icon-empty {
  0%, 100% {
    transform: scale(1); /* 动画开始和结束时原始大小 */
  }
  50% {
    transform: scale(1.2); /* 动画中间时放大1.2倍 */
  }
}

.empty-phones {
  display: flex; /* 使用弹性布局 */
  gap: 15px; /* 设置元素间距为15像素 */
  margin: 20px 0; /* 设置上下边距为20像素 */
  position: relative; /* 设置相对定位 */
}

.empty-phone {
  width: 15px; /* 设置宽度为15像素 */
  height: 40px; /* 设置高度为40像素 */
  background: linear-gradient(to bottom, #42b983, #2f9768); /* 设置从上到下的渐变背景 */
  border-radius: 4px; /* 设置边框圆角为4像素 */
  position: relative; /* 设置相对定位 */
  animation-duration: 1.5s; /* 设置动画持续时间为1.5秒 */
  animation-timing-function: ease-in-out; /* 设置动画缓动函数 */
  animation-iteration-count: infinite; /* 设置动画无限循环 */
}

.phone1 {
  height: 35px; /* 设置高度为35像素 */
  animation-name: float-phone-compare; /* 应用float-phone-compare动画 */
  animation-delay: 0s; /* 不延迟开始动画 */
}

.phone2 {
  height: 50px; /* 设置高度为50像素 */
  animation-name: float-phone-compare; /* 应用float-phone-compare动画 */
  animation-delay: 0.3s; /* 延迟0.3秒开始动画 */
}

.phone3 {
  height: 40px; /* 设置高度为40像素 */
  animation-name: float-phone-compare; /* 应用float-phone-compare动画 */
  animation-delay: 0.6s; /* 延迟0.6秒开始动画 */
}

.phone4 {
  height: 45px; /* 设置高度为45像素 */
  animation-name: float-phone-compare; /* 应用float-phone-compare动画 */
  animation-delay: 0.9s; /* 延迟0.9秒开始动画 */
}

@keyframes float-phone-compare {
  0%, 100% {
    transform: translateY(0); /* 动画开始和结束时不位移 */
  }
  50% {
    transform: translateY(-10px); /* 动画中间时向上移动10像素 */
  }
}

.empty-title {
  color: #303133; /* 设置文字颜色为深灰色 */
  font-size: 24px; /* 设置字体大小为24像素 */
  font-weight: 700; /* 设置字体粗细为700 */
  margin-bottom: 10px; /* 设置下边距为10像素 */
  background: linear-gradient(to right, #42b983, #2f9768); /* 设置从左到右的渐变背景 */
  -webkit-background-clip: text; /* 设置背景裁剪为文本 */
  -webkit-text-fill-color: transparent; /* 设置文本填充颜色为透明 */
  background-clip: text; /* 设置背景裁剪为文本 */
  filter: drop-shadow(0 2px 2px rgba(66, 185, 131, 0.1)); /* 添加投影效果 */
}

.empty-description {
  color: #606266; /* 设置文字颜色为灰色 */
  font-size: 16px; /* 设置字体大小为16像素 */
  margin: 15px 0 30px; /* 设置上边距为15像素，下边距为30像素 */
  max-width: 320px; /* 设置最大宽度为320像素 */
  line-height: 1.6; /* 设置行高为1.6倍字体大小 */
}

.add-phone-btn {
  padding: 14px 28px !important; /* 设置内边距，上下14像素，左右28像素 */
  font-size: 16px !important; /* 设置字体大小为16像素 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; /* 添加所有属性的过渡效果 */
  display: flex !important; /* 使用弹性布局 */
  align-items: center !important; /* 垂直居中对齐 */
  justify-content: center !important; /* 水平居中对齐 */
  gap: 10px !important; /* 设置元素间距为10像素 */
  border-radius: 10px !important; /* 设置边框圆角为10像素 */
  background: linear-gradient(135deg, #42b983, #2f9768) !important; /* 设置渐变背景 */
  border: none !important; /* 移除边框 */
  position: relative !important; /* 设置相对定位 */
  overflow: hidden !important; /* 隐藏溢出内容 */
  box-shadow: 0 8px 15px rgba(66, 185, 131, 0.3) !important; /* 添加阴影效果 */
}

.add-phone-btn:hover {
  transform: translateY(-5px) !important; /* 鼠标悬停时向上移动5像素 */
  box-shadow: 0 15px 25px rgba(66, 185, 131, 0.4) !important; /* 增强阴影效果 */
}

.add-phone-btn::before {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满父元素 */
  height: 100%; /* 高度占满父元素 */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%); /* 设置渐变背景，创建光效 */
  transform: translateX(-100%); /* 初始位置在元素左侧外部 */
  transition: transform 0.6s ease; /* 添加变换的过渡效果 */
}

.add-phone-btn:hover::before {
  transform: translateX(100%); /* 鼠标悬停时，伪元素移动到右侧外部，形成扫光效果 */
}

.compare-container {
  background: rgba(255, 255, 255, 0.92); /* 设置半透明白色背景 */
  border-radius: 20px; /* 设置边框圆角为20像素 */
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  overflow: hidden; /* 隐藏溢出内容 */
  backdrop-filter: blur(15px); /* 添加背景模糊效果 */
  animation: slide-up 0.8s ease-out; /* 应用slide-up动画，持续0.8秒 */
  border: 1px solid rgba(255, 255, 255, 0.5); /* 添加半透明白色边框 */
  padding: 0 0 30px 0; /* 设置底部内边距为30像素 */
}

/* 滑动上升动画 - 用于表格内容平滑出现效果 */
@keyframes slide-up {
  from { /* 动画起始状态 */
    opacity: 0; /* 设置不透明度为0，元素完全透明不可见 */
    transform: translateY(20px); /* 元素初始位置向下偏移20像素，创造从下方滑入效果 */
  }
  to { /* 动画结束状态 */
    opacity: 1; /* 设置不透明度为1，元素完全可见 */
    transform: translateY(0); /* 元素恢复正常位置，不再有偏移 */
  }
}

.compare-header {
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中对齐 */
  padding: 20px 30px; /* 设置内边距，上下20像素，左右30像素 */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); /* 添加底部边框 */
  background: linear-gradient(to right, rgba(66, 185, 131, 0.05), rgba(255, 255, 255, 0)); /* 设置从左到右的渐变背景 */
}

.compare-title {
  margin: 0; /* 移除默认边距 */
  color: #303133; /* 设置文字颜色为深灰色 */
  font-size: 20px; /* 设置字体大小为20像素 */
  font-weight: 700; /* 设置字体粗细为700 */
  position: relative; /* 设置相对定位 */
  display: inline-block; /* 设置为行内块元素 */
}

.compare-title::after {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  bottom: -5px; /* 底部位置偏移-5像素 */
  left: 0; /* 左侧对齐 */
  width: 40px; /* 设置宽度为40像素 */
  height: 3px; /* 设置高度为3像素 */
  background: linear-gradient(to right, #42b983, #2f9768); /* 设置从左到右的渐变背景 */
  border-radius: 2px; /* 设置边框圆角为2像素 */
  transition: width 0.3s ease; /* 添加宽度变化的过渡效果 */
}

.compare-title:hover::after {
  width: 100%; /* 鼠标悬停时，下划线宽度扩展到100% */
}

.compare-tag {
  font-size: 13px; /* 设置字体大小为13像素 */
  border-radius: 6px; /* 设置边框圆角为6像素 */
  padding: 6px 10px; /* 设置内边距，上下6像素，左右10像素 */
  background: linear-gradient(135deg, #42b983, #2f9768); /* 设置渐变背景 */
  color: white; /* 设置文字颜色为白色 */
  font-weight: 500; /* 设置字体粗细为500 */
  box-shadow: 0 3px 10px rgba(66, 185, 131, 0.2); /* 添加阴影效果 */
  border: none; /* 移除边框 */
}

.phone-cards {
  display: flex; /* 使用弹性布局 */
  gap: 20px; /* 设置元素间距为20像素 */
  padding: 30px; /* 设置内边距为30像素 */
  overflow-x: auto; /* 允许水平方向滚动 */
  scroll-snap-type: x mandatory; /* 设置滚动捕捉类型为水平方向强制捕捉 */
  scrollbar-width: thin; /* 设置滚动条宽度为细 */
  scrollbar-color: #c0c4cc #f0f2f5; /* 设置滚动条颜色 */
}

.phone-cards::-webkit-scrollbar {
  height: 6px; /* 设置滚动条高度为6像素（针对WebKit浏览器） */
}

.phone-cards::-webkit-scrollbar-track {
  background: #f0f2f5; /* 设置滚动条轨道背景色为浅灰色（针对WebKit浏览器） */
  border-radius: 3px; /* 设置边框圆角为3像素（针对WebKit浏览器） */
}

.phone-cards::-webkit-scrollbar-thumb {
  background-color: #c0c4cc; /* 设置滚动条滑块背景色为灰色（针对WebKit浏览器） */
  border-radius: 3px; /* 设置边框圆角为3像素（针对WebKit浏览器） */
}

.phone-card {
  min-width: 200px; /* 设置最小宽度为200像素 */
  background: white; /* 设置背景颜色为白色 */
  border-radius: 16px; /* 设置边框圆角为16像素 */
  padding: 18px; /* 设置内边距为18像素 */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07); /* 添加阴影效果 */
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加所有属性的过渡效果 */
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  border: 1px solid rgba(0, 0, 0, 0.03); /* 添加淡灰色边框 */
  position: relative; /* 设置相对定位 */
  scroll-snap-align: start; /* 设置滚动捕捉位置为开始位置 */
  transform: translateZ(0); /* 启用GPU加速 */
}

.phone-card:hover {
  transform: translateY(-10px) scale(1.02); /* 鼠标悬停时向上移动10像素并放大1.02倍 */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); /* 增强阴影效果 */
}

.phone-image-wrapper {
  width: 100%; /* 宽度占满父元素 */
  height: 180px; /* 设置高度为180像素 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  position: relative; /* 设置相对定位 */
  overflow: hidden; /* 隐藏溢出内容 */
  margin-bottom: 15px; /* 设置下边距为15像素 */
  background: linear-gradient(145deg, #f0f2f5, #ffffff); /* 设置渐变背景 */
  border-radius: 10px; /* 设置边框圆角为10像素 */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05); /* 添加内阴影效果 */
}

.phone-image {
  height: 160px; /* 设置高度为160像素 */
  object-fit: contain; /* 保持图片比例，确保完整显示 */
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加所有属性的过渡效果 */
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.1)); /* 添加投影效果 */
  transform: translateZ(0); /* 启用GPU加速 */
  z-index: 2; /* 设置层级为2，确保在其他元素之上 */
}

.phone-card:hover .phone-image {
  transform: scale(1.12) translateY(-8px); /* 鼠标悬停时，图片放大1.12倍并向上移动8像素 */
  filter: drop-shadow(0 15px 20px rgba(0, 0, 0, 0.2)); /* 增强投影效果 */
}

.remove-overlay {
  position: absolute; /* 设置绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  right: 0; /* 右侧对齐 */
  bottom: 0; /* 底部对齐 */
  background: rgba(0, 0, 0, 0.5); /* 设置半透明黑色背景 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  opacity: 0; /* 设置不透明度为0，即完全透明 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果 */
  border-radius: 8px; /* 设置边框圆角为8像素 */
}

.phone-card:hover .remove-overlay {
  opacity: 1; /* 鼠标悬停时，移除浮层变为完全不透明 */
}

.remove-btn {
  transform: scale(0.8); /* 初始时缩小至0.8倍大小 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
}

.remove-btn:hover {
  transform: scale(1); /* 鼠标悬停时恢复到原始大小 */
}

.phone-name {
  margin: 0 0 10px 0; /* 设置下边距为10像素 */
  font-size: 16px; /* 设置字体大小为16像素 */
  color: #303133; /* 设置文字颜色为深灰色 */
  text-align: center; /* 文字居中对齐 */
  font-weight: 600; /* 设置字体粗细为600 */
  height: 44px; /* 设置高度为44像素 */
  display: -webkit-box; /* 设置为WebKit盒子显示 */
  -webkit-line-clamp: 2; /* 限制显示行数为2行 */
  -webkit-box-orient: vertical; /* 设置垂直排列方向 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 文本溢出时显示省略号 */
  width: 100%; /* 宽度占满父元素 */
  transition: color 0.3s ease; /* 添加颜色变化的过渡效果 */
}

.phone-card:hover .phone-name {
  color: #42b983; /* 鼠标悬停时，文字颜色变为绿色 */
}

.phone-price {
  color: #f56c6c; /* 设置文字颜色为红色 */
  font-size: 18px; /* 设置字体大小为18像素 */
  font-weight: 700; /* 设置字体粗细为700 */
  margin-bottom: 8px; /* 设置下边距为8像素 */
}

.phone-badge {
  margin-top: 5px; /* 设置上边距为5像素 */
  margin-bottom: 10px; /* 设置下边距为10像素 */
}

.add-more-card {
  min-width: 200px; /* 设置最小宽度为200像素 */
  height: 273px; /* 匹配调整后的手机卡片高度 */
  border: 2px dashed #c0c4cc; /* 添加2像素宽的虚线边框 */
  border-radius: 16px; /* 设置边框圆角为16像素 */
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  justify-content: center; /* 垂直居中对齐 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: all 0.4s ease; /* 添加所有属性的过渡效果 */
  scroll-snap-align: start; /* 设置滚动捕捉位置为开始位置 */
  background: rgba(255, 255, 255, 0.7); /* 设置半透明白色背景 */
}

.add-more-card:hover {
  border-color: #42b983; /* 鼠标悬停时，边框颜色变为绿色 */
  background: rgba(66, 185, 131, 0.05); /* 鼠标悬停时，背景色变为淡绿色 */
  transform: translateY(-10px); /* 鼠标悬停时向上移动10像素 */
  box-shadow: 0 10px 20px rgba(66, 185, 131, 0.1); /* 添加阴影效果 */
}

.add-icon-container {
  width: 70px; /* 设置宽度为70像素 */
  height: 70px; /* 设置高度为70像素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  background: #f0f2f5; /* 设置背景颜色为浅灰色 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  margin-bottom: 20px; /* 设置下边距为20像素 */
  transition: all 0.4s ease; /* 添加所有属性的过渡效果 */
}

.add-more-card:hover .add-icon-container {
  background: #42b983; /* 鼠标悬停时，背景色变为绿色 */
  transform: scale(1.1) rotate(5deg); /* 鼠标悬停时放大1.1倍并旋转5度 */
  box-shadow: 0 8px 15px rgba(66, 185, 131, 0.2); /* 添加阴影效果 */
}

.add-icon {
  font-size: 28px; /* 设置字体大小为28像素 */
  color: #909399; /* 设置文字颜色为灰色 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果 */
}

.add-more-card:hover .add-icon {
  color: white; /* 鼠标悬停时，图标颜色变为白色 */
}

.add-text {
  color: #909399; /* 设置文字颜色为灰色 */
  font-size: 16px; /* 设置字体大小为16像素 */
  transition: all 0.3s ease; /* 添加所有属性的过渡效果 */
  font-weight: 500; /* 设置字体粗细为500 */
}

.add-more-card:hover .add-text {
  color: #42b983; /* 鼠标悬停时，文字颜色变为绿色 */
  font-weight: 600; /* 鼠标悬停时，字体粗细变为600 */
  transform: scale(1.05); /* 鼠标悬停时放大1.05倍 */
}

.compare-table-container {
  margin: 20px 30px; /* 设置外边距，上下20像素，左右30像素 */
  transition: all 0.5s ease; /* 添加所有属性的过渡效果 */
  opacity: 1; /* 设置不透明度为1 */
  transform: translateY(0); /* 不位移 */
  animation: slide-up 0.8s ease-out 0.2s both; /* 应用slide-up动画，持续0.8秒，延迟0.2秒开始，保持最终状态 */
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
  margin: 10px 30px 30px; /* 设置外边距，上10像素，左右30像素，下30像素 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
  overflow: hidden; /* 隐藏溢出内容 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08); /* 添加阴影效果 */
  border: 1px solid rgba(0, 0, 0, 0.03); /* 添加淡灰色边框 */
}

.table-phone-header {
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  align-items: center; /* 水平居中对齐 */
  gap: 8px; /* 设置元素间距为8像素 */
  padding: 5px 0; /* 设置上下内边距为5像素 */
}

.table-phone-name {
  font-weight: 600; /* 设置字体粗细为600 */
  color: #303133; /* 设置文字颜色为深灰色 */
}

.table-phone-brand {
  font-size: 12px; /* 设置字体大小为12像素 */
  border-radius: 4px; /* 设置边框圆角为4像素 */
  padding: 2px 8px; /* 设置内边距，上下2像素，左右8像素 */
}

.cell-value {
  transition: all 0.3s ease; /* 添加所有属性的过渡效果 */
  padding: 10px; /* 设置内边距为10像素 */
  border-radius: 6px; /* 设置边框圆角为6像素 */
}

.highlight {
  background: rgba(66, 185, 131, 0.1); /* 设置背景为半透明绿色 */
  color: #42b983; /* 设置文字颜色为绿色 */
  font-weight: 600; /* 设置字体粗细为600 */
  box-shadow: inset 0 0 0 1px rgba(66, 185, 131, 0.2); /* 添加内阴影效果，形成边框 */
}

.compare-actions {
  display: flex; /* 使用弹性布局 */
  justify-content: center; /* 水平居中对齐 */
  margin-top: 20px; /* 设置上边距为20像素 */
}

.action-btn {
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加所有属性的过渡效果 */
  padding: 14px 28px; /* 设置内边距，上下14像素，左右28像素 */
  border-radius: 10px; /* 设置边框圆角为10像素 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  gap: 10px; /* 设置元素间距为10像素 */
  font-weight: 600; /* 设置字体粗细为600 */
  letter-spacing: 0.5px; /* 设置字母间距为0.5像素 */
  position: relative; /* 设置相对定位 */
  overflow: hidden; /* 隐藏溢出内容 */
  background: linear-gradient(to right, #409EFF, #337ecc); /* 设置从左到右的渐变背景 */
  color: white; /* 设置文字颜色为白色 */
  border: none; /* 移除边框 */
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.3); /* 添加阴影效果 */
}

.action-btn:hover {
  transform: translateY(-5px); /* 鼠标悬停时向上移动5像素 */
  box-shadow: 0 15px 25px rgba(64, 158, 255, 0.4); /* 增强阴影效果 */
}

.action-btn::before {
  content: ''; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
  width: 100%; /* 宽度占满父元素 */
  height: 100%; /* 高度占满父元素 */
  background: linear-gradient(120deg, 
    rgba(255, 255, 255, 0) 0%, 
    rgba(255, 255, 255, 0.3) 50%, 
    rgba(255, 255, 255, 0) 100%); /* 设置渐变背景，创建光效 */
  transform: translateX(-100%); /* 初始位置在元素左侧外部 */
  transition: transform 0.6s ease; /* 添加变换的过渡效果 */
}

.action-btn:hover::before {
  transform: translateX(100%); /* 鼠标悬停时，伪元素移动到右侧外部，形成扫光效果 */
}

.property-column {
  font-weight: 600; /* 设置字体粗细为600 */
}

.value-column {
  min-width: 180px; /* 设置最小宽度为180像素 */
}

@media (max-width: 992px) {
  .compare-container {
    padding: 0 0 20px 0; /* 设置底部内边距为20像素 */
  }
  
  .compare-header {
    padding: 15px 20px; /* 设置内边距，上下15像素，左右20像素 */
    flex-direction: column; /* 垂直排列子元素 */
    align-items: flex-start; /* 左侧对齐 */
    gap: 10px; /* 设置元素间距为10像素 */
  }
  
  .phone-cards {
    padding: 20px; /* 设置内边距为20像素 */
  }
  
  .compare-table {
    margin: 0 20px 20px; /* 设置外边距，上0，左右20像素，下20像素 */
  }
}

@media (max-width: 768px) {
  .el-main {
    padding: 20px 15px; /* 设置内边距，上下20像素，左右15像素 */
  }
  
  .el-header {
    padding: 0 15px; /* 设置左右内边距为15像素 */
    height: auto !important; /* 设置高度为自动，覆盖默认设置 */
    min-height: 70px; /* 设置最小高度为70像素 */
    flex-wrap: wrap; /* 允许元素换行 */
  }
  
  .header-title {
    font-size: 1.5rem; /* 设置字体大小为1.5倍根元素字体大小 */
    margin: 10px 0; /* 设置上下边距为10像素 */
  }
  
  .clear-btn {
    margin: 10px 0; /* 设置上下边距为10像素 */
  }
  
  .phone-card, .add-more-card {
    min-width: 160px; /* 设置最小宽度为160像素 */
  }
  
  .phone-image {
    height: 120px; /* 设置高度为120像素 */
  }
}

@media (max-width: 576px) {
  .el-main {
    padding: 15px 10px; /* 设置内边距，上下15像素，左右10像素 */
  }
  
  .phone-cards {
    padding: 15px; /* 设置内边距为15像素 */
    gap: 15px; /* 设置元素间距为15像素 */
  }
  
  .phone-card, .add-more-card {
    min-width: 140px; /* 设置最小宽度为140像素 */
  }
  
  .phone-name {
    font-size: 14px; /* 设置字体大小为14像素 */
  }
  
  .compare-table {
    margin: 0 15px 15px; /* 设置外边距，上0，左右15像素，下15像素 */
  }
}

/* 淡入缩放过渡效果 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* 添加所有属性的过渡效果 */
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0; /* 设置不透明度为0，即完全透明 */
  transform: scale(0.95); /* 缩小到原始大小的95% */
}

/* 列表项动画 */
.phone-list-enter-active,
.phone-list-leave-active {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); /* 添加所有属性的过渡效果 */
}

.phone-list-enter-from {
  opacity: 0; /* 设置不透明度为0，即完全透明 */
  transform: translateY(30px); /* 向下偏移30像素 */
}

.phone-list-leave-to {
  opacity: 0; /* 设置不透明度为0，即完全透明 */
  transform: translateY(-30px); /* 向上偏移30像素 */
}

.phone-list-move {
  transition: transform 0.5s; /* 添加变换的过渡效果 */
}

/* 添加手机倒影效果 */
.phone-model-shadow {
  position: absolute; /* 设置绝对定位 */
  bottom: 0; /* 底部对齐 */
  left: 50%; /* 左侧位置为50% */
  width: 70%; /* 设置宽度为70% */
  height: 10px; /* 设置高度为10像素 */
  background: rgba(0, 0, 0, 0.1); /* 设置半透明黑色背景 */
  border-radius: 50%; /* 设置边框圆角为50%，形成椭圆 */
  transform: translateX(-50%) scaleX(0.8); /* 水平居中并水平压缩到80% */
  filter: blur(4px); /* 添加4像素的模糊效果 */
  opacity: 0.7; /* 设置不透明度为0.7 */
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); /* 添加所有属性的过渡效果 */
}

.phone-card:hover .phone-model-shadow {
  width: 75%; /* 鼠标悬停时，宽度增加到75% */
  opacity: 0.9; /* 鼠标悬停时，不透明度增加到0.9 */
  filter: blur(6px); /* 鼠标悬停时，模糊效果增加到6像素 */
  transform: translateX(-50%) scaleX(0.9); /* 鼠标悬停时，水平压缩减少到90% */
}
</style>