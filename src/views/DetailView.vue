<template>
  <div class="detail-view">
    <!-- 背景效果 -->
    <div class="bg-gradient"></div>
    
    <!-- 主要内容 -->
    <div class="container">
      <!-- 标题栏 -->
      <div class="header-bar">
        <h1>手机详情</h1>
        <button @click="goBack" class="back-btn">← 返回列表</button>
      </div>
      
      <div class="content-wrapper">
        <!-- 加载中 -->
        <div v-if="loading" class="loading-section">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
        
        <!-- 错误信息 -->
        <div v-else-if="error" class="error-section">
          <h2>出错了</h2>
          <p>{{ error }}</p>
          <button @click="reloadData" class="primary-btn">重试</button>
          <button @click="goBack" class="secondary-btn">返回列表</button>
        </div>
        
        <!-- 详情内容 -->
        <div v-else-if="phone" class="detail-content">
          <!-- 左侧：手机图片 -->
          <div class="phone-image-section">
            <div class="phone-showcase" 
                 @mousemove="handleMouseMove" 
                 @mouseleave="resetTilt">
              <div class="phone-display" 
                   :style="tiltStyle">
                <img :src="phone.image" :alt="phone.name" class="phone-image" @load="imageLoaded = true" />
                <div class="phone-shadow"></div>
                <div class="phone-reflection"></div>
              </div>
              
              <div class="phone-stand">
                <div class="phone-platform"></div>
              </div>
              
              <div class="view-hint">
                <span>移动鼠标查看不同角度</span>
              </div>
            </div>
          </div>
          
          <!-- 右侧：基本信息 -->
          <div class="phone-info-section">
            <div class="info-main">
              <div class="brand-price">
                <span class="phone-brand">{{ phone.brand }}</span>
                <span class="phone-price">¥{{ formatPrice(phone.price) }}</span>
              </div>
              
              <h2 class="phone-name">{{ phone.name }}</h2>
              
              <div class="rating-overview">
                <div class="rating-stars">
                  <div class="star-group">
                    <span class="rating-value">{{ getAverageRating(phone) }}</span>
                    <div class="stars">
                      <i v-for="n in 5" :key="n" class="star" 
                         :class="{ 'filled': n <= getAverageRating(phone) }">★</i>
                    </div>
                  </div>
                  <span class="rating-count">综合评分</span>
                </div>
              </div>
              
              <div class="action-buttons">
                <button class="action-btn compare-btn" @click="addToCompare" :class="{'disabled': isInCompareList}">
                  {{ isInCompareList ? '已添加到对比' : '添加到对比' }}
                </button>
                <button class="action-btn favorite-btn" :class="{'is-active': isInFavoriteList}" @click="toggleFavorite">
                  {{ isInFavoriteList ? '已收藏' : '收藏' }}
                </button>
              </div>

              <div class="tabs">
                <div class="tab-header">
                  <div v-for="tab in tabs" :key="tab.id" 
                       class="tab-item" 
                       :class="{'active': activeTab === tab.id}"
                       @click="activeTab = tab.id">
                    {{ tab.name }}
                  </div>
                </div>
                
                <div class="tab-content">
                  <!-- 规格选项卡 -->
                  <div v-if="activeTab === 'specs'" class="specs-section">
                    <div class="specs-row">
                      <div class="spec-card">
                        <div class="spec-icon">📱</div>
                        <div class="spec-detail">
                          <div class="spec-label">屏幕尺寸</div>
                          <div class="spec-value">{{ phone.screen }} 英寸</div>
                        </div>
                      </div>
                      
                      <div class="spec-card">
                        <div class="spec-icon">💾</div>
                        <div class="spec-detail">
                          <div class="spec-label">存储容量</div>
                          <div class="spec-value">{{ phone.storage }} GB</div>
                        </div>
                      </div>
                    </div>
                    
                    <h4 class="section-subtitle">性能评分</h4>
                    <div class="performance-bars">
                      <div class="performance-item">
                        <div class="perf-label">相机</div>
                        <div class="perf-bar-container">
                          <div class="perf-bar" :style="{ width: `${phone.camera * 20}%` }"></div>
                          <span class="perf-value">{{ phone.camera }}/5</span>
                        </div>
                      </div>
                      
                      <div class="performance-item">
                        <div class="perf-label">性能</div>
                        <div class="perf-bar-container">
                          <div class="perf-bar" :style="{ width: `${phone.performance * 20}%` }"></div>
                          <span class="perf-value">{{ phone.performance }}/5</span>
                        </div>
                      </div>
                      
                      <div class="performance-item">
                        <div class="perf-label">电池</div>
                        <div class="perf-bar-container">
                          <div class="perf-bar" :style="{ width: `${phone.battery * 20}%` }"></div>
                          <span class="perf-value">{{ phone.battery }}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 特点选项卡 -->
                  <div v-else class="features-section">
                    <h4 class="section-subtitle">产品特点</h4>
                    <ul class="features-list">
                      <li v-for="(feature, index) in phone.features" :key="index" class="feature-item">
                        <div class="feature-marker">✓</div>
                        <div class="feature-text">{{ feature }}</div>
                      </li>
                    </ul>
                    
                    <div v-if="phone.usage && phone.usage.length" class="usage-section">
                      <h4 class="section-subtitle">适用场景</h4>
                      <div class="usage-tags">
                        <span v-for="usage in phone.usage" :key="usage" class="usage-tag">
                          {{ usage }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 相关推荐 -->
        <div v-if="phone && similarPhones.length" class="similar-phones">
          <h3 class="section-title">相关推荐</h3>
          <div class="similar-phones-grid">
            <div v-for="similar in similarPhones" :key="similar.id" class="similar-phone-card" @click="viewDetail(similar.id)">
              <img :src="similar.image" :alt="similar.name" class="similar-phone-image">
              <div class="similar-phone-info">
                <div class="similar-phone-name">{{ similar.name }}</div>
                <div class="similar-phone-price">¥{{ formatPrice(similar.price) }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 未找到手机 -->
        <div v-else-if="!phone && !loading" class="not-found-section">
          <h2>未找到手机</h2>
          <p>无法找到相关手机信息</p>
          <button @click="goBack" class="primary-btn">返回列表</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'

export default {
  name: 'DetailView',
  props: {
    id: {
      type: [Number, String],
      default: null
    }
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const phoneStore = usePhoneStore()
    
    const phone = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const imageLoaded = ref(false)
    const activeTab = ref('specs')
    const selectedColor = ref(0)
    const tiltStyle = ref({})
    
    // 定义选项卡
    const tabs = [
      { id: 'specs', name: '规格参数' },
      { id: 'features', name: '产品特点' }
    ]
    
    // 手机颜色选项
    const colors = ['#f5f7fa', '#303133', '#42b983', '#e6a23c', '#f56c6c']
    
    // 3D倾斜效果
    const handleMouseMove = (e) => {
      if (!imageLoaded.value) return;
      
      const container = e.currentTarget;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      // 计算鼠标相对容器的位置 (从-1到1)
      const x = ((e.clientX - left) / width) * 2 - 1;
      const y = ((e.clientY - top) / height) * 2 - 1;
      
      // 限制最大倾斜角度为15度
      const maxTilt = 15;
      const tiltX = -y * maxTilt;  // 垂直移动控制X轴旋转
      const tiltY = x * maxTilt;   // 水平移动控制Y轴旋转
      
      // 设置倾斜样式
      tiltStyle.value = {
        transform: `
          perspective(1000px) 
          rotateX(${tiltX}deg) 
          rotateY(${tiltY}deg)
          scale3d(1.05, 1.05, 1.05)
        `,
        transition: 'transform 0.1s ease-out'
      };
    };
    
    // 重置倾斜效果
    const resetTilt = () => {
      tiltStyle.value = {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.8s ease-in-out'
      };
    };
    
    // 获取平均评分
    const getAverageRating = (phone) => {
      if (!phone) return 0;
      const avg = (phone.camera + phone.performance + phone.battery) / 3;
      return parseFloat(avg.toFixed(1));
    }
    
    // 格式化价格
    const formatPrice = (price) => {
      if (!price) return "0";
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // 相似手机列表
    const similarPhones = computed(() => {
      if (!phone.value) return [];
      
      // 获取同品牌的其他手机
      return phoneStore.phones
        .filter(p => 
          p.id !== phone.value.id && 
          p.brand === phone.value.brand
        )
        .slice(0, 4);
    });
    
    // 获取手机数据
    const fetchPhoneData = () => {
      loading.value = true
      error.value = null
      
      try {
        // 从props或路由参数获取ID
        const phoneId = props.id || Number(route.params.id)
        
        if (!phoneId || isNaN(Number(phoneId))) {
          throw new Error('无效的手机ID，请检查URL')
        }
        
        // 获取手机数据
        const phoneData = phoneStore.getPhoneDetail(Number(phoneId))
        
        if (!phoneData) {
          throw new Error(`找不到ID为${phoneId}的手机`)
        }
        
        // 更新状态
        phone.value = phoneData
      } catch (err) {
        error.value = err.message || '加载失败，请稍后再试'
      } finally {
        loading.value = false
      }
    }
    
    // 重新加载数据
    const reloadData = () => {
      fetchPhoneData()
    }
    
    // 返回推荐页面
    const goBack = () => {
      router.push('/recommend')
    }
    
    // 查看其他手机详情
    const viewDetail = (id) => {
      router.push(`/detail/${id}`);
    }
    
    // 判断是否在对比列表中
    const isInCompareList = computed(() => {
      if (!phone.value) return false
      return phoneStore.compareList.includes(phone.value.id)
    })
    
    // 判断是否已收藏
    const isInFavoriteList = computed(() => {
      if (!phone.value) return false
      return phoneStore.favoriteList.includes(phone.value.id)
    })
    
    // 添加到对比列表
    const addToCompare = () => {
      if (!phone.value || isInCompareList.value) return
      phoneStore.addToCompare(phone.value.id)
    }
    
    // 切换收藏状态
    const toggleFavorite = () => {
      if (!phone.value) return
      phoneStore.toggleFavorite(phone.value.id)
    }
    
    // 组件挂载时获取数据
    onMounted(() => {
      fetchPhoneData()
      resetTilt() // 初始化倾斜样式
    })
    
    // 当路由参数变化时重新加载数据
    watch(() => route.params.id, (newId) => {
      if (newId) {
        fetchPhoneData();
        resetTilt(); // 重置倾斜效果
      }
    });
    
    return {
      phone,
      loading,
      error,
      imageLoaded,
      reloadData,
      goBack,
      viewDetail,
      isInCompareList,
      isInFavoriteList,
      addToCompare,
      toggleFavorite,
      activeTab,
      tabs,
      selectedColor,
      colors,
      tiltStyle,
      handleMouseMove,
      resetTilt,
      formatPrice,
      similarPhones,
      getAverageRating
    }
  }
}
</script>

<style scoped>
.detail-view {
  min-height: 100vh;
  background: #f5f7fa;
  position: relative;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 20px;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  z-index: -1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #42b983, #2f9768);
  color: white;
}

.header-bar h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-5px);
}

.content-wrapper {
  padding: 30px;
}

.loading-section,
.error-section,
.not-found-section {
  text-align: center;
  padding: 50px 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(66, 185, 131, 0.1);
  border-left-color: #42b983;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.detail-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}

.phone-image-section {
  flex: 1;
  min-width: 300px;
}

/* 新的3D展示区域 */
.phone-showcase {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 20px;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
}

.phone-display {
  position: relative;
  width: 60%;
  height: 70%;
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.phone-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.2));
  transition: all 0.5s ease;
  transform-style: preserve-3d;
}

