<template>
  <div class="compare-view">
    <el-container>
      <el-header>
        <h1 class="header-title">手机对比</h1>
        <div class="header-actions">
          <el-button type="danger" @click="clearCompareList" :disabled="comparePhones.length === 0">
            清空对比列表
          </el-button>
        </div>
      </el-header>
      
      <el-main>
        <el-empty v-if="comparePhones.length === 0" description="对比列表为空">
          <el-button type="primary" @click="goToRecommend">去添加手机</el-button>
        </el-empty>
        
        <div v-else class="compare-container">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="property" label="属性" width="180" fixed="left" />
            <el-table-column 
              v-for="(phone, index) in comparePhones" 
              :key="phone.id"
              :label="phone.name"
              :prop="'phone' + index"
            >
              <template #header>
                <div class="phone-header">
                  <div>{{ phone.name }}</div>
                  <el-button 
                    type="danger" 
                    size="small" 
                    circle 
                    @click="removePhone(phone.id)"
                    class="remove-btn"
                  >
                    <i class="el-icon-close">✕</i>
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePhoneStore } from '@/stores/phone'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const phoneStore = usePhoneStore()

// 获取对比列表中的手机
const comparePhones = computed(() => phoneStore.comparePhones)

// 生成表格数据
const tableData = computed(() => {
  const properties = [
    { property: '品牌', key: 'brand' },
    { property: '价格', key: 'price', format: (val) => `¥${val.toLocaleString()}` },
    { property: '屏幕尺寸', key: 'screen', format: (val) => `${val}英寸` },
    { property: '存储容量', key: 'storage', format: (val) => `${val}GB` },
    { property: '相机评分', key: 'camera', format: (val) => `${val}星` },
    { property: '性能评分', key: 'performance', format: (val) => `${val}星` },
    { property: '电池评分', key: 'battery', format: (val) => `${val}星` },
    { property: '特性', key: 'features', format: (val) => val.join(', ') }
  ]
  
  return properties.map(prop => {
    const row = { property: prop.property }
    
    comparePhones.value.forEach((phone, index) => {
      const value = phone[prop.key]
      row['phone' + index] = prop.format ? prop.format(value) : value
    })
    
    return row
  })
})

// 移除手机
const removePhone = (phoneId) => {
  phoneStore.removeFromCompare(phoneId)
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
}

.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
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

.compare-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.phone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remove-btn {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .el-main {
    padding: 20px 10px;
  }
}
</style>