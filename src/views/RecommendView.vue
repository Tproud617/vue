<template>
  <div class="recommend-view">
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
    
    <el-row :gutter="30">
      <!-- 左侧筛选区域 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5">
        <el-card class="filter-card" shadow="hover">
          <template #header>
            <div class="filter-header">
              <h3><el-icon><filter /></el-icon> 智能筛选</h3>
              <div class="filter-actions">
                <el-tooltip content="保存当前筛选" placement="top">
                  <el-button type="success" @click="saveCurrentFilter" size="small" circle>
                    <el-icon><document-add /></el-icon>
                  </el-button>
                </el-tooltip>
                <el-button type="primary" @click="resetFilters" size="small" class="reset-btn">
                  <el-icon><refresh /></el-icon> 重置
                </el-button>
              </div>
            </div>
          </template>
          
          <!-- 快速筛选预设 -->
          <div class="filter-section" v-if="savedFilters.length > 0 || quickFilters.length > 0">
            <h4><el-icon><magic-stick /></el-icon> 快速筛选</h4>
            <div class="quick-filters">
              <el-button 
                v-for="filter in quickFilters" 
                :key="filter.name"
                size="small" 
                @click="applyQuickFilter(filter)"
                :type="filter.type || 'default'"
                class="quick-filter-btn"
              >
                {{ filter.name }}
              </el-button>
              <el-button 
                v-for="(filter, index) in savedFilters" 
                :key="'saved-'+index"
                size="small"
                @click="applySavedFilter(filter)"
                type="info"
                class="quick-filter-btn saved-filter"
              >
                {{ filter.name }}
                <el-icon class="delete-icon" @click.stop="removeSavedFilter(index)"><delete /></el-icon>
              </el-button>
            </div>
          </div>
          
          <!-- 折叠筛选面板 -->
          <el-collapse v-model="activeCollapse" accordion class="filter-collapse">
            <!-- 品牌筛选 -->
            <el-collapse-item name="brand">
              <template #title>
                <h4 class="collapse-title"><el-icon><apple /></el-icon> 品牌选择</h4>
              </template>
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
            </el-collapse-item>

            <!-- 价格筛选 -->
            <el-collapse-item name="price">
              <template #title>
                <h4 class="collapse-title"><el-icon><money /></el-icon> 价格区间</h4>
              </template>
              <div class="price-range">
                <div class="range-values">
                  <span>¥{{ preferences.budget[0] }}</span>
                  <span>¥{{ preferences.budget[1] }}</span>
                </div>
                <el-slider
                  v-model="preferences.budget"
                  range
                  :min="1000"
                  :max="12000"
                  :step="500"
                  :marks="priceMarks"
                  @change="updatePreferences"
                  class="budget-slider"
                />
                <div class="popular-price-ranges">
                  <el-button size="small" @click="setPrice([1000, 3000])">入门</el-button>
                  <el-button size="small" @click="setPrice([3000, 5000])">中端</el-button>
                  <el-button size="small" @click="setPrice([5000, 8000])">高端</el-button>
                  <el-button size="small" @click="setPrice([8000, 12000])">旗舰</el-button>
                </div>
              </div>
            </el-collapse-item>

            <!-- 重要性评分 -->
            <el-collapse-item name="performance">
              <template #title>
                <h4 class="collapse-title"><el-icon><star /></el-icon> 性能需求</h4>
              </template>
              <div class="importance-rating">
                <div class="rating-row">
                  <span>相机重要性</span>
                  <el-rate v-model="preferences.camera" @change="updatePreferences" class="custom-rate"/>
                </div>
                <div class="rating-row">
                  <span>性能重要性</span>
                  <el-rate v-model="preferences.performance" @change="updatePreferences" class="custom-rate"/>
                </div>
                <div class="rating-row">
                  <span>电池重要性</span>
                  <el-rate v-model="preferences.battery" @change="updatePreferences" class="custom-rate"/>
                </div>
                <div class="rating-row">
                  <span>屏幕重要性</span>
                  <el-rate v-model="preferences.screen" @change="updatePreferences" class="custom-rate"/>
                </div>
              </div>
            </el-collapse-item>

            <!-- 存储和内存 -->
            <el-collapse-item name="storage">
              <template #title>
                <h4 class="collapse-title"><el-icon><folder /></el-icon> 硬件配置</h4>
              </template>
              <div class="spec-filters">
                <div class="spec-filter-item">
                  <span class="spec-label">存储容量</span>
                  <el-select v-model="preferences.storage" placeholder="选择存储容量" @change="updatePreferences" class="custom-select">
                    <el-option label="不限" :value="0" />
                    <el-option label="64GB" :value="64" />
                    <el-option label="128GB" :value="128" />
                    <el-option label="256GB" :value="256" />
                    <el-option label="512GB" :value="512" />
                    <el-option label="1TB" :value="1024" />
                  </el-select>
                </div>
                
                <div class="spec-filter-item">
                  <span class="spec-label">运行内存</span>
                  <el-select v-model="preferences.ram" placeholder="选择运行内存" @change="updatePreferences" class="custom-select">
                    <el-option label="不限" :value="0" />
                    <el-option label="4GB" :value="4" />
                    <el-option label="6GB" :value="6" />
                    <el-option label="8GB" :value="8" />
                    <el-option label="12GB" :value="12" />
                    <el-option label="16GB" :value="16" />
                  </el-select>
                </div>
                
                <div class="spec-filter-item">
                  <span class="spec-label">屏幕尺寸</span>
                  <el-select v-model="preferences.screenSize" placeholder="选择屏幕尺寸" @change="updatePreferences" class="custom-select">
                    <el-option label="不限" :value="0" />
                    <el-option label="小屏 (≤6.1英寸)" :value="'small'" />
                    <el-option label="中屏 (6.1-6.5英寸)" :value="'medium'" />
                    <el-option label="大屏 (>6.5英寸)" :value="'large'" />
                  </el-select>
                </div>
              </div>
            </el-collapse-item>

            <!-- 使用场景 -->
            <el-collapse-item name="usage">
              <template #title>
                <h4 class="collapse-title"><el-icon><connection /></el-icon> 使用场景</h4>
              </template>
              <div class="usage-filters">
                <el-checkbox-group v-model="preferences.usage" @change="updatePreferences" class="usage-checkbox-group">
                  <el-checkbox label="游戏">游戏玩家</el-checkbox>
                  <el-checkbox label="拍照">摄影爱好者</el-checkbox>
                  <el-checkbox label="社交">社交达人</el-checkbox>
                  <el-checkbox label="办公">商务办公</el-checkbox>
                  <el-checkbox label="影音">影音娱乐</el-checkbox>
                  <el-checkbox label="学生">学生党</el-checkbox>
                </el-checkbox-group>
              </div>
            </el-collapse-item>
            
            <!-- 高级筛选 -->
            <el-collapse-item name="advanced">
              <template #title>
                <h4 class="collapse-title"><el-icon><setting /></el-icon> 高级选项</h4>
              </template>
              <div class="advanced-filters">
                <div class="spec-filter-item">
                  <el-checkbox v-model="preferences.hasNFC" @change="updatePreferences">支持 NFC</el-checkbox>
                </div>
                <div class="spec-filter-item">
                  <el-checkbox v-model="preferences.has5G" @change="updatePreferences">支持 5G</el-checkbox>
                </div>
                <div class="spec-filter-item">
                  <el-checkbox v-model="preferences.hasWirelessCharge" @change="updatePreferences">无线充电</el-checkbox>
                </div>
                <div class="spec-filter-item">
                  <el-checkbox v-model="preferences.waterproof" @change="updatePreferences">防水防尘</el-checkbox>
                </div>
                
                <div class="spec-filter-item mt-10">
                  <span class="spec-label">系统偏好</span>
                  <el-radio-group v-model="preferences.os" @change="updatePreferences" class="os-radio-group">
                    <el-radio label="">不限</el-radio>
                    <el-radio label="Android">安卓</el-radio>
                    <el-radio label="iOS">iOS</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>

      <!-- 右侧推荐结果 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card shadow="hover" v-loading="loading" class="results-card">
          <template #header>
            <div class="recommendation-header">
              <h3><el-icon><magic-stick /></el-icon> 推荐手机</h3>
              <el-tag type="info" effect="dark" class="result-count">找到 {{ recommendations.length }} 款手机</el-tag>
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
              <div class="phone-card-inner">
                <div class="phone-image-container">
              <img :src="phone.image" :alt="phone.name" class="phone-image">
                  <div class="match-badge" :class="getMatchClass(phone.matchScore)">
                    {{ Math.min(100, Math.round((phone.matchScore / 25) * 100)) }}%
                  </div>
                  <button 
                    class="favorite-btn" 
                    :class="{'is-favorite': isInFavoriteList(phone.id)}"
                    @click="(e) => toggleFavorite(e, phone.id)"
                    title="收藏"
                  >
                    <el-icon><star /></el-icon>
                  </button>
                </div>
                <h4 class="phone-title">{{ phone.name }}</h4>
              <div class="phone-info">
                  <el-tag size="small" effect="dark" type="success" class="brand-badge">{{ phone.brand }}</el-tag>
                <span class="price">¥{{ phone.price.toLocaleString() }}</span>
              </div>

              <!-- 匹配分数 -->
              <div class="match-score">
                <el-progress 
                  :percentage="Math.min(100, (phone.matchScore / 25) * 100)"
                  :format="format => `匹配度: ${format}%`"
                    :status="getMatchStatus(phone.matchScore)"
                    :stroke-width="10"
                    class="match-progress"
                />
              </div>

              <!-- 手机参数 -->
              <div class="phone-specs">
                <div class="spec-item">
                    <el-tooltip content="存储容量" placement="top" effect="light">
                      <i class="el-icon spec-icon">💾</i>
                    <span>{{ phone.storage }}GB</span>
                  </el-tooltip>
                </div>
                <div class="spec-item">
                    <el-tooltip content="屏幕尺寸" placement="top" effect="light">
                      <i class="el-icon spec-icon">📱</i>
                    <span>{{ phone.screen }}"</span>
                  </el-tooltip>
                </div>
              </div>

              <div class="phone-ratings">
                <div class="rating-item">
                  <span class="rating-label">相机</span>
                    <el-rate v-model="phone.camera" disabled size="small" class="custom-rate"/>
                </div>
                <div class="rating-item">
                  <span class="rating-label">性能</span>
                    <el-rate v-model="phone.performance" disabled size="small" class="custom-rate"/>
                </div>
                <div class="rating-item">
                  <span class="rating-label">电池</span>
                    <el-rate v-model="phone.battery" disabled size="small" class="custom-rate"/>
                </div>
              </div>

              <!-- 使用场景标签 -->
              <div class="usage-tags">
                <el-tag 
                  v-for="usage in phone.usage" 
                  :key="usage"
                  size="small"
                  :type="preferences.usage.includes(usage) ? 'warning' : 'info'"
                    effect="plain"
                  class="usage-tag"
                >
                  {{ usage }}
                </el-tag>
              </div>

              <el-button 
                type="primary" 
                @click="viewDetail(phone.id)"
                size="default"
                class="detail-btn"
              >
                <el-icon><view /></el-icon> 查看详情
              </el-button>
              </div>
            </el-card>
          </div>
          <el-empty v-else description="暂无符合条件的手机" :image-size="200"></el-empty>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { storeToRefs } from 'pinia'
