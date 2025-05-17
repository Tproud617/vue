<template>
  <div class="recommend-view">
    <el-row :gutter="20">
      <!-- 左侧筛选区域 -->
      <el-col :span="6">
        <el-card class="filter-card" shadow="hover">
          <template #header>
            <div class="filter-header">
              <h3>筛选条件</h3>
              <el-button type="primary" @click="resetFilters" size="small">重置</el-button>
            </div>
          </template>
          
          <!-- 品牌筛选 -->
          <div class="filter-section">
            <h4>品牌选择</h4>
            <div class="brand-tags">
              <el-tag
                v-for="brand in availableBrands"
                :key="brand"
                :type="preferences.brand.includes(brand) ? 'success' : 'info'"
                class="brand-tag"
                @click="toggleBrand(brand)"
                :effect="preferences.brand.includes(brand) ? 'dark' : 'light'"
              >
                {{ brand }}
              </el-tag>
            </div>
          </div>

          <!-- 预算范围 -->
          <div class="filter-section">
            <h4>预算范围</h4>
            <el-slider
              v-model="preferences.budget"
              :min="1000"
              :max="12000"
              :step="500"
              show-stops
              show-input
              @change="updatePreferences"
            />
          </div>

          <!-- 重要性评分 -->
          <div class="filter-section">
            <h4>性能需求</h4>
            <div class="importance-rating">
              <div class="rating-row">
                <span>相机重要性</span>
                <el-rate v-model="preferences.camera" @change="updatePreferences"/>
              </div>
              <div class="rating-row">
                <span>性能重要性</span>
                <el-rate v-model="preferences.performance" @change="updatePreferences"/>
              </div>
              <div class="rating-row">
                <span>电池重要性</span>
                <el-rate v-model="preferences.battery" @change="updatePreferences"/>
              </div>
            </div>
          </div>

          <!-- 存储和屏幕 -->
          <div class="filter-section">
            <h4>存储需求</h4>
            <el-select v-model="preferences.storage" placeholder="选择存储容量" @change="updatePreferences">
              <el-option label="64GB" :value="64" />
              <el-option label="128GB" :value="128" />
              <el-option label="256GB" :value="256" />
              <el-option label="512GB" :value="512" />
              <el-option label="1TB" :value="1024" />
            </el-select>
          </div>

          <div class="filter-section">
            <h4>使用场景</h4>
            <el-select
              v-model="preferences.usage"
              multiple
              placeholder="选择使用场景"
              @change="updatePreferences"
            >
              <el-option label="游戏" value="游戏" />
              <el-option label="拍照" value="拍照" />
              <el-option label="社交" value="社交" />
              <el-option label="办公" value="办公" />
              <el-option label="影音" value="影音" />
            </el-select>
          </div>
        </el-card>
      </el-col>

      <!-- 右侧推荐结果 -->
      <el-col :span="18">
        <el-card shadow="hover" v-loading="loading">
          <template #header>
            <div class="recommendation-header">
              <h3>推荐手机</h3>
              <el-tag type="info">找到 {{ recommendations.length }} 款手机</el-tag>
            </div>
          </template>

          <!-- 手机列表 -->
          <div v-if="recommendations.length > 0" class="phone-grid">
            <el-card 
              v-for="phone in recommendations" 
              :key="phone.id"
              class="phone-card"
              shadow="hover"
            >
              <img :src="phone.image" :alt="phone.name" class="phone-image">
              <h4>{{ phone.name }}</h4>
              <div class="phone-info">
                <el-tag size="small" type="success">{{ phone.brand }}</el-tag>
                <span class="price">¥{{ phone.price.toLocaleString() }}</span>
              </div>

              <!-- 匹配分数 -->
              <div class="match-score">
                <el-progress 
                  :percentage="Math.min(100, (phone.matchScore / 25) * 100)"
                  :format="format => `匹配度: ${format}%`"
                  status="success"
                />
              </div>

              <!-- 手机参数 -->
              <div class="phone-specs">
                <div class="spec-item">
                  <el-tooltip content="存储容量">
                    <i class="el-icon">💾</i>
                    <span>{{ phone.storage }}GB</span>
                  </el-tooltip>
                </div>
                <div class="spec-item">
                  <el-tooltip content="屏幕尺寸">
                    <i class="el-icon">📱</i>
                    <span>{{ phone.screen }}"</span>
                  </el-tooltip>
                </div>
              </div>

              <div class="phone-ratings">
                <div class="rating-item">
                  <span class="rating-label">相机</span>
                  <el-rate v-model="phone.camera" disabled size="small"/>
                </div>
                <div class="rating-item">
                  <span class="rating-label">性能</span>
                  <el-rate v-model="phone.performance" disabled size="small"/>
                </div>
                <div class="rating-item">
                  <span class="rating-label">电池</span>
                  <el-rate v-model="phone.battery" disabled size="small"/>
                </div>
              </div>

              <!-- 使用场景标签 -->
              <div class="usage-tags">
                <el-tag 
                  v-for="usage in phone.usage" 
                  :key="usage"
                  size="small"
                  :type="preferences.usage.includes(usage) ? 'warning' : 'info'"
                  class="usage-tag"
                >
                  {{ usage }}
                </el-tag>
              </div>

              <el-button 
                type="primary" 
                @click="viewDetail(phone.id)"
                size="small"
                class="detail-btn"
              >
                查看详情
              </el-button>
            </el-card>
          </div>
          <el-empty v-else description="暂无符合条件的手机"></el-empty>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { storeToRefs } from 'pinia'

