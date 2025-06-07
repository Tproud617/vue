<!-- 详情页面组件 - 展示单个手机的详细信息和参数 -->
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
        <!-- 加载中状态 -->
        <div v-if="loading" class="loading-section">
          <div class="spinner"></div>
          <p>加载中...</p>
        </div>
        
        <!-- 错误信息展示 -->
        <div v-else-if="error" class="error-section">
          <h2>出错了</h2>
              <p>{{ error }}</p>
          <button @click="reloadData" class="primary-btn">重试</button>
          <button @click="goBack" class="secondary-btn">返回列表</button>
        </div>
        
        <!-- 详情内容展示 - 当手机数据加载成功时显示 -->
        <div v-else-if="phone" class="detail-content">
          <!-- 左侧：手机图片展示区 -->
          <div class="phone-image-section">
            <!-- 轮播图展示多个角度的图片 -->
            <el-carousel :interval="5000" indicator-position="outside" class="phone-carousel">
              <el-carousel-item v-for="(image, index) in phoneImages" :key="index">
                <div class="phone-showcase" 
                     @mousemove="handleMouseMove" 
                     @mouseleave="resetTilt">
                  <div class="phone-display" 
                       :style="tiltStyle">
                    <img :src="image" :alt="phone.name" class="phone-image" @load="imageLoaded = true" />
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
              </el-carousel-item>
            </el-carousel>
            
            <!-- 颜色选择器 - 选择不同颜色的手机 -->
            <div class="color-selector">
              <span class="color-title">选择颜色:</span>
              <div class="color-options">
                <div v-for="(color, index) in phone.colors || colors" 
                     :key="color"
                     class="color-option" 
                     :class="{ active: selectedColor === index }"
                     :style="{ background: color }"
                     @click="selectColor(index)">
                </div>
              </div>
            </div>
          </div>
          
          <!-- 右侧：手机详细信息展示 -->
          <div class="phone-info-section">
            <div class="info-main">
              <!-- 品牌和价格 -->
              <div class="brand-price">
                <span class="phone-brand">{{ phone.brand }}</span>
                <span class="phone-price">¥{{ formatPrice(phone.price) }}</span>
              </div>
              
              <!-- 手机名称 -->
              <h2 class="phone-name">{{ phone.name }}</h2>
              
              <!-- 评分概览 -->
              <div class="rating-overview">
                <div class="rating-stars">
                  <div class="star-group">
                    <span class="rating-value">{{ getAverageRating(phone) }}</span>
                    <div class="stars">
                      <i v-for="n in 5" :key="n" class="star" 
                         :class="{ 'filled': n <= getAverageRating(phone) }">★</i>
                    </div>
                  </div>
                  <span class="rating-count">综合评分 ({{ reviews.length || 0 }}条评价)</span>
                </div>
              </div>
              
              <!-- 购买选项 - 存储、配送等选择 -->
              <div class="purchase-options">
                <div class="memory-options">
                  <span class="memory-title">存储配置:</span>
                  <div class="memory-selector">
                    <button 
                      v-for="option in memoryOptions" 
                      :key="option.value"
                      class="memory-btn" 
                      :class="{ active: selectedMemory === option.value }"
                      @click="selectMemory(option.value)">
                      {{ option.label }}
                    </button>
                  </div>
                </div>
                
                <div class="delivery-options">
                  <div class="delivery-item">
                    <el-icon><location /></el-icon>
                    <span>清远市清城区 <a href="#" class="change-link">修改</a></span>
                  </div>
                  <div class="delivery-item">
                    <el-icon><truck /></el-icon>
                    <span>预计次日送达</span>
                  </div>
                </div>
              </div>
              
              <!-- 操作按钮区 - 购买、收藏等功能 -->
              <div class="action-buttons">
                <button class="action-btn buy-btn" @click="buyNow">
                  立即购买
                </button>
                <button class="action-btn cart-btn" @click="addToCart">
                  加入购物车
                </button>
                <button class="action-btn compare-btn" :class="{'disabled': isInCompareList}" @click="addToCompare">
                  {{ isInCompareList ? '已添加到对比' : '添加到对比' }}
                </button>
                <button class="action-btn favorite-btn" :class="{'is-active': isInFavoriteList}" @click="toggleFavorite">
                  {{ isInFavoriteList ? '已收藏' : '收藏' }}
                </button>
              </div>
                
              <!-- 标签页 - 展示不同类型的详细信息 -->
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
                  <!-- 规格选项卡 - 展示手机硬件参数 -->
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
                          <div class="spec-value">{{ selectedMemoryLabel }}</div>
                        </div>
                      </div>
                      
                      <div class="spec-card">
                        <div class="spec-icon">🔋</div>
                        <div class="spec-detail">
                          <div class="spec-label">电池容量</div>
                          <div class="spec-value">{{ phone.batteryCapacity || '4500mAh' }}</div>
                        </div>
                      </div>
                      
                      <div class="spec-card">
                        <div class="spec-icon">⚡</div>
                        <div class="spec-detail">
                          <div class="spec-label">充电功率</div>
                          <div class="spec-value">{{ phone.chargingPower || '33W' }}</div>
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
                      
                      <div class="performance-item">
                        <div class="perf-label">屏幕</div>
                        <div class="perf-bar-container">
                          <div class="perf-bar" :style="{ width: `${phone.screenQuality || 4 * 20}%` }"></div>
                          <span class="perf-value">{{ phone.screenQuality || 4 }}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 特点选项卡 - 展示手机特色功能 -->
                  <div v-else-if="activeTab === 'features'" class="features-section">
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
                  
                  <!-- 评论选项卡 - 显示用户评价 -->
                  <div v-else-if="activeTab === 'reviews'" class="reviews-section">
                    <h4 class="section-subtitle">用户评价</h4>
                    
                    <!-- 添加评论表单 -->
                    <div class="add-review">
                      <h5>发表评论</h5>
                      <div class="review-form">
                        <div class="review-rating">
                          <span>评分:</span>
                          <el-rate v-model="newReview.rating" />
                        </div>
                        <el-input
                          v-model="newReview.comment"
                          type="textarea"
                          :rows="3"
                          placeholder="分享您的使用体验..."
                        />
                        <el-button type="primary" @click="submitReview" :disabled="!newReview.rating || !newReview.comment">
                          提交评价
                        </el-button>
                      </div>
                    </div>
                    
                    <!-- 评论列表展示 -->
                    <div class="reviews-list">
                      <div v-if="reviews.length === 0" class="no-reviews">
                        暂无评价，快来发表第一条评价吧！
                      </div>
                      
                      <div v-for="(review, index) in reviews" :key="index" class="review-item">
                        <div class="review-header">
                          <div class="reviewer-info">
                            <div class="reviewer-avatar">
                              {{ review.username.charAt(0).toUpperCase() }}
                            </div>
                            <div class="reviewer-details">
                              <div class="reviewer-name">{{ review.username }}</div>
                              <div class="review-date">{{ formatDate(review.date) }}</div>
                            </div>
                          </div>
                          <div class="review-rating">
                            <el-rate v-model="review.rating" disabled />
                          </div>
                        </div>
                        <div class="review-content">
                          {{ review.comment }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 相关推荐 - 展示类似手机 -->
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
        
        <!-- 未找到手机提示 -->
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
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { ElMessage } from 'element-plus'
import { Location } from '@element-plus/icons-vue'

export default {
  name: 'DetailView',
  components: {
    Location,
  },
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

// 手机数据状态
const phone = ref(null)
const loading = ref(true)
const error = ref(null)
    const imageLoaded = ref(false)
    const activeTab = ref('specs')
    const selectedColor = ref(0)
    const tiltStyle = ref({})
    
    // 用户界面状态
    const selectedMemory = ref(128) // 默认128GB
    const reviews = ref([]) // 评论数组
    const newReview = reactive({
      rating: 0,
      comment: '',
      username: '用户' + Math.floor(Math.random() * 10000)
    })
    
    // 内存选项配置
    const memoryOptions = [
      { label: '64GB', value: 64 },
      { label: '128GB', value: 128 },
      { label: '256GB', value: 256 },
      { label: '512GB', value: 512 }
    ]
    
    // 获取选中的内存标签
    const selectedMemoryLabel = computed(() => {
      const option = memoryOptions.find(opt => opt.value === selectedMemory.value)
      return option ? option.label : phone.value.storage + 'GB'
    })
    
    // 手机图片数组 - 模拟多角度展示
    const phoneImages = computed(() => {
      if (!phone.value) return []
      // 这里实际项目中应该从后端获取多张图片
      // 这里模拟多个角度的图片
      return [
        phone.value.image,
        phone.value.image,
        phone.value.image
      ]
    })
    
    // 定义标签页选项
    const tabs = [
      { id: 'specs', name: '规格参数' },
      { id: 'features', name: '产品特点' },
      { id: 'reviews', name: '用户评价' }
    ]
    
    // 手机颜色选项 - 默认颜色列表
    const colors = ['#f5f7fa', '#303133', '#42b983', '#e6a23c', '#f56c6c']
    
    // 选择颜色 - 切换手机颜色
    const selectColor = (index) => {
      selectedColor.value = index
    }
    
    // 选择内存 - 切换手机存储容量
    const selectMemory = (memory) => {
      selectedMemory.value = memory
    }
    
    // 立即购买 - 购买功能占位
    const buyNow = () => {
      ElMessage.success('购买功能开发中，敬请期待！')
    }
    
    // 加入购物车 - 购物车功能占位
    const addToCart = () => {
      ElMessage.success('购买功能开发中，敬请期待！')
    }
    
    // 提交评论 - 添加新的用户评价
    const submitReview = () => {
      const review = {
        ...newReview,
        date: new Date()
      }
      reviews.value.unshift(review)
      // 重置表单
      newReview.rating = 0
      newReview.comment = ''
      ElMessage.success('评论已提交，感谢您的反馈！')
    }
    
    // 格式化日期 - 将日期对象转换为字符串
    const formatDate = (date) => {
      if (!date) return ''
      const d = new Date(date)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }
    
    // 3D倾斜效果 - 鼠标移动时改变手机展示角度
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
    
    // 重置倾斜效果 - 鼠标离开时恢复初始状态
    const resetTilt = () => {
      tiltStyle.value = {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.8s ease-in-out'
      };
    };
    
    // 获取平均评分 - 计算手机的总体评分
    const getAverageRating = (phone) => {
      if (!phone) return 0;
      const avg = (phone.camera + phone.performance + phone.battery) / 3;
      return parseFloat(avg.toFixed(1));
    }
    
    // 格式化价格 - 添加千位分隔符
    const formatPrice = (price) => {
      if (!price) return "0";
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // 相似手机列表 - 获取同品牌的其他手机
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
    
    // 获取手机数据 - 根据ID加载详细信息
    const fetchPhoneData = () => {
    loading.value = true
    error.value = null
      
      try {
        // 从props或路由参数获取ID
        const phoneId = props.id || Number(route.params.id)
        
        console.log('DetailView - 尝试加载手机ID:', phoneId)
        console.log('DetailView - 路由参数:', route.params)
        
        if (!phoneId || isNaN(Number(phoneId))) {
          throw new Error('无效的手机ID，请检查URL')
        }
        
        // 获取手机数据
        const phoneData = phoneStore.getPhoneDetail(Number(phoneId))
        console.log('DetailView - 获取到的手机数据:', phoneData ? '成功' : '失败')
    
        if (!phoneData) {
          throw new Error(`找不到ID为${phoneId}的手机`)
        }
        
        // 更新状态
        phone.value = phoneData
      } catch (err) {
        console.error('DetailView - 加载错误:', err)
        error.value = err.message || '加载失败，请稍后再试'
      } finally {
        loading.value = false
      }
    }
    
    // 重新加载数据 - 出错时重试
    const reloadData = () => {
      fetchPhoneData()
    }
    
    // 返回推荐页面 - 导航回上一级
const goBack = () => {
  router.push('/recommend')
}
    
    // 查看其他手机详情 - 切换到其他手机
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
  if (!phone.value) return
  phoneStore.toggleCompare(phone.value.id)
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
      getAverageRating,
      phoneImages,
      selectColor,
      memoryOptions,
      selectedMemory,
      selectedMemoryLabel,
      selectMemory,
      buyNow,
      addToCart,
      reviews,
      newReview,
      submitReview,
      formatDate
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
  height: 420px; /* 增加展示区域高度 */
  border-radius: 20px;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);
  padding-bottom: 60px; /* 增加底部内边距 */
}

.phone-display {
  position: relative;
  width: 60%;
  height: 60%; /* 进一步减小高度 */
  transform-style: preserve-3d;
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-top: -50px; /* 进一步向上移动显示区域 */
}

.phone-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.2));
  transition: all 0.5s ease;
  transform-style: preserve-3d;
  max-height: 85%; /* 略微减小最大高度 */
  margin-bottom: 40px;
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
  bottom: 90px; /* 进一步增加距底部的距离 */
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
  bottom: 70px; /* 提高提示文字的位置 */
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 10px;
}