import { Filter, Refresh, Apple, Money, Star, Folder, Connection, MagicStick, View, DocumentAdd, Delete, Setting } from '@element-plus/icons-vue'
import { Star as StarIcon } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const phoneStore = usePhoneStore()
const { loading, recommendations } = storeToRefs(phoneStore)
const { preferences, availableBrands } = storeToRefs(phoneStore)

// 筛选面板状态
const activeCollapse = ref(['brand', 'price'])

// 价格区间标记
const priceMarks = {
  1000: '1K',
  5000: '5K',
  8000: '8K',
  12000: '12K'
}

// 快速筛选预设
const quickFilters = ref([
  { name: '性价比之选', type: 'success', filter: { budget: [2000, 4000], performance: 4, camera: 3, battery: 4 } },
  { name: '拍照旗舰', type: 'danger', filter: { budget: [4000, 12000], camera: 5, usage: ['拍照'] } },
  { name: '游戏性能', type: 'warning', filter: { performance: 5, ram: 8, usage: ['游戏'] } },
  { name: '轻薄便携', type: 'info', filter: { screenSize: 'small', battery: 3 } }
])

// 用户保存的筛选条件
const savedFilters = ref([])

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

// 设置价格区间
const setPrice = (range) => {
  preferences.value.budget = range
  updatePreferences()
}