.phone-shadow {
  position: absolute;
  bottom: -20px;
  left: 50%;
  width: 70%;
  height: 20px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  filter: blur(15px);
  transform: translateX(-50%) rotateX(90deg);
  opacity: 0.6;
}

.phone-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.phone-showcase:hover .phone-reflection {
  opacity: 1;
}

.phone-stand {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.phone-platform {
  width: 100px;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  filter: blur(2px);
}

.view-hint {
  position: absolute;
  bottom: 20px;
  font-size: 13px;
  color: #909399;
  opacity: 0.6;
  pointer-events: none;
}

.phone-info-section {
  flex: 2;
  min-width: 300px;
}

.info-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.brand-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phone-brand {
  display: inline-block;
  background: #42b983;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2);
}

.phone-price {
  font-size: 28px;
  color: #f56c6c;
  font-weight: 700;
}

.phone-name {
  font-size: 32px;
  margin: 0;
  color: #303133;
  font-weight: 700;
  line-height: 1.2;
}

.rating-overview {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
}

.rating-stars {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.star-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.rating-value {
  font-size: 36px;
  font-weight: 700;
  color: #303133;
}

.stars {
  display: flex;
}

.star {
  color: #dcdfe6;
  font-size: 24px;
}

.star.filled {
  color: #f7ba2a;
}

.rating-count {
  color: #909399;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.action-btn {
  flex: 1;
  padding: 14px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
}

.compare-btn {
  background: #409EFF;
  color: white;
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.2);
}

.compare-btn:hover:not(.disabled) {
  background: #337ecc;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(64, 158, 255, 0.3);
}

.compare-btn.disabled {
  background: #a0cfff;
  cursor: default;
}

.favorite-btn {
  background: white;
  color: #f56c6c;
  border: 2px solid #f56c6c;
}

.favorite-btn:hover, .favorite-btn.is-active {
  background: #f56c6c;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.2);
}

.favorite-btn.is-active {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.tabs {
  margin-top: 30px;
  border: 1px solid #e4e7ed;
  border-radius: 12px;
  overflow: hidden;
}

.tab-header {
  display: flex;
  background: #f5f7fa;
}

.tab-item {
  padding: 15px 20px;
  cursor: pointer;
  font-weight: 500;
  color: #606266;
  transition: all 0.3s ease;
  position: relative;
}

.tab-item:hover {
  color: #42b983;
}

.tab-item.active {
  color: #42b983;
  background: white;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #42b983;
}

.tab-content {
  padding: 20px;
}

.specs-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.spec-card {
  flex: 1;
  min-width: 180px;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.spec-card:hover {
  background: #eef5ff;
  transform: translateY(-5px);
}

.spec-icon {
  font-size: 24px;
  color: #409EFF;
}

.spec-detail {
  display: flex;
  flex-direction: column;
}

.spec-label {
  color: #909399;
  font-size: 14px;
}

.spec-value {
  color: #303133;
  font-weight: 600;
  font-size: 16px;
}

.section-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: #303133;
  margin: 20px 0 15px;
  padding-left: 10px;
  border-left: 4px solid #42b983;
}

.performance-bars {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.performance-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.perf-label {
  width: 70px;
  font-weight: 500;
  color: #606266;
}

.perf-bar-container {
  flex-grow: 1;
  height: 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.perf-bar {
  height: 100%;
  background: linear-gradient(90deg, #42b983, #33a06f);
  border-radius: 6px;
  transition: width 1s ease;
}

.perf-value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: 600;
  color: #606266;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px dotted #ebeef5;
}

.feature-item:last-child {
  border-bottom: none;
}

.feature-marker {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #edf9f0;
  color: #42b983;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
}

.feature-text {
  color: #606266;
  font-size: 16px;
}

/* 使用场景标签 */
.usage-section {
  margin-top: 30px;
}

.usage-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.usage-tag {
  padding: 8px 16px;
  background: #f0f9eb;
  color: #67c23a;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.usage-tag:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(103, 194, 58, 0.2);
}

/* 相关推荐样式 */
.similar-phones {
  margin-top: 50px;
  padding-top: 30px;
  border-top: 1px solid #ebeef5;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: "";
  display: block;
  width: 60px;
  height: 4px;
  background: #42b983;
  margin: 10px auto;
}

.similar-phones-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 25px;
}

.similar-phone-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.similar-phone-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.similar-phone-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  padding: 15px;
  background: #f8f9fa;
}

.similar-phone-info {
  padding: 12px;
}

.similar-phone-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.similar-phone-price {
  font-size: 16px;
  font-weight: 700;
  color: #f56c6c;
  margin-top: 5px;
}

.primary-btn, .secondary-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px 5px;
}

.primary-btn {
  background: #409EFF;
  color: white;
}

.primary-btn:hover {
  background: #337ecc;
}

.secondary-btn {
  background: #f4f4f5;
  color: #606266;
}

.secondary-btn:hover {
  background: #e9e9eb;
}

@media (max-width: 900px) {
  .detail-content {
    flex-direction: column;
  }
  
  .content-wrapper {
    padding: 20px;
  }
  
  .phone-showcase {
    height: 320px;
  }
  
  .phone-name {
    font-size: 28px;
  }
  
  .header-bar h1 {
    font-size: 20px;
  }
  
  .similar-phones-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 600px) {
  .specs-row {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .phone-showcase {
    height: 280px;
  }
  
  .similar-phones-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tab-item {
    padding: 10px 15px;
    font-size: 14px;
  }
}
</style>