.action-btn {
  height: 46px;
  border: none;
  border-radius: 23px; /* 更圆润的按钮 */
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buy-btn {
  background: linear-gradient(45deg, #f56c6c, #e64242); /* 渐变背景 */
  color: white;
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.2);
  grid-column: span 2;
}

.buy-btn:hover {
  background: linear-gradient(45deg, #e64242, #d52121);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(245, 108, 108, 0.3);
}

.cart-btn {
  background: linear-gradient(45deg, #e6a23c, #d48f23); /* 渐变背景 */
  color: white;
  box-shadow: 0 8px 15px rgba(230, 162, 60, 0.2);
}

.cart-btn:hover {
  background: linear-gradient(45deg, #d48f23, #bf7e1a);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(230, 162, 60, 0.3);
}

.compare-btn {
  background: white;
  color: #409EFF;
  border: 2px solid #409EFF;
  border-radius: 23px;
}

.compare-btn:hover, .compare-btn.disabled {
  background: #409EFF;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.2);
}

.compare-btn.disabled {
  cursor: pointer; /* 保持可点击状态 */
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

.phone-carousel {
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
}

.color-selector {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.color-title {
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.color-options {
  display: flex;
  gap: 10px;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.color-option.active {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.color-option.active::after {
  content: "";
  position: absolute;
  width: 36px;
  height: 36px;
  border: 2px solid currentColor;
  border-radius: 50%;
  top: -5px;
  left: -5px;
}

.purchase-options {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 12px;
  margin: 15px 0;
}

.memory-options {
  margin-bottom: 15px;
}

.memory-title {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.memory-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.memory-btn {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #606266;
  min-width: 80px;
  text-align: center;
}

.memory-btn.active {
  border-color: #409EFF;
  color: #409EFF;
  background: #ecf5ff;
}

.memory-btn:hover {
  border-color: #c6e2ff;
}

.delivery-options {
  border-top: 1px dashed #dcdfe6;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.delivery-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #606266;
}

.change-link {
  color: #409EFF;
  text-decoration: none;
  margin-left: 5px;
}

.change-link:hover {
  color: #337ecc;
  text-decoration: underline;
}

/* 评价部分样式 */
.add-review {
  margin-bottom: 30px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.add-review h5 {
  margin: 0 0 15px;
  font-size: 16px;
  color: #303133;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.review-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reviews-list {
  margin-top: 20px;
}

.no-reviews {
  text-align: center;
  padding: 20px;
  color: #909399;
  font-style: italic;
}

.review-item {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 15px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reviewer-avatar {
  width: 40px;
  height: 40px;
  background: #409EFF;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
}

.reviewer-details {
  display: flex;
  flex-direction: column;
}

.reviewer-name {
  font-weight: 500;
  color: #303133;
}

.review-date {
  font-size: 12px;
  color: #909399;
}

.review-content {
  color: #606266;
  line-height: 1.6;
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
    grid-template-columns: 1fr;
  }
  
  .buy-btn {
    grid-column: span 1;
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