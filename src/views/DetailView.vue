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
  min-height: 100vh; /* 设置最小高度为视口高度，确保页面至少充满整个屏幕 */
  background: #f5f7fa; /* 设置背景颜色为浅灰色 */
  position: relative; /* 设置相对定位，作为子元素定位的参考点 */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif; /* 设置字体系列，优先使用系统默认字体 */
  padding: 20px; /* 设置内边距为20像素 */
}

.bg-gradient {
  position: absolute; /* 设置绝对定位，相对于最近的定位父元素 */
  top: 0; /* 顶部对齐父元素 */
  left: 0; /* 左侧对齐父元素 */
  right: 0; /* 右侧对齐父元素 */
  bottom: 0; /* 底部对齐父元素 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); /* 设置135度角的渐变背景 */
  z-index: -1; /* 设置层级为-1，确保在其他内容之下 */
}

.container {
  max-width: 1200px; /* 设置最大宽度为1200像素 */
  margin: 0 auto; /* 设置上下边距为0，左右自动居中 */
  background: white; /* 设置背景颜色为白色 */
  border-radius: 16px; /* 设置边框圆角为16像素 */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* 设置阴影效果 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.header-bar {
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中对齐 */
  padding: 20px; /* 设置内边距为20像素 */
  background: linear-gradient(to right, #42b983, #2f9768); /* 从左到右的渐变背景 */
  color: white; /* 文字颜色为白色 */
}

.header-bar h1 {
  margin: 0; /* 移除默认边距 */
  font-size: 24px; /* 设置字体大小为24像素 */
  font-weight: 600; /* 设置字体粗细为600 */
  letter-spacing: 0.5px; /* 设置字母间距为0.5像素 */
}

.back-btn {
  background: rgba(255, 255, 255, 0.2); /* 半透明白色背景 */
  border: none; /* 移除边框 */
  padding: 8px 16px; /* 设置内边距，上下8像素，左右16像素 */
  border-radius: 6px; /* 设置边框圆角为6像素 */
  color: white; /* 文字颜色为白色 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 6px; /* 设置元素间距为6像素 */
  font-weight: 500; /* 设置字体粗细为500 */
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.3); /* 悬停时背景色更亮 */
  transform: translateX(-5px); /* 向左移动5像素 */
}

.content-wrapper {
  padding: 30px; /* 设置内边距为30像素 */
}

.loading-section,
.error-section,
.not-found-section {
  text-align: center; /* 文字居中对齐 */
  padding: 50px 20px; /* 设置内边距，上下50像素，左右20像素 */
}

.spinner {
  width: 50px; /* 设置宽度为50像素 */
  height: 50px; /* 设置高度为50像素 */
  border: 5px solid rgba(66, 185, 131, 0.1); /* 设置5像素宽的淡绿色边框 */
  border-left-color: #42b983; /* 设置左边框为绿色，形成加载效果 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  margin: 0 auto 20px; /* 设置上边距为0，左右自动居中，下边距为20像素 */
  animation: spin 1s linear infinite; /* 应用名为spin的动画，持续1秒，线性变化，无限循环 */
}

@keyframes spin {
  to {
    transform: rotate(360deg); /* 定义动画终点为旋转360度 */
  }
}

.detail-content {
  display: flex; /* 使用弹性布局 */
  flex-wrap: wrap; /* 允许元素换行 */
  gap: 40px; /* 设置元素间距为40像素 */
  margin-bottom: 40px; /* 设置下边距为40像素 */
}

.phone-image-section {
  flex: 1; /* 弹性增长系数为1 */
  min-width: 300px; /* 设置最小宽度为300像素 */
}

/* 新的3D展示区域 */
.phone-showcase {
  position: relative; /* 设置相对定位 */
  width: 100%; /* 宽度占满父元素 */
  height: 420px; /* 增加展示区域高度 */
  border-radius: 20px; /* 设置边框圆角为20像素 */
  background: linear-gradient(145deg, #f8f9fa, #e9ecef); /* 设置145度角渐变背景 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  overflow: hidden; /* 隐藏溢出内容 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05); /* 设置内阴影效果 */
  padding-bottom: 60px; /* 增加底部内边距 */
}

.phone-display {
  position: relative; /* 设置相对定位 */
  width: 60%; /* 宽度为父元素的60% */
  height: 60%; /* 进一步减小高度 */
  transform-style: preserve-3d; /* 保留3D变换效果 */
  will-change: transform; /* 提示浏览器元素的transform属性会变化，优化性能 */
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* 添加transform属性变化的过渡效果 */
  margin-top: -50px; /* 进一步向上移动显示区域 */
}

.phone-image {
  width: 100%; /* 宽度占满父元素 */
  height: 100%; /* 高度占满父元素 */
  object-fit: contain; /* 保持图片比例，确保完整显示 */
  filter: drop-shadow(0 30px 30px rgba(0, 0, 0, 0.2)); /* 添加投影效果 */
  transition: all 0.5s ease; /* 所有属性变化添加0.5秒过渡效果 */
  transform-style: preserve-3d; /* 保留3D变换效果 */
  max-height: 85%; /* 略微减小最大高度 */
  margin-bottom: 40px; /* 设置下边距为40像素 */
}

.phone-shadow {
  position: absolute; /* 设置绝对定位 */
  bottom: -20px; /* 底部位置偏移-20像素 */
  left: 50%; /* 左侧位置为父元素的50% */
  width: 70%; /* 宽度为父元素的70% */
  height: 20px; /* 高度为20像素 */
  background: rgba(0, 0, 0, 0.15); /* 设置半透明黑色背景 */
  border-radius: 50%; /* 设置边框圆角为50%，形成椭圆 */
  filter: blur(15px); /* 添加15像素的模糊效果 */
  transform: translateX(-50%) rotateX(90deg); /* 水平居中并旋转90度 */
  opacity: 0.6; /* 设置不透明度为0.6 */
}

.phone-reflection {
  position: absolute; /* 设置绝对定位 */
  top: 0; /* 顶部对齐父元素 */
  left: 0; /* 左侧对齐父元素 */
  right: 0; /* 右侧对齐父元素 */
  bottom: 0; /* 底部对齐父元素 */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  ); /* 设置135度角的白色渐变背景，模拟反光效果 */
  pointer-events: none; /* 禁用鼠标事件，使元素不可点击 */
  opacity: 0; /* 默认不透明度为0，即隐藏 */
  transition: opacity 0.3s ease; /* 添加不透明度变化的过渡效果 */
}

.phone-showcase:hover .phone-reflection {
  opacity: 1; /* 鼠标悬停时显示反光效果 */
}

.phone-stand {
  position: absolute; /* 设置绝对定位 */
  bottom: 90px; /* 进一步增加距底部的距离 */
  width: 100%; /* 宽度占满父元素 */
  display: flex; /* 使用弹性布局 */
  justify-content: center; /* 水平居中对齐 */
}

.phone-platform {
  width: 100px; /* 设置宽度为100像素 */
  height: 4px; /* 设置高度为4像素 */
  background: rgba(0, 0, 0, 0.1); /* 设置半透明黑色背景 */
  border-radius: 50%; /* 设置边框圆角为50%，形成椭圆 */
  filter: blur(2px); /* 添加2像素的模糊效果 */
}

.view-hint {
  position: absolute; /* 设置绝对定位 */
  bottom: 70px; /* 提高提示文字的位置 */
  font-size: 13px; /* 设置字体大小为13像素 */
  color: #909399; /* 设置文字颜色为灰色 */
  opacity: 0.6; /* 设置不透明度为0.6 */
  pointer-events: none; /* 禁用鼠标事件，使元素不可点击 */
}

.phone-info-section {
  flex: 2; /* 弹性增长系数为2，占用更多空间 */
  min-width: 300px; /* 设置最小宽度为300像素 */
}

.info-main {
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  gap: 20px; /* 设置元素间距为20像素 */
}

.brand-price {
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: center; /* 垂直居中对齐 */
}

.phone-brand {
  display: inline-block; /* 设置为行内块元素 */
  background: #42b983; /* 设置背景颜色为绿色 */
  color: white; /* 设置文字颜色为白色 */
  padding: 6px 16px; /* 设置内边距，上下6像素，左右16像素 */
  border-radius: 20px; /* 设置边框圆角为20像素 */
  font-size: 14px; /* 设置字体大小为14像素 */
  font-weight: 600; /* 设置字体粗细为600 */
  text-transform: uppercase; /* 文本转换为大写 */
  letter-spacing: 0.5px; /* 设置字母间距为0.5像素 */
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.2); /* 添加阴影效果 */
}