const router = useRouter()
const phoneStore = usePhoneStore()
const { loading, recommendations } = storeToRefs(phoneStore)
const { preferences, availableBrands } = storeToRefs(phoneStore)

// 切换品牌选择
const toggleBrand = async (brand) => {
  const index = preferences.value.brand.indexOf(brand)
  if (index > -1) {
    preferences.value.brand.splice(index, 1)
  } else {
    preferences.value.brand.push(brand)
  }
  await updatePreferences()
}

// 重置所有筛选条件
const resetFilters = async () => {
  await phoneStore.resetPreferences()
  await phoneStore.generateRecommendations()
}

// 更新用户偏好并重新生成推荐
const updatePreferences = async () => {
  await phoneStore.generateRecommendations()
}

// 查看手机详情
const viewDetail = (id) => {
  router.push(`/detail/${id}`)
}

// 初始化数据
onMounted(async () => {
  await phoneStore.initialize()
  await phoneStore.generateRecommendations()
})
</script>

<style scoped>
.recommend-view {
  padding: 20px;
  min-height: 100vh;
  background: #f0f2f5;
}

.filter-card {
  position: sticky;
  top: 20px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-header h3 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.filter-section {
  margin-bottom: 24px;
}

.filter-section h4 {
  margin: 0 0 12px;
  font-size: 14px;
  color: #606266;
}

.brand-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.brand-tag {
  cursor: pointer;
  user-select: none;
  transition: all 0.3s ease;
}

.brand-tag:hover {
  transform: scale(1.05);
}

.importance-rating .rating-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.importance-rating .rating-row span {
  color: #606266;
  font-size: 14px;
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.recommendation-header h3 {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.phone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.phone-card {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.phone-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.phone-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
}

.phone-card h4 {
  margin: 8px 0;
  font-size: 16px;
  color: #303133;
}

.phone-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

.match-score {
  margin: 12px 0;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: bold;
}

.phone-specs {
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #606266;
}

.phone-ratings {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 12px 0;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

.rating-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.rating-label {
  color: #606266;
  font-size: 14px;
  width: 40px;
}

.usage-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin: 12px 0;
}

.usage-tag {
  margin: 0;
}

.detail-btn {
  width: 100%;
  margin-top: 12px;
}

@media (max-width: 1200px) {
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 576px) {
  .phone-grid {
    grid-template-columns: 1fr;
  }
}
</style>