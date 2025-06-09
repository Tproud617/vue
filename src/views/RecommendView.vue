<!-- 推荐页面组件 - 根据用户偏好筛选并推荐手机 -->
<template>
  <div class="recommend-view">
    <!-- 背景渐变效果 -->
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>
    
    <el-row :gutter="30">
      <!-- 左侧筛选区域 - 用户可设置筛选条件 -->
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
          
          <!-- 快速筛选预设 - 提供常用筛选条件组合 -->
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
          
          <!-- 折叠筛选面板 - 详细筛选选项 -->
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

            <!-- 价格筛选 - 通过滑块设置价格范围 -->
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

            <!-- 重要性评分 - 设置各项性能的重要程度 -->
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

            <!-- 存储和内存 - 硬件配置筛选 -->
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

            <!-- 使用场景 - 按照用途筛选 -->
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
            
            <!-- 高级筛选 - 额外的功能特性筛选 -->
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

      <!-- 右侧推荐结果 - 展示符合条件的手机 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="19">
        <el-card shadow="hover" v-loading="loading" class="results-card">
          <template #header>
            <div class="recommendation-header">
              <h3><el-icon><magic-stick /></el-icon> 推荐手机</h3>
              <el-tag type="info" effect="dark" class="result-count">找到 {{ recommendations.length }} 款手机</el-tag>
            </div>
          </template>

          <!-- 手机列表 - 网格布局展示推荐手机 -->
          <div v-if="recommendations.length > 0" class="phone-grid">
            <el-card 
              v-for="phone in recommendations" 
              :key="phone.id"
              class="phone-card"
              shadow="hover"
            >
              <div class="phone-card-inner">
                <!-- 手机图片区域 -->
                <div class="phone-image-container">
                  <img :src="phone.image" :alt="phone.name" class="phone-image">
                  <!-- 匹配程度标识 -->
                  <div class="match-badge" :class="getMatchClass(phone.matchScore)">
                    {{ Math.min(100, Math.round((phone.matchScore / 25) * 100)) }}%
                  </div>
                  <!-- 收藏按钮 -->
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

                <!-- 匹配分数进度条 -->
                <div class="match-score">
                  <el-progress 
                    :percentage="Math.min(100, (phone.matchScore / 25) * 100)"
                    :format="format => `匹配度: ${format}%`"
                    :status="getMatchStatus(phone.matchScore)"
                    :stroke-width="10"
                    class="match-progress"
                  />
                </div>

                <!-- 手机基本参数展示 -->
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

                <!-- 性能评分展示 -->
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

                <!-- 查看详情按钮 -->
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
          <!-- 无结果提示 -->
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

// 筛选面板状态 - 控制折叠面板的展开状态
const activeCollapse = ref(['brand', 'price'])

// 价格区间标记 - 滑块上的刻度标记
const priceMarks = {
  1000: '1K',
  5000: '5K',
  8000: '8K',
  12000: '12K'
}

// 快速筛选预设 - 提供常用的筛选组合
const quickFilters = ref([
  { name: '性价比之选', type: 'success', filter: { budget: [2000, 4000], performance: 4, camera: 3, battery: 4 } },
  { name: '拍照旗舰', type: 'danger', filter: { budget: [4000, 12000], camera: 5, usage: ['拍照'] } },
  { name: '游戏性能', type: 'warning', filter: { performance: 5, ram: 8, usage: ['游戏'] } },
  { name: '轻薄便携', type: 'info', filter: { screenSize: 'small', battery: 3 } }
])

// 用户保存的筛选条件 - 存储用户自定义的筛选组合
const savedFilters = ref([])

// 切换品牌选择 - 添加或移除所选品牌
const toggleBrand = async (brand) => {
  const index = preferences.value.brand.indexOf(brand)
  if (index > -1) {
    preferences.value.brand.splice(index, 1)
  } else {
    preferences.value.brand.push(brand)
  }
  await updatePreferences()
}

// 设置价格区间 - 应用预设价格范围
const setPrice = (range) => {
  preferences.value.budget = range
  updatePreferences()
}

// 应用快速筛选 - 使用预设的筛选条件
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

// 保存当前筛选条件 - 将当前设置保存为自定义筛选
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

// 应用保存的筛选条件 - 使用之前保存的设置
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

// 重置所有筛选条件 - 恢复默认设置
const resetFilters = async () => {
  await phoneStore.reset()
  await phoneStore.generateRecommendations()
  ElMessage.success('已重置所有筛选条件')
}