.phone-price {
  font-size: 28px; /* 设置字体大小为28像素 */
  color: #f56c6c; /* 设置文字颜色为红色 */
  font-weight: 700; /* 设置字体粗细为700 */
}

.phone-name {
  font-size: 32px; /* 设置字体大小为32像素 */
  margin: 0; /* 移除默认边距 */
  color: #303133; /* 设置文字颜色为深灰色 */
  font-weight: 700; /* 设置字体粗细为700 */
  line-height: 1.2; /* 设置行高为1.2倍字体大小 */
}

.rating-overview {
  background: #f8f9fa; /* 设置背景颜色为浅灰色 */
  padding: 15px; /* 设置内边距为15像素 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
}

.rating-stars {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: space-between; /* 两端对齐 */
}

.star-group {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 15px; /* 设置元素间距为15像素 */
}

.rating-value {
  font-size: 36px; /* 设置字体大小为36像素 */
  font-weight: 700; /* 设置字体粗细为700 */
  color: #303133; /* 设置文字颜色为深灰色 */
}

.stars {
  display: flex; /* 使用弹性布局 */
}

.star {
  color: #dcdfe6; /* 设置文字颜色为浅灰色，表示未选中的星星 */
  font-size: 24px; /* 设置字体大小为24像素 */
}

