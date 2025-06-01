<template>
  <div class="compare-view">
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
    
    <el-container>
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
        <el-empty 
          v-if="comparePhones.length === 0" 
          description="对比列表为空" 
          :image-size="200"
          class="empty-container"
        >
          <p class="empty-description">添加手机到对比列表，可以更直观地比较它们的参数差异</p>
          <el-button type="primary" @click="goToRecommend" size="large" class="add-phone-btn">
            <el-icon><plus /></el-icon>
            去添加手机
          </el-button>
        </el-empty>
        
        <div v-else class="compare-container">
          <div class="compare-header">
            <h2 class="compare-title">已添加 {{ comparePhones.length }} 台手机</h2>
            <el-tag type="info" effect="dark" class="compare-tag">
              最多可添加4台手机进行对比
            </el-tag>
          </div>
          
          <div class="phone-cards">
            <div 
              v-for="(phone, index) in comparePhones" 
              :key="phone.id"
              class="phone-card"
            >
              <div class="phone-image-wrapper">
                <img :src="phone.image" :alt="phone.name" class="phone-image">
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
            </div>
            
            <div v-if="comparePhones.length < 4" class="add-more-card" @click="goToRecommend">
              <div class="add-icon-container">
                <el-icon class="add-icon"><plus /></el-icon>
              </div>
              <div class="add-text">添加更多手机</div>
            </div>
          </div>
          
          <el-table 
            :data="tableData" 
            border 
            style="width: 100%"
            class="compare-table"
            stripe
            highlight-current-row
            :header-cell-style="{background:'#f9fbff', color: '#409EFF'}"
          >
            <el-table-column 
              prop="property" 
              label="参数项" 
              width="180" 
              fixed="left"
              header-align="center"
              align="center"
              class-name="property-column"
            />
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
          
          <div class="compare-actions">
            <el-button @click="goToRecommend" type="primary" class="action-btn">
              <el-icon><back /></el-icon>
              返回推荐页
            </el-button>
          </div>
        </div>
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

// 获取对比列表中的手机
const comparePhones = computed(() => phoneStore.comparePhones)

// 生成表格数据
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

// 移除手机
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

// 清空对比列表
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

// 跳转到推荐页面
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
}

.bg-gradient-1,
.bg-gradient-2 {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
  opacity: 0.5;
}

.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 60vw;
  height: 60vw;
  top: -20vw;
  right: -20vw;
  animation: float-1 15s ease-in-out infinite alternate;
}

.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  width: 70vw;
  height: 70vw;
  bottom: -30vw;
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-title {
  font-size: 1.8rem;
  background: linear-gradient(to right, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-icon {
  font-size: 24px;
  color: #42b983;
}

.clear-btn {
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 8px;
}

.clear-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.2);
}

.el-main {
  padding: 30px;
}

.empty-container {
  margin-top: 40px;
  animation: fade-in 0.8s ease-out;
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

.empty-description {
  color: #909399;
  font-size: 16px;
  margin: 20px 0;
}

.add-phone-btn {
  padding: 12px 24px;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
}

.add-phone-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.3);
}

.compare-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  backdrop-filter: blur(10px);
  animation: slide-up 0.8s ease-out;
  border: 1px solid rgba(0, 0, 0, 0.05);
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
}

.compare-title {
  margin: 0;
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

.compare-tag {
  font-size: 13px;
}

.phone-cards {
  display: flex;
  gap: 20px;
  padding: 30px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.phone-card {
  min-width: 200px;
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  scroll-snap-align: start;
}

.phone-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.phone-image-wrapper {
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 15px;
}

.phone-image {
  height: 140px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.phone-card:hover .phone-image {
  transform: scale(1.1);
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
  height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.phone-price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 5px;
}

.add-more-card {
  min-width: 200px;
  height: 253px; /* 与手机卡片高度一致 */
  border: 2px dashed #c0c4cc;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  scroll-snap-align: start;
}

.add-more-card:hover {
  border-color: #409EFF;
  background: rgba(64, 158, 255, 0.05);
  transform: translateY(-5px);
}

.add-icon-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.add-more-card:hover .add-icon-container {
  background: #409EFF;
}

.add-icon {
  font-size: 24px;
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
}

.add-more-card:hover .add-text {
  color: #409EFF;
  font-weight: 500;
}

.compare-table {
  margin: 0 30px 30px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.table-phone-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.table-phone-name {
  font-weight: 600;
  color: #303133;
}

.table-phone-brand {
  font-size: 12px;
}

.cell-value {
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 4px;
}

.highlight {
  background: rgba(103, 194, 58, 0.1);
  color: #67c23a;
  font-weight: 600;
}

.compare-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.action-btn {
  transition: all 0.3s ease;
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.3);
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
</style>