// 更新用户偏好并重新生成推荐 - 当筛选条件变化时调用
const updatePreferences = async () => {
  await phoneStore.generateRecommendations()
}

// 查看手机详情 - 跳转到详情页
const viewDetail = (id) => {
  console.log('跳转到详情页，ID:', id)
  // 简化路由导航，直接使用路径方式
  router.push(`/detail/${id}`)
}

// 获取匹配状态 - 根据匹配分数返回状态样式
const getMatchStatus = (score) => {
  const percentage = (score / 25) * 100
  if (percentage >= 80) return 'success'
  if (percentage >= 60) return 'warning'
  return 'exception'
}

// 获取匹配徽章样式 - 根据匹配分数返回徽章样式
const getMatchClass = (score) => {
  const percentage = (score / 25) * 100
  if (percentage >= 80) return 'match-excellent'
  if (percentage >= 60) return 'match-good'
  return 'match-fair'
}

// 检查手机是否在收藏列表中
const isInFavoriteList = (phoneId) => {
  return phoneStore.favoriteList.includes(phoneId)
}

// 切换手机收藏状态 - 添加或移除收藏
const toggleFavorite = (event, phoneId) => {
  event.stopPropagation() // 防止卡片点击事件传播
  
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

// 初始化数据 - 组件挂载时执行
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
/* 推荐视图容器 - 设置基本布局和背景渐变效果 */
.recommend-view {
  padding: 30px; /* 内边距，确保内容不会贴近边缘 */
  min-height: 100vh; /* 最小高度为视口高度，确保占满整个屏幕 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); /* 渐变背景，从左上角到右下角 */
  position: relative; /* 相对定位，作为子元素的定位参考 */
  overflow: hidden; /* 隐藏超出容器的内容 */
}

/* 背景渐变球效果 - 共同样式设置 */
.bg-gradient-1,
.bg-gradient-2 {
  position: absolute; /* 绝对定位，相对于父容器 */
  border-radius: 50%; /* 圆形边框 */
  filter: blur(80px); /* 高斯模糊效果，创建柔和的边缘 */
  z-index: 0; /* 层级设置，确保在内容后面 */
  opacity: 0.5; /* 半透明效果 */
}

/* 第一个背景渐变球 - 绿色调 */
.bg-gradient-1 {
  background: radial-gradient(circle, rgba(66, 185, 131, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 径向渐变，从中心向外扩散 */
  width: 60vw; /* 宽度为视口宽度的60% */
  height: 60vw; /* 高度为视口宽度的60% */
  top: -20vw; /* 顶部偏移，部分在视口外 */
  right: -20vw; /* 右侧偏移，部分在视口外 */
  animation: float-1 15s ease-in-out infinite alternate; /* 应用浮动动画，无限循环交替 */
}

/* 第二个背景渐变球 - 蓝色调 */
.bg-gradient-2 {
  background: radial-gradient(circle, rgba(91, 143, 249, 0.3) 0%, rgba(255, 255, 255, 0) 70%); /* 径向渐变，从中心向外扩散 */
  width: 70vw; /* 宽度为视口宽度的70% */
  height: 70vw; /* 高度为视口宽度的70% */
  bottom: -30vw; /* 底部偏移，部分在视口外 */
  left: -20vw; /* 左侧偏移，部分在视口外 */
  animation: float-2 20s ease-in-out infinite alternate; /* 应用浮动动画，无限循环交替 */
}

/* 第一个背景渐变球的浮动动画 */
@keyframes float-1 {
  0% {
    transform: translate(0, 0); /* 起始位置 */
  }
  100% {
    transform: translate(-5vw, 5vw); /* 结束位置，向左上方移动 */
  }
}

/* 第二个背景渐变球的浮动动画 */
@keyframes float-2 {
  0% {
    transform: translate(0, 0); /* 起始位置 */
  }
  100% {
    transform: translate(5vw, -5vw); /* 结束位置，向右下方移动 */
  }
}

/* 筛选卡片 - 左侧筛选条件面板 */
.filter-card {
  position: sticky; /* 粘性定位，滚动时保持可见 */
  top: 20px; /* 距离顶部的距离 */
  border-radius: 16px; /* 圆角边框 */
  background-color: rgba(255, 255, 255, 0.95); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 背景模糊效果，增强玻璃质感 */
  border: none; /* 移除边框 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* 阴影效果，增强立体感 */
  transition: all 0.3s ease; /* 平滑过渡动画 */
  overflow: hidden; /* 隐藏超出部分 */
  z-index: 2; /* 层级设置，确保在背景之上 */
}

/* 筛选卡片悬停效果 */
.filter-card:hover {
  transform: translateY(-5px); /* 向上浮动效果 */
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15); /* 更强的阴影效果 */
}

/* 筛选卡片头部 - 标题和操作按钮区域 */
.filter-header {
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中 */
  padding: 10px 0; /* 上下内边距 */
}

/* 筛选卡片标题样式 */
.filter-header h3 {
  margin: 0; /* 移除外边距 */
  font-size: 18px; /* 字体大小 */
  color: #303133; /* 字体颜色 */
  display: flex; /* 弹性布局，用于图标和文字对齐 */
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 元素之间的间距 */
}

/* 筛选操作按钮区域 */
.filter-actions {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 按钮之间的间距 */
}

/* 筛选折叠面板 - 自定义Element Plus组件样式 */
.filter-collapse {
  --el-collapse-header-height: auto; /* 自定义头部高度 */
  --el-collapse-header-bg-color: transparent; /* 透明背景 */
  --el-collapse-header-text-color: #303133; /* 文字颜色 */
  --el-collapse-content-bg-color: transparent; /* 内容区透明背景 */
  --el-collapse-border-color: rgba(0, 0, 0, 0.05); /* 淡化边框颜色 */
}

/* 折叠面板标题样式 */
.collapse-title {
  margin: 0; /* 移除外边距 */
  font-size: 16px; /* 字体大小 */
  color: #409EFF; /* 主题蓝色 */
  display: flex; /* 弹性布局，用于图标和文字对齐 */
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 元素之间的间距 */
}

/* 快速筛选按钮组 */
.quick-filters {
  display: flex; /* 弹性布局 */
  flex-wrap: wrap; /* 允许换行 */
  gap: 8px; /* 按钮之间的间距 */
  margin-bottom: 10px; /* 底部外边距 */
}

/* 快速筛选按钮样式 */
.quick-filter-btn {
  margin: 0; /* 移除外边距 */
  flex-grow: 1; /* 允许按钮伸展填充空间 */
  min-width: calc(50% - 8px); /* 最小宽度，确保一行最多两个按钮 */
}

/* 已保存的筛选条件按钮样式 */
.saved-filter {
  position: relative; /* 相对定位，用于删除图标定位 */
  padding-right: 24px; /* 右侧留出删除图标的空间 */
}

/* 删除筛选条件图标 */
.delete-icon {
  position: absolute; /* 绝对定位 */
  right: 5px; /* 右侧距离 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 精确垂直居中定位 */
  font-size: 12px; /* 图标大小 */
  opacity: 0.7; /* 默认半透明 */
  transition: all 0.3s; /* 过渡动画 */
}

/* 删除图标悬停效果 */
.delete-icon:hover {
  opacity: 1; /* 完全不透明 */
  color: #f56c6c; /* 警告红色 */
}

/* 价格区间控制器区域 */
.price-range {
  padding: 10px 0 20px; /* 内边距 */
  margin-bottom: 10px; /* 底部外边距 */
  position: relative; /* 相对定位 */
}

/* 价格范围显示容器 */
.range-values {
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  margin-bottom: 24px; /* 底部外边距 */
  font-weight: 500; /* 中等字体粗细 */
  color: #f56c6c; /* 价格红色 */
  padding: 0 8px 0 20px; /* 内边距 */
  position: relative; /* 相对定位 */
}

/* 价格范围最小值样式 */
.range-values span:first-child {
  text-align: left; /* 左对齐 */
}

/* 价格范围最大值样式 */
.range-values span:last-child {
  text-align: right; /* 右对齐 */
  padding-right: 18px; /* 右侧内边距 */
  position: absolute; /* 绝对定位 */
  right: 8px; /* 右侧距离 */
}

/* 价格滑块容器 */
.budget-slider {
  margin: 30px 0 24px; /* 外边距 */
  padding: 0; /* 移除内边距 */
  width: 96%; /* 宽度略小于父容器 */
  margin-left: 2%; /* 左侧外边距，居中对齐 */
}

/* 价格滑块轨道样式 */
.budget-slider :deep(.el-slider__runway) {
  margin: 20px 0; /* 上下外边距 */
  height: 6px; /* 轨道高度 */
  width: 100%; /* 轨道宽度 */
}

/* 价格滑块已选择部分样式 */
.budget-slider :deep(.el-slider__bar) {
  height: 6px; /* 高度与轨道一致 */
}

/* 价格滑块手柄样式 */
.budget-slider :deep(.el-slider__button) {
  width: 20px; /* 手柄宽度 */
  height: 20px; /* 手柄高度 */
  border: 2px solid #42b983; /* 绿色边框 */
}

/* 价格滑块手柄包装器样式 */
.budget-slider :deep(.el-slider__button-wrapper) {
  top: -20px; /* 顶部位置调整 */
  height: 40px; /* 高度 */
  width: 40px; /* 宽度 */
  z-index: 2; /* 层级 */
}

/* 价格滑块刻度标记样式 */
.budget-slider :deep(.el-slider__marks) {
  top: 16px; /* 顶部位置 */
  width: 100%; /* 宽度 */
  left: 0; /* 左侧位置 */
}

/* 价格滑块刻度文本样式 */
.budget-slider :deep(.el-slider__marks-text) {
  margin-top: 16px; /* 顶部外边距 */
  color: #606266; /* 文本颜色 */
}

/* 价格快捷选择按钮组 */
.popular-price-ranges {
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 均匀分布 */
  margin-top: 25px; /* 顶部外边距 */
  flex-wrap: wrap; /* 允许换行 */
  gap: 8px; /* 按钮间距 */
}

/* 价格快捷选择按钮 */
.popular-price-ranges .el-button {
  flex: 1; /* 均等分配空间 */
  min-width: calc(25% - 6px); /* 设置最小宽度，确保每行最多四个按钮 */
  margin: 0; /* 移除外边距 */
}

/* 规格筛选区域容器 */
.spec-filters {
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  gap: 15px; /* 项目间距 */
}

/* 规格筛选项 */
.spec-filter-item {
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  gap: 5px; /* 内部元素间距 */
}

/* 规格标签文字 */
.spec-label {
  font-size: 14px; /* 字体大小 */
  color: #606266; /* 文字颜色 */
  margin-bottom: 5px; /* 底部外边距 */
}

/* 使用场景复选框组 */
.usage-checkbox-group {
  display: grid; /* 网格布局 */
  grid-template-columns: repeat(2, 1fr); /* 两列等宽 */
  gap: 10px; /* 项目间距 */
}

/* 高级筛选选项容器 */
.advanced-filters {
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  gap: 10px; /* 选项间距 */
}

/* 操作系统选择单选按钮组 */
.os-radio-group {
  margin-top: 5px; /* 顶部外边距 */
  width: 100%; /* 宽度占满 */
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 均匀分布 */
}

/* 顶部外边距10px的工具类 */
.mt-10 {
  margin-top: 10px; /* 顶部外边距 */
}

/* 结果展示卡片 - 右侧推荐结果区域 */
.results-card {
  border-radius: 16px; /* 圆角边框 */
  background-color: rgba(255, 255, 255, 0.95); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  border: none; /* 移除边框 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  transition: all 0.3s ease; /* 平滑过渡动画 */
  overflow: hidden; /* 隐藏溢出内容 */
  z-index: 1; /* 层级设置 */
}

/* 推荐结果标题栏 */
.recommendation-header {
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中 */
  padding: 10px 0; /* 上下内边距 */
}

/* 推荐结果标题文本 */
.recommendation-header h3 {
  margin: 0; /* 移除外边距 */
  font-size: 20px; /* 字体大小 */
  color: #303133; /* 字体颜色 */
  font-weight: 600; /* 字体粗细 */
  display: flex; /* 弹性布局，用于图标和文字对齐 */
  align-items: center; /* 垂直居中 */
  gap: 8px; /* 元素间距 */
}

/* 结果数量标签 */
.result-count {
  font-size: 14px; /* 字体大小 */
  padding: 6px 12px; /* 内边距 */
  border-radius: 20px; /* 圆角效果 */
}

/* 手机卡片网格布局 */
.phone-grid {
  display: grid; /* 网格布局 */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* 自适应列数和宽度 */
  gap: 25px; /* 网格间距 */
  margin-top: 20px; /* 顶部外边距 */
}

/* 手机卡片容器 */
.phone-card {
  border-radius: 16px; /* 圆角效果 */
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* 平滑过渡动画，带弹性效果 */
  border: none; /* 移除边框 */
  overflow: hidden; /* 隐藏溢出内容 */
  background: transparent; /* 透明背景 */
  perspective: 1000px; /* 3D透视效果 */
}

/* 手机卡片内部容器 */
.phone-card-inner {
  background: white; /* 白色背景 */
  border-radius: 16px; /* 圆角效果 */
  padding: 15px; /* 内边距 */
  height: 100%; /* 高度占满父容器 */
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  transition: all 0.3s ease; /* 平滑过渡动画 */
  transform-style: preserve-3d; /* 保持3D变换风格 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05); /* 阴影效果 */
}

/* 手机卡片悬停效果 */
.phone-card:hover {
  transform: translateY(-10px) scale(1.02); /* 上移并略微放大 */
  z-index: 2; /* 提高层级，避免被其他卡片覆盖 */
}

/* 手机卡片悬停时内部容器效果 */
.phone-card:hover .phone-card-inner {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1); /* 加深阴影效果 */
}

/* 手机图片容器 */
.phone-image-container {
  position: relative; /* 相对定位，作为子元素定位参考 */
  overflow: hidden; /* 隐藏溢出内容 */
  border-radius: 12px; /* 圆角效果 */
  background: #f8f9fa; /* 浅灰色背景 */
  height: 200px; /* 固定高度 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
}

/* 手机图片样式 */
.phone-image {
  width: 80%; /* 宽度为容器的80% */
  height: 90%; /* 高度为容器的90% */
  object-fit: contain; /* 保持图片比例，完整显示 */
  transition: all 0.5s ease; /* 平滑过渡动画 */
}

/* 手机卡片悬停时图片效果 */
.phone-card:hover .phone-image {
  transform: scale(1.1); /* 图片放大效果 */
}

/* 匹配度徽章 */
.match-badge {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 距顶部距离 */
  right: 10px; /* 距右侧距离 */
  width: 42px; /* 固定宽度 */
  height: 42px; /* 固定高度 */
  border-radius: 50%; /* 圆形效果 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  font-weight: bold; /* 字体加粗 */
  font-size: 14px; /* 字体大小 */
  color: white; /* 白色文字 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
}

/* 匹配度优秀标识 - 绿色 */
.match-excellent {
  background: linear-gradient(145deg, #42b983, #36a777); /* 绿色渐变背景 */
}

/* 匹配度良好标识 - 黄色 */
.match-good {
  background: linear-gradient(145deg, #e6a23c, #d48f23); /* 黄色渐变背景 */
}

/* 匹配度一般标识 - 红色 */
.match-fair {
  background: linear-gradient(145deg, #f56c6c, #e45555); /* 红色渐变背景 */
}

/* 手机标题样式 */
.phone-title {
  margin: 15px 0 8px; /* 外边距 */
  font-size: 16px; /* 字体大小 */
  color: #303133; /* 字体颜色 */
  font-weight: 600; /* 字体粗细 */
  height: 40px; /* 固定高度 */
  display: -webkit-box; /* 特殊显示方式，用于多行文本截断 */
  -webkit-line-clamp: 2; /* 最多显示2行 */
  -webkit-box-orient: vertical; /* 垂直方向 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 文本溢出显示省略号 */
}

/* 手机基本信息区域 */
.phone-info {
  display: flex; /* 弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中 */
  margin: 10px 0; /* 上下外边距 */
}

/* 品牌标签样式 */
.brand-badge {
  padding: 4px 8px; /* 内边距 */
  border-radius: 6px; /* 圆角效果 */
}

/* 匹配分数区域 */
.match-score {
  margin: 15px 0; /* 上下外边距 */
}

/* 匹配进度条样式 */
.match-progress {
  --el-progress-border-radius: 10px; /* 自定义进度条圆角 */
}

/* 价格标签样式 */
.price {
  color: #f56c6c; /* 价格红色 */
  font-size: 18px; /* 字体大小 */
  font-weight: 700; /* 粗体 */
}

/* 手机规格展示区域 */
.phone-specs {
  display: flex; /* 弹性布局 */
  justify-content: space-around; /* 均匀分布 */
  margin: 12px 0; /* 上下外边距 */
  padding: 10px; /* 内边距 */
  background: rgba(64, 158, 255, 0.1); /* 浅蓝色背景 */
  border-radius: 10px; /* 圆角效果 */
}

/* 规格项样式 */
.spec-item {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  gap: 6px; /* 元素间距 */
  color: #409EFF; /* 蓝色文字 */
  font-weight: 500; /* 字体粗细 */
}

/* 规格图标样式 */
.spec-icon {
  font-size: 16px; /* 图标大小 */
}

/* 手机评分展示区域 */
.phone-ratings {
  display: flex; /* 弹性布局 */
  flex-direction: column; /* 纵向排列 */
  gap: 8px; /* 项目间距 */
  margin: 15px 0; /* 上下外边距 */
  padding: 12px; /* 内边距 */
  background: rgba(0, 0, 0, 0.02); /* 浅灰背景色 */
  border-radius: 10px; /* 圆角效果 */
}

/* 评分项目样式 */
.rating-item {
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 两端对齐 */
}

/* 评分标签样式 */
.rating-label {
  color: #606266; /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
  width: 40px; /* 固定宽度 */
  font-weight: 500; /* 字体粗细 */
}

/* 使用场景标签容器 */
.usage-tags {
  display: flex; /* 弹性布局 */
  flex-wrap: wrap; /* 允许换行 */
  gap: 6px; /* 标签间距 */
  margin: 12px 0; /* 上下外边距 */
  min-height: 50px; /* 最小高度 */
}

/* 使用场景标签样式 */
.usage-tag {
  margin: 0; /* 移除外边距 */
  border-radius: 6px; /* 圆角效果 */
  transition: all 0.3s ease; /* 过渡动画 */
}

/* 使用场景标签悬停效果 */
.usage-tag:hover {
  transform: translateY(-2px); /* 上浮效果 */
}

/* 查看详情按钮 */
.detail-btn {
  width: 100%; /* 宽度占满 */
  margin-top: auto; /* 顶部外边距自动，推到底部 */
  border-radius: 8px; /* 圆角效果 */
  padding: 10px 20px; /* 内边距 */
  font-weight: 500; /* 字体粗细 */
  letter-spacing: 0.5px; /* 字符间距 */
  transition: all 0.3s ease; /* 过渡动画 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  gap: 6px; /* 元素间距 */
}

/* 详情按钮悬停效果 */
.detail-btn:hover {
  transform: translateY(-3px); /* 上浮效果 */
  box-shadow: 0 5px 15px rgba(64, 158, 255, 0.3); /* 阴影效果 */
}

/* 收藏按钮 */
.favorite-btn {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 顶部距离 */
  left: 10px; /* 左侧距离 */
  width: 36px; /* 宽度 */
  height: 36px; /* 高度 */
  border-radius: 50%; /* 圆形 */
  background: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  border: none; /* 移除边框 */
  display: flex; /* 弹性布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  cursor: pointer; /* 鼠标手型 */
  transition: all 0.3s ease; /* 过渡动画 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  z-index: 2; /* 层级设置 */
  opacity: 0.7; /* 默认半透明 */
}

/* 收藏按钮悬停效果 */
.favorite-btn:hover {
  transform: scale(1.1); /* 放大效果 */
  opacity: 1; /* 完全不透明 */
  background: white; /* 白色背景 */
}

/* 已收藏状态的按钮样式 */
.favorite-btn.is-favorite {
  background: #f56c6c; /* 红色背景 */
  color: white; /* 白色文字 */
  opacity: 1; /* 完全不透明 */
}

/* 已收藏状态的按钮悬停效果 */
.favorite-btn.is-favorite:hover {
  background: #e64242; /* 深红色背景 */
}

/* 收藏按钮图标样式 */
.favorite-btn .el-icon {
  font-size: 18px; /* 图标大小 */
  transition: all 0.3s ease; /* 过渡动画 */
}

/* 收藏按钮悬停时图标效果 */
.favorite-btn:hover .el-icon {
  transform: scale(1.2); /* 图标放大效果 */
}

/* 响应式布局 - 大屏幕 */
@media (max-width: 1200px) {
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); /* 稍微减小卡片宽度 */
  }
}

/* 响应式布局 - 中等屏幕 */
@media (max-width: 768px) {
  .recommend-view {
    padding: 20px; /* 减小内边距 */
  }
  
  .phone-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 进一步减小卡片宽度 */
    gap: 15px; /* 减小卡片间距 */
  }
  
  .filter-card {
    margin-bottom: 20px; /* 底部外边距 */
    position: static; /* 取消粘性定位 */
  }
}

/* 响应式布局 - 小屏幕 */
@media (max-width: 576px) {
  .phone-grid {
    grid-template-columns: 1fr; /* 单列布局 */
  }
  
  .phone-image-container {
    height: 180px; /* 减小图片容器高度 */
  }
}
</style>