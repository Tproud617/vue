<template>
  <div class="detail-view">
    <el-container>
      <el-header>
        <h1 class="header-title">手机详情</h1>
      </el-header>
      
      <el-main>
        <el-card v-if="loading" class="loading-card">
          <el-skeleton style="width: 100%" animated>
            <template #template>
              <el-skeleton-item variant="image" style="width: 240px; height: 240px; margin: 0 auto 20px;" />
              <el-skeleton-item variant="h1" style="width: 50%" />
              <el-skeleton-item variant="text" style="margin-top: 16px; width: 80%" />
              <el-skeleton-item variant="text" style="width: 60%" />
              <el-skeleton-item variant="text" style="width: 70%" />
            </template>
          </el-skeleton>
        </el-card>
        
        <div v-else-if="error" class="error-container">
          <el-empty description="无法获取手机详情">
            <template #description>
              <p>{{ error }}</p>
            </template>
            <el-button type="primary" @click="goBack">返回列表</el-button>
          </el-empty>
        </div>
        
        <template v-else-if="phone">
          <el-row :gutter="30">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="6">              <div class="phone-image-container">
                <img :src="phone.image" :alt="phone.name" class="phone-image" />
              </div>
            </el-col>
            
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="18">
              <div class="phone-details">
                <h1 class="phone-title">{{ phone.name }}</h1>
                <div class="phone-price">¥{{ phone.price }}</div>
                
                <div class="detail-section">
                  <h2 class="section-title">基本信息</h2>
                  <el-descriptions :column="1" border>
                    <el-descriptions-item label="品牌">{{ phone.brand }}</el-descriptions-item>
                    <el-descriptions-item label="屏幕尺寸">{{ phone.screen }} 英寸</el-descriptions-item>
                    <el-descriptions-item label="存储容量">{{ phone.storage }} GB</el-descriptions-item>
                  </el-descriptions>
                </div>
                
                <div class="detail-section">
                  <h2 class="section-title">性能评分</h2>
                  <div class="rating-container">
                    <div class="rating-item">
                      <span class="rating-label">相机:</span>
                      <el-rate :model-value="phone.camera" disabled />
                    </div>
                    <div class="rating-item">
                      <span class="rating-label">性能:</span>
                      <el-rate :model-value="phone.performance" disabled />
                    </div>
                    <div class="rating-item">
                      <span class="rating-label">续航:</span>
                      <el-rate :model-value="phone.battery" disabled />
                    </div>
                  </div>
                </div>
                
                <div class="detail-section">
                  <h2 class="section-title">主要特性</h2>
                  <div class="features-container">
                    <el-tag 
                      v-for="(feature, index) in phone.features" 
                      :key="index" 
                      class="feature-tag"
                      size="large"
                    >
                      {{ feature }}
                    </el-tag>
                  </div>
                </div>
                
                <div class="actions">
                  <el-button type="primary" @click="goBack">返回</el-button>
                  <el-button 
                    type="success" 
                    @click="addToCompare"
                    :disabled="isInCompareList"
                  >
                    {{ isInCompareList ? '已添加到对比' : '添加到对比' }}
                  </el-button>
                  <el-button 
                    type="danger" 
                    :plain="!isInFavoriteList" 
                    @click="toggleFavorite"
                    class="favorite-btn"
                  >
                    <el-icon class="favorite-icon"><star /></el-icon>
                    {{ isInFavoriteList ? '已收藏' : '收藏' }}
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </template>
        
        <el-empty v-else description="找不到该手机">
          <el-button type="primary" @click="goBack">返回列表</el-button>
        </el-empty>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { ElMessage } from 'element-plus'
import { Star } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const phoneStore = usePhoneStore()

const phone = ref(null)
const loading = ref(true)
const error = ref(null)

// 判断当前手机是否已在对比列表中
const isInCompareList = computed(() => {
  if (!phone.value) return false
  return phoneStore.compareList.includes(phone.value.id)
})

// 判断当前手机是否已收藏
const isInFavoriteList = computed(() => {
  if (!phone.value) return false
  return phoneStore.favoriteList.includes(phone.value.id)
})

onMounted(async () => {
  const phoneId = Number(route.params.id)
  if (!phoneId) {
    error.value = '无效的手机ID'
    loading.value = false
    return
  }
  
  try {
    loading.value = true
    error.value = null
    phone.value = await phoneStore.getPhoneDetail(phoneId)
    
    if (!phone.value) {
      error.value = `找不到ID为${phoneId}的手机`
    }
  } catch (err) {
    console.error('获取手机详情失败:', err)
    error.value = '加载手机详情失败，请稍后再试'
  } finally {
    loading.value = false
  }
})

const goBack = () => {
  router.push('/recommend')
}

// 添加到对比列表
const addToCompare = () => {
  if (!phone.value) return
  
  if (phoneStore.compareList.length >= 4 && !isInCompareList.value) {
    ElMessage.warning('对比列表最多只能添加4款手机')
    return
  }
  
  if (phoneStore.addToCompare(phone.value.id)) {
    ElMessage.success('已添加到对比列表')
  } else if (isInCompareList.value) {
    ElMessage.info('该手机已在对比列表中')
  } else {
    ElMessage.error('添加失败，请稍后再试')
  }
}

// 切换收藏状态
const toggleFavorite = () => {
  if (!phone.value) return
  
  if (phoneStore.toggleFavorite(phone.value.id)) {
    if (isInFavoriteList.value) {
      ElMessage.success('已从收藏中移除')
    } else {
      ElMessage.success('已添加到收藏')
    }
  } else {
    ElMessage.error('操作失败，请稍后再试')
  }
}
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.el-header {
  display: flex;
  align-items: center;
  height: 80px !important;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.header-title {
  font-size: 1.8rem;
  background: linear-gradient(to right, #42b983, #2f9768);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-weight: 700;
}

.el-main {
  padding: 30px;
}

.loading-card, .error-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
}

.phone-image-container {
  width: 100%;
  max-width: 400px; /* 限制最大宽度 */
  aspect-ratio: 4/3; /* 调整图片容器比例 */
  background: #ffffff;
  border-radius: 12px;
  margin: 0 auto 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.phone-details {
  padding: 10px;
}

.phone-title {
  font-size: 2rem;
  color: #303133;
  margin: 0 0 10px;
}

.phone-price {
  font-size: 1.5rem;
  color: #f56c6c;
  font-weight: 700;
  margin-bottom: 24px;
}

.detail-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.25rem;
  color: #303133;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}

.rating-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.rating-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 150px;
}

.rating-label {
  color: #606266;
  min-width: 60px;
}

.features-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.feature-tag {
  margin-right: 0;
}

.actions {
  margin-top: 40px;
  display: flex;
  gap: 16px;
}

.favorite-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(245, 108, 108, 0.2);
}

.favorite-icon {
  font-size: 16px;
  transition: all 0.3s ease;
}

.favorite-btn:hover .favorite-icon {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .el-main {
    padding: 20px 10px;
  }
  
  .phone-title {
    font-size: 1.5rem;
  }
  
  .actions {
    flex-wrap: wrap;
  }
}
</style>