.star.filled {
  color: #f7ba2a; /* 设置文字颜色为金黄色，表示已选中的星星 */
}

.rating-count {
  color: #909399; /* 设置文字颜色为灰色 */
  font-size: 14px; /* 设置字体大小为14像素 */
}

.action-buttons {
  display: grid; /* 使用网格布局 */
  grid-template-columns: repeat(2, 1fr); /* 设置两列等宽布局 */
  gap: 15px; /* 设置元素间距为15像素 */
  margin-top: 10px; /* 设置上边距为10像素 */
}

.action-btn {
  height: 46px; /* 设置高度为46像素 */
  border: none; /* 移除边框 */
  border-radius: 23px; /* 更圆润的按钮 */
  font-weight: 600; /* 设置字体粗细为600 */
  font-size: 16px; /* 设置字体大小为16像素 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
}

.buy-btn {
  background: linear-gradient(45deg, #f56c6c, #e64242); /* 渐变背景 */
  color: white; /* 设置文字颜色为白色 */
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.2); /* 添加阴影效果 */
  grid-column: span 2; /* 横跨两列 */
}

.buy-btn:hover {
  background: linear-gradient(45deg, #e64242, #d52121); /* 悬停时更深的渐变背景 */
  transform: translateY(-3px); /* 向上移动3像素，产生悬浮效果 */
  box-shadow: 0 10px 20px rgba(245, 108, 108, 0.3); /* 增强阴影效果 */
}

.cart-btn {
  background: linear-gradient(45deg, #e6a23c, #d48f23); /* 渐变背景 */
  color: white; /* 设置文字颜色为白色 */
  box-shadow: 0 8px 15px rgba(230, 162, 60, 0.2); /* 添加阴影效果 */
}

.cart-btn:hover {
  background: linear-gradient(45deg, #d48f23, #bf7e1a); /* 悬停时更深的渐变背景 */
  transform: translateY(-3px); /* 向上移动3像素，产生悬浮效果 */
  box-shadow: 0 10px 20px rgba(230, 162, 60, 0.3); /* 增强阴影效果 */
}

.compare-btn {
  background: white; /* 设置背景颜色为白色 */
  color: #409EFF; /* 设置文字颜色为蓝色 */
  border: 2px solid #409EFF; /* 添加2像素宽的蓝色边框 */
  border-radius: 23px; /* 设置边框圆角为23像素 */
}

.compare-btn:hover, .compare-btn.disabled {
  background: #409EFF; /* 悬停或禁用状态时背景色为蓝色 */
  color: white; /* 悬停或禁用状态时文字颜色为白色 */
  transform: translateY(-3px); /* 向上移动3像素，产生悬浮效果 */
  box-shadow: 0 8px 15px rgba(64, 158, 255, 0.2); /* 添加阴影效果 */
}

.compare-btn.disabled {
  cursor: pointer; /* 保持可点击状态 */
}

.favorite-btn {
  background: white; /* 设置背景颜色为白色 */
  color: #f56c6c; /* 设置文字颜色为红色 */
  border: 2px solid #f56c6c; /* 添加2像素宽的红色边框 */
}

.favorite-btn:hover, .favorite-btn.is-active {
  background: #f56c6c; /* 悬停或激活状态时背景色为红色 */
  color: white; /* 悬停或激活状态时文字颜色为白色 */
  transform: translateY(-3px); /* 向上移动3像素，产生悬浮效果 */
  box-shadow: 0 8px 15px rgba(245, 108, 108, 0.2); /* 添加阴影效果 */
}

.favorite-btn.is-active {
  animation: pulse 1s infinite; /* 应用名为pulse的动画，持续1秒，无限循环 */
}

@keyframes pulse {
  0% { transform: scale(1); } /* 动画开始时缩放比例为1 */
  50% { transform: scale(1.02); } /* 动画中间时缩放比例为1.02 */
  100% { transform: scale(1); } /* 动画结束时缩放比例为1 */
}

.tabs {
  margin-top: 30px; /* 设置上边距为30像素 */
  border: 1px solid #e4e7ed; /* 添加1像素宽的浅灰色边框 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.tab-header {
  display: flex; /* 使用弹性布局 */
  background: #f5f7fa; /* 设置背景颜色为浅灰色 */
}

.tab-item {
  padding: 15px 20px; /* 设置内边距，上下15像素，左右20像素 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  font-weight: 500; /* 设置字体粗细为500 */
  color: #606266; /* 设置文字颜色为灰色 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
  position: relative; /* 设置相对定位，为after伪元素提供参考点 */
}

.tab-item:hover {
  color: #42b983; /* 悬停时文字颜色变为绿色 */
}

.tab-item.active {
  color: #42b983; /* 激活状态时文字颜色为绿色 */
  background: white; /* 激活状态时背景色为白色 */
}

.tab-item.active::after {
  content: ""; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  bottom: 0; /* 底部对齐 */
  left: 0; /* 左侧对齐 */
  right: 0; /* 右侧对齐 */
  height: 3px; /* 设置高度为3像素 */
  background: #42b983; /* 设置背景颜色为绿色 */
}

.tab-content {
  padding: 20px;
}

.specs-row {
  display: flex; /* 使用弹性布局 */
  flex-wrap: wrap; /* 允许元素换行 */
  gap: 20px; /* 设置元素间距为20像素 */
  margin-bottom: 30px; /* 设置下边距为30像素 */
}

.spec-card {
  flex: 1; /* 弹性增长系数为1 */
  min-width: 180px; /* 设置最小宽度为180像素 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 15px; /* 设置元素间距为15像素 */
  padding: 15px; /* 设置内边距为15像素 */
  background: #f8f9fa; /* 设置背景颜色为浅灰色 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
}

.spec-card:hover {
  background: #eef5ff; /* 悬停时背景色变为浅蓝色 */
  transform: translateY(-5px); /* 向上移动5像素，产生悬浮效果 */
}

.spec-icon {
  font-size: 24px; /* 设置字体大小为24像素 */
  color: #409EFF; /* 设置文字颜色为蓝色 */
}

.spec-detail {
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
}

.spec-label {
  color: #909399; /* 设置文字颜色为灰色 */
  font-size: 14px; /* 设置字体大小为14像素 */
}

.spec-value {
  color: #303133; /* 设置文字颜色为深灰色 */
  font-weight: 600; /* 设置字体粗细为600 */
  font-size: 16px; /* 设置字体大小为16像素 */
}

.section-subtitle {
  font-size: 18px; /* 设置字体大小为18像素 */
  font-weight: 600; /* 设置字体粗细为600 */
  color: #303133; /* 设置文字颜色为深灰色 */
  margin: 20px 0 15px; /* 设置上边距为20像素，下边距为15像素 */
  padding-left: 10px; /* 设置左内边距为10像素 */
  border-left: 4px solid #42b983; /* 添加4像素宽的绿色左边框 */
}

.performance-bars {
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  gap: 15px; /* 设置元素间距为15像素 */
}

.performance-item {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 15px; /* 设置元素间距为15像素 */
}

.perf-label {
  width: 70px; /* 设置宽度为70像素 */
  font-weight: 500; /* 设置字体粗细为500 */
  color: #606266; /* 设置文字颜色为灰色 */
}

.perf-bar-container {
  flex-grow: 1; /* 允许元素占据剩余空间 */
  height: 12px; /* 设置高度为12像素 */
  background: rgba(0, 0, 0, 0.05); /* 设置半透明背景 */
  border-radius: 6px; /* 设置边框圆角为6像素 */
  overflow: hidden; /* 隐藏溢出内容 */
  position: relative; /* 设置相对定位，为子元素提供参考点 */
}

.perf-bar {
  height: 100%; /* 高度占满父元素 */
  background: linear-gradient(90deg, #42b983, #33a06f); /* 从左到右的渐变背景 */
  border-radius: 6px; /* 设置边框圆角为6像素 */
  transition: width 1s ease; /* 添加宽度变化的过渡效果 */
}

.perf-value {
  position: absolute; /* 设置绝对定位 */
  right: 10px; /* 右侧位置偏移10像素 */
  top: 50%; /* 顶部位置为父元素的50% */
  transform: translateY(-50%); /* 垂直居中 */
  font-size: 12px; /* 设置字体大小为12像素 */
  font-weight: 600; /* 设置字体粗细为600 */
  color: #606266; /* 设置文字颜色为灰色 */
}

.features-list {
  list-style: none; /* 移除列表默认样式 */
  padding: 0; /* 移除内边距 */
  margin: 0; /* 移除外边距 */
}

.feature-item {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 设置元素间距为10像素 */
  margin-bottom: 15px; /* 设置下边距为15像素 */
  padding-bottom: 15px; /* 设置底部内边距为15像素 */
  border-bottom: 1px dotted #ebeef5; /* 添加1像素宽的点状浅灰色底边框 */
}

.feature-item:last-child {
  border-bottom: none; /* 移除最后一个元素的底边框 */
}

.feature-marker {
  width: 24px; /* 设置宽度为24像素 */
  height: 24px; /* 设置高度为24像素 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  background: #edf9f0; /* 设置背景颜色为浅绿色 */
  color: #42b983; /* 设置文字颜色为绿色 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  font-size: 12px; /* 设置字体大小为12像素 */
  font-weight: bold; /* 设置字体为粗体 */
}

.feature-text {
  color: #606266; /* 设置文字颜色为灰色 */
  font-size: 16px; /* 设置字体大小为16像素 */
}

/* 使用场景标签 */
.usage-section {
  margin-top: 30px; /* 设置上边距为30像素 */
}

.usage-tags {
  display: flex; /* 使用弹性布局 */
  flex-wrap: wrap; /* 允许元素换行 */
  gap: 10px; /* 设置元素间距为10像素 */
}

.usage-tag {
  padding: 8px 16px; /* 设置内边距，上下8像素，左右16像素 */
  background: #f0f9eb; /* 设置背景颜色为浅绿色 */
  color: #67c23a; /* 设置文字颜色为绿色 */
  border-radius: 20px; /* 设置边框圆角为20像素 */
  font-size: 14px; /* 设置字体大小为14像素 */
  font-weight: 500; /* 设置字体粗细为500 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
}

.usage-tag:hover {
  transform: translateY(-3px); /* 向上移动3像素，产生悬浮效果 */
  box-shadow: 0 5px 15px rgba(103, 194, 58, 0.2); /* 添加阴影效果 */
}

/* 相关推荐样式 */
.similar-phones {
  margin-top: 50px; /* 设置上边距为50像素 */
  padding-top: 30px; /* 设置顶部内边距为30像素 */
  border-top: 1px solid #ebeef5; /* 添加1像素宽的浅灰色顶边框 */
}

.section-title {
  font-size: 24px; /* 设置字体大小为24像素 */
  font-weight: 600; /* 设置字体粗细为600 */
  color: #303133; /* 设置文字颜色为深灰色 */
  margin-bottom: 20px; /* 设置下边距为20像素 */
  text-align: center; /* 文字居中对齐 */
  position: relative; /* 设置相对定位，为after伪元素提供参考点 */
}

.section-title::after {
  content: ""; /* 为伪元素添加内容 */
  display: block; /* 设置为块级元素 */
  width: 60px; /* 设置宽度为60像素 */
  height: 4px; /* 设置高度为4像素 */
  background: #42b983; /* 设置背景颜色为绿色 */
  margin: 10px auto; /* 设置上下边距为10像素，左右自动居中 */
}

.similar-phones-grid {
  display: grid; /* 使用网格布局 */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* 设置自适应列宽，最小200像素 */
  gap: 25px; /* 设置元素间距为25像素 */
}

.similar-phone-card {
  background: white; /* 设置背景颜色为白色 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
  overflow: hidden; /* 隐藏溢出内容 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08); /* 添加阴影效果 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

.similar-phone-card:hover {
  transform: translateY(-10px); /* 向上移动10像素，产生悬浮效果 */
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15); /* 增强阴影效果 */
}

.similar-phone-image {
  width: 100%; /* 宽度占满父元素 */
  height: 150px; /* 设置高度为150像素 */
  object-fit: contain; /* 保持图片比例，确保完整显示 */
  padding: 15px; /* 设置内边距为15像素 */
  background: #f8f9fa; /* 设置背景颜色为浅灰色 */
}

.similar-phone-info {
  padding: 12px; /* 设置内边距为12像素 */
}

.similar-phone-name {
  font-size: 14px; /* 设置字体大小为14像素 */
  font-weight: 500; /* 设置字体粗细为500 */
  color: #303133; /* 设置文字颜色为深灰色 */
  white-space: nowrap; /* 文本不换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 使用省略号表示溢出的内容 */
}

.similar-phone-price {
  font-size: 16px; /* 设置字体大小为16像素 */
  font-weight: 700; /* 设置字体粗细为700 */
  color: #f56c6c; /* 设置文字颜色为红色 */
  margin-top: 5px; /* 设置上边距为5像素 */
}

.primary-btn, .secondary-btn {
  padding: 10px 20px; /* 设置内边距，上下10像素，左右20像素 */
  border: none; /* 移除边框 */
  border-radius: 6px; /* 设置边框圆角为6像素 */
  font-weight: 500; /* 设置字体粗细为500 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
  margin: 10px 5px; /* 设置外边距，上下10像素，左右5像素 */
}

.primary-btn {
  background: #409EFF; /* 设置背景颜色为蓝色 */
  color: white; /* 设置文字颜色为白色 */
}

.primary-btn:hover {
  background: #337ecc; /* 悬停时背景色变深 */
}

.secondary-btn {
  background: #f4f4f5; /* 设置背景颜色为浅灰色 */
  color: #606266; /* 设置文字颜色为灰色 */
}

.secondary-btn:hover {
  background: #e9e9eb; /* 悬停时背景色变深 */
}

.phone-carousel {
  width: 100%; /* 宽度占满父元素 */
  border-radius: 20px; /* 设置边框圆角为20像素 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.color-selector {
  margin-top: 20px; /* 设置上边距为20像素 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 15px; /* 设置元素间距为15像素 */
}

.color-title {
  font-size: 14px; /* 设置字体大小为14像素 */
  color: #606266; /* 设置文字颜色为灰色 */
  font-weight: 500; /* 设置字体粗细为500 */
}

.color-options {
  display: flex; /* 使用弹性布局 */
  gap: 10px; /* 设置元素间距为10像素 */
}

.color-option {
  width: 30px; /* 设置宽度为30像素 */
  height: 30px; /* 设置高度为30像素 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  position: relative; /* 设置相对定位，为after伪元素提供参考点 */
}

.color-option.active {
  transform: scale(1.2); /* 放大1.2倍 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 增强阴影效果 */
}

.color-option.active::after {
  content: ""; /* 为伪元素添加内容 */
  position: absolute; /* 设置绝对定位 */
  width: 36px; /* 设置宽度为36像素 */
  height: 36px; /* 设置高度为36像素 */
  border: 2px solid currentColor; /* 添加2像素宽的边框，颜色与当前元素文字颜色相同 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  top: -5px; /* 顶部位置偏移-5像素 */
  left: -5px; /* 左侧位置偏移-5像素 */
}

.purchase-options {
  background: #f8f9fa; /* 设置背景颜色为浅灰色 */
  padding: 15px; /* 设置内边距为15像素 */
  border-radius: 12px; /* 设置边框圆角为12像素 */
  margin: 15px 0; /* 设置上下边距为15像素，左右为0 */
}

.memory-options {
  margin-bottom: 15px; /* 设置下边距为15像素 */
}

.memory-title {
  display: block; /* 设置为块级元素 */
  margin-bottom: 10px; /* 设置下边距为10像素 */
  font-size: 14px; /* 设置字体大小为14像素 */
  color: #606266; /* 设置文字颜色为灰色 */
  font-weight: 500; /* 设置字体粗细为500 */
}

.memory-selector {
  display: flex; /* 使用弹性布局 */
  flex-wrap: wrap; /* 允许元素换行 */
  gap: 10px; /* 设置元素间距为10像素 */
}

.memory-btn {
  padding: 8px 16px; /* 设置内边距，上下8像素，左右16像素 */
  border: 1px solid #dcdfe6; /* 添加1像素宽的浅灰色边框 */
  background: white; /* 设置背景颜色为白色 */
  border-radius: 6px; /* 设置边框圆角为6像素 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: all 0.3s ease; /* 所有属性变化添加0.3秒过渡效果 */
  font-size: 14px; /* 设置字体大小为14像素 */
  color: #606266; /* 设置文字颜色为灰色 */
  min-width: 80px; /* 设置最小宽度为80像素 */
  text-align: center; /* 文字居中对齐 */
}

.memory-btn.active {
  border-color: #409EFF; /* 激活状态时边框颜色为蓝色 */
  color: #409EFF; /* 激活状态时文字颜色为蓝色 */
  background: #ecf5ff; /* 激活状态时背景色为浅蓝色 */
}

.memory-btn:hover {
  border-color: #c6e2ff; /* 悬停时边框颜色变浅 */
}

.delivery-options {
  border-top: 1px dashed #dcdfe6; /* 添加1像素宽的虚线顶边框 */
  padding-top: 15px; /* 设置顶部内边距为15像素 */
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  gap: 10px; /* 设置元素间距为10像素 */
}

.delivery-item {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 8px; /* 设置元素间距为8像素 */
  font-size: 14px; /* 设置字体大小为14像素 */
  color: #606266; /* 设置文字颜色为灰色 */
}

.change-link {
  color: #409EFF; /* 设置文字颜色为蓝色 */
  text-decoration: none; /* 移除下划线 */
  margin-left: 5px; /* 设置左边距为5像素 */
}

.change-link:hover {
  color: #337ecc; /* 悬停时文字颜色变深 */
  text-decoration: underline; /* 添加下划线 */
}

/* 评价部分样式 */
.add-review {
  margin-bottom: 30px; /* 设置下边距为30像素 */
  padding: 15px; /* 设置内边距为15像素 */
  background: #f8f9fa; /* 设置背景颜色为浅灰色 */
  border-radius: 10px; /* 设置边框圆角为10像素 */
}

.add-review h5 {
  margin: 0 0 15px; /* 设置上边距为0，下边距为15像素 */
  font-size: 16px; /* 设置字体大小为16像素 */
  color: #303133; /* 设置文字颜色为深灰色 */
}

.review-form {
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
  gap: 15px; /* 设置元素间距为15像素 */
}

.review-rating {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 设置元素间距为10像素 */
}

.reviews-list {
  margin-top: 20px; /* 设置上边距为20像素 */
}

.no-reviews {
  text-align: center; /* 文字居中对齐 */
  padding: 20px; /* 设置内边距为20像素 */
  color: #909399; /* 设置文字颜色为灰色 */
  font-style: italic; /* 设置字体为斜体 */
}

.review-item {
  padding: 15px; /* 设置内边距为15像素 */
  border-bottom: 1px solid #ebeef5; /* 添加1像素宽的浅灰色底边框 */
  margin-bottom: 15px; /* 设置下边距为15像素 */
}

.review-header {
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 两端对齐 */
  align-items: flex-start; /* 顶部对齐 */
  margin-bottom: 10px; /* 设置下边距为10像素 */
}

.reviewer-info {
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  gap: 10px; /* 设置元素间距为10像素 */
}

.reviewer-avatar {
  width: 40px; /* 设置宽度为40像素 */
  height: 40px; /* 设置高度为40像素 */
  background: #409EFF; /* 设置背景颜色为蓝色 */
  color: white; /* 设置文字颜色为白色 */
  border-radius: 50%; /* 设置边框圆角为50%，形成圆形 */
  display: flex; /* 使用弹性布局 */
  align-items: center; /* 垂直居中对齐 */
  justify-content: center; /* 水平居中对齐 */
  font-weight: bold; /* 设置字体为粗体 */
  font-size: 18px; /* 设置字体大小为18像素 */
}

.reviewer-details {
  display: flex; /* 使用弹性布局 */
  flex-direction: column; /* 垂直排列子元素 */
}

.reviewer-name {
  font-weight: 500; /* 设置字体粗细为500 */
  color: #303133; /* 设置文字颜色为深灰色 */
}

.review-date {
  font-size: 12px; /* 设置字体大小为12像素 */
  color: #909399; /* 设置文字颜色为灰色 */
}

.review-content {
  color: #606266; /* 设置文字颜色为灰色 */
  line-height: 1.6; /* 设置行高为1.6倍字体大小 */
}

@media (max-width: 900px) {
  .detail-content {
    flex-direction: column; /* 垂直排列子元素 */
  }
  
  .content-wrapper {
    padding: 20px; /* 设置内边距为20像素 */
  }
  
  .phone-showcase {
    height: 320px; /* 设置高度为320像素 */
  }
  
  .phone-name {
    font-size: 28px; /* 设置字体大小为28像素 */
  }
  
  .header-bar h1 {
    font-size: 20px; /* 设置字体大小为20像素 */
  }
  
  .similar-phones-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); /* 设置自适应列宽，最小150像素 */
    gap: 15px; /* 设置元素间距为15像素 */
  }
}

@media (max-width: 600px) {
  .specs-row {
    flex-direction: column; /* 垂直排列子元素 */
  }
  
  .action-buttons {
    grid-template-columns: 1fr; /* 设置单列布局 */
  }
  
  .buy-btn {
    grid-column: span 1; /* 占据一列 */
  }
  
  .phone-showcase {
    height: 280px; /* 设置高度为280像素 */
  }
  
  .similar-phones-grid {
    grid-template-columns: repeat(2, 1fr); /* 设置两列等宽布局 */
  }
  
  .tab-item {
    padding: 10px 15px; /* 设置内边距，上下10像素，左右15像素 */
    font-size: 14px; /* 设置字体大小为14像素 */
  }
}
</style>