// 应用快速筛选
const applyQuickFilter = (filter) => {
  // 合并筛选条件
  const newPreferences = { ...preferences.value, ...filter.filter }
  // 应用新的筛选条件
  Object.keys(newPreferences).forEach(key => {
    preferences.value[key] = newPreferences[key]
  })
  updatePreferences()
  ElMessage.success(`已应用"${filter.name}"筛选`)
}

// 保存当前筛选条件
const saveCurrentFilter = async () => {
  try {
    const { value: filterName } = await ElMessageBox.prompt(
      '请输入筛选名称',
      '保存筛选',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValidator: (value) => {
          if (!value) {
            return '筛选名称不能为空'
          }
          return true
        }
      }
    )
    
    if (filterName) {
      const newFilter = {
        name: filterName,
        filter: JSON.parse(JSON.stringify(preferences.value))
      }
      savedFilters.value.push(newFilter)
      // 保存到本地存储
      localStorage.setItem('savedFilters', JSON.stringify(savedFilters.value))
      ElMessage.success('筛选条件已保存')
    }
  } catch (error) {
    // 用户取消输入
  }
}

// 应用保存的筛选条件
const applySavedFilter = (filter) => {
  // 应用保存的筛选条件
  Object.keys(filter.filter).forEach(key => {
    preferences.value[key] = filter.filter[key]
  })
  updatePreferences()
  ElMessage.success(`已应用"${filter.name}"筛选`)
}

// 删除保存的筛选条件
const removeSavedFilter = (index) => {
  savedFilters.value.splice(index, 1)
  // 更新本地存储
  localStorage.setItem('savedFilters', JSON.stringify(savedFilters.value))
  ElMessage.success('已删除筛选条件')
}

// 重置所有筛选条件
const resetFilters = async () => {
  await phoneStore.reset()
  await phoneStore.generateRecommendations()
  ElMessage.success('已重置所有筛选条件')
}

// 更新用户偏好并重新生成推荐
const updatePreferences = async () => {
  await phoneStore.generateRecommendations()
}

// 查看手机详情
const viewDetail = (id) => {
  console.log('跳转到详情页，ID:', id)
  // 简化路由导航，直接使用路径方式
  router.push(`/detail/${id}`)
}

// 获取匹配状态
const getMatchStatus = (score) => {
  const percentage = (score / 25) * 100
  if (percentage >= 80) return 'success'
  if (percentage >= 60) return 'warning'
  return 'exception'
}

// 获取匹配徽章样式
const getMatchClass = (score) => {
  const percentage = (score / 25) * 100
  if (percentage >= 80) return 'match-excellent'
  if (percentage >= 60) return 'match-good'
  return 'match-fair'
}

// Check if a phone is in the favorite list
const isInFavoriteList = (phoneId) => {
  return phoneStore.favoriteList.includes(phoneId)
}

// Toggle a phone's favorite status
const toggleFavorite = (event, phoneId) => {
  event.stopPropagation() // Prevent card click event
  
  if (phoneStore.toggleFavorite(phoneId)) {
    if (isInFavoriteList(phoneId)) {
      ElMessage.success('已添加到收藏')
    } else {
      ElMessage.success('已从收藏中移除')
    }
  }
}

// 跳转到推荐页面
const goToRecommend = () => {
  router.push('/recommend')
}

// 跳转到收藏页面
const goToFavorite = () => {
  router.push('/favorite')
}

// 初始化数据
onMounted(async () => {
  // 加载保存的筛选条件
  const saved = localStorage.getItem('savedFilters')
  if (saved) {
    savedFilters.value = JSON.parse(saved)
  }
  
  // 初始化数据
  await phoneStore.initialize()
  await phoneStore.generateRecommendations()
})
</script>

<style scoped>
.recommend-view {
  padding: 30px;
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

.filter-card {
  position: sticky;
  top: 20px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 2;
}

.filter-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.filter-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-collapse {
  --el-collapse-header-height: auto;
  --el-collapse-header-bg-color: transparent;
  --el-collapse-header-text-color: #303133;
  --el-collapse-content-bg-color: transparent;
  --el-collapse-border-color: rgba(0, 0, 0, 0.05);
}

.collapse-title {
  margin: 0;
  font-size: 16px;
  color: #409EFF;
  display: flex;
  align-items: center;
  gap: 8px;
}

.quick-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.quick-filter-btn {
  margin: 0;
  flex-grow: 1;
  min-width: calc(50% - 8px);
}

.saved-filter {
  position: relative;
  padding-right: 24px;
}

.delete-icon {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  opacity: 0.7;
  transition: all 0.3s;
}

.delete-icon:hover {
  opacity: 1;
  color: #f56c6c;
}

.price-range {
  padding: 5px 0;
}

.range-values {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 500;
  color: #f56c6c;
}

.popular-price-ranges {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  flex-wrap: wrap;
  gap: 8px;
}

.popular-price-ranges .el-button {
  flex: 1;
  min-width: calc(25% - 6px);
  margin: 0;
}

.spec-filters {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.spec-filter-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.spec-label {
  font-size: 14px;
  color: #606266;
  margin-bottom: 5px;
}

.usage-checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.advanced-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.os-radio-group {
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.mt-10 {
  margin-top: 10px;
}

.results-card {
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.recommendation-header h3 {
  margin: 0;
  font-size: 20px;
  color: #303133;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-count {
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
}

.phone-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 20px;
}

.phone-card {
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: none;
  overflow: hidden;
  background: transparent;
  perspective: 1000px;
}

.phone-card-inner {
  background: white;
  border-radius: 16px;
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.phone-card:hover {
  transform: translateY(-10px) scale(1.02);
  z-index: 2;
}

.phone-card:hover .phone-card-inner {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.phone-image-container {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: #f8f9fa;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-image {
  width: 80%;
  height: 90%;
  object-fit: contain;
  transition: all 0.5s ease;
}

.phone-card:hover .phone-image {
  transform: scale(1.1);
}

.match-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.match-excellent {
  background: linear-gradient(145deg, #42b983, #36a777);
}

.match-good {
  background: linear-gradient(145deg, #e6a23c, #d48f23);
}

.match-fair {
  background: linear-gradient(145deg, #f56c6c, #e45555);
}

.phone-title {
  margin: 15px 0 8px;
  font-size: 16px;
  color: #303133;
  font-weight: 600;
  height: 40px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.phone-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.brand-badge {
  padding: 4px 8px;
  border-radius: 6px;
}

.match-score {
  margin: 15px 0;
}

.match-progress {
  --el-progress-border-radius: 10px;
}

.price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 700;
}

.phone-specs {
  display: flex;
  justify-content: space-around;
  margin: 12px 0;
  padding: 10px;
  background: rgba(64, 158, 255, 0.1);
  border-radius: 10px;
}

.spec-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #409EFF;
  font-weight: 500;
}

.spec-icon {
  font-size: 16px;
}

.phone-ratings {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 15px 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 10px;
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
  font-weight: 500;
}

.usage-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
  min-height: 50px;
}

.usage-tag {
  margin: 0;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.usage-tag:hover {
  transform: translateY(-2px);
}

.detail-btn {
  width: 100%;
  margin-top: auto;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.detail-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3);
}

.favorite-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 2;
  opacity: 0.7;
}

.favorite-btn:hover {
  transform: scale(1.1);
  opacity: 1;
  background: white;
}

.favorite-btn.is-favorite {
  background: #f56c6c;
  color: white;
  opacity: 1;
}

.favorite-btn.is-favorite:hover {
  background: #e64242;
}

.favorite-btn .el-icon {
  font-size: 18px;
  transition: all 0.3s ease;
}

.favorite-btn:hover .el-icon {
  transform: scale(1.2);
}

@media (max-width: 1200px) {
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .recommend-view {
    padding: 20px;
  }
  
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
  
  .filter-card {
    margin-bottom: 20px;
    position: static;
  }
}

@media (max-width: 576px) {
  .phone-grid {
    grid-template-columns: 1fr;
  }
  
  .phone-image-container {
    height: 180px;
  }
}
</style>