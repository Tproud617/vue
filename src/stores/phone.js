import { defineStore } from 'pinia'
import phones from '@/data/phones.json'

// 手机推荐系统的状态管理
export const usePhoneStore = defineStore('phone', {
  // 状态
  state: () => ({
    // 用户偏好
    preferences: {
      budget: 0,
      brand: [],
      camera: 0,
      performance: 0,
      battery: 0,
      storage: 0,
      screen: 0,
      usage: []
    },
    
    // 手机数据
    phones: phones,
    
    // 推荐结果
    recommendations: [],
    
    // UI 状态
    loading: false,
    
    // 筛选和排序
    sortBy: 'price',
    sortOrder: 'asc',
    
    // 对比列表
    compareList: [],
    
    // 收藏列表
    favoriteList: []
  }),
  
  // 计算属性
  getters: {
    // 获取所有可用品牌
    availableBrands: (state) => {
      return [...new Set(state.phones.map(phone => phone.brand))]
    },

    // 获取筛选后的手机列表
    filteredPhones: (state) => {
      let result = state.phones

      // 按品牌筛选
      if (state.preferences.brand.length > 0) {
        result = result.filter(phone => state.preferences.brand.includes(phone.brand))
      }

      // 按预算筛选
      if (state.preferences.budget > 0) {
        result = result.filter(phone => phone.price <= state.preferences.budget)
      }

      // 排序
      return result.sort((a, b) => {
        const factor = state.sortOrder === 'asc' ? 1 : -1
        return (a[state.sortBy] - b[state.sortBy]) * factor
      })
    },

    // 获取对比列表中的手机
    comparePhones: (state) => {
      return state.compareList.map(id => state.phones.find(phone => phone.id === id))
    },
    
    // 获取收藏列表中的手机
    favoritePhones: (state) => {
      return state.favoriteList.map(id => state.phones.find(phone => phone.id === id))
    }
  },
  
  // 方法/操作
  actions: {
    // 更新偏好设置
    updatePreferences(preferences) {
      this.preferences = { ...this.preferences, ...preferences }
      // 自动保存到 localStorage
      localStorage.setItem('userPreferences', JSON.stringify(this.preferences))
    },

    // 更新排序方式
    updateSort(sortBy, sortOrder = 'asc') {
      this.sortBy = sortBy
      this.sortOrder = sortOrder
    },

    // 重置所有设置
    reset() {
      this.preferences = {
        budget: 0,
        brand: [],
        camera: 0,
        performance: 0,
        battery: 0,
        storage: 0,
        screen: 0,
        usage: []
      }
      this.sortBy = 'price'
      this.sortOrder = 'asc'
      this.recommendations = []
      localStorage.removeItem('userPreferences')
    },

    // 添加手机到对比列表
    addToCompare(phoneId) {
      if (!this.compareList.includes(phoneId) && this.compareList.length < 4) {
        this.compareList.push(phoneId)
        // 保存到 localStorage
        localStorage.setItem('compareList', JSON.stringify(this.compareList))
        return true
      }
      return false
    },
    
    // 从对比列表中移除手机
    removeFromCompare(phoneId) {
      const index = this.compareList.indexOf(phoneId)
      if (index > -1) {
        this.compareList.splice(index, 1)
        // 更新 localStorage
        localStorage.setItem('compareList', JSON.stringify(this.compareList))
        return true
      }
      return false
    },
    
    // 清空对比列表
    clearCompareList() {
      this.compareList = []
      localStorage.removeItem('compareList')
    },
    
    // 添加手机到收藏列表
    addToFavorite(phoneId) {
      if (!this.favoriteList.includes(phoneId)) {
        this.favoriteList.push(phoneId)
        // 保存到 localStorage
        localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
        return true
      }
      return false
    },
    
    // 从收藏列表中移除手机
    removeFromFavorite(phoneId) {
      const index = this.favoriteList.indexOf(phoneId)
      if (index > -1) {
        this.favoriteList.splice(index, 1)
        // 更新 localStorage
        localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList))
        return true
      }
      return false
    },
    
    // 切换收藏状态
    toggleFavorite(phoneId) {
      if (this.favoriteList.includes(phoneId)) {
        return this.removeFromFavorite(phoneId)
      } else {
        return this.addToFavorite(phoneId)
      }
    },
    
    // 清空收藏列表
    clearFavoriteList() {
      this.favoriteList = []
      localStorage.removeItem('favoriteList')
    },
    
    // 切换对比状态
    toggleCompare(phoneId) {
      if (this.compareList.includes(phoneId)) {
        return this.removeFromCompare(phoneId)
      } else {
        return this.addToCompare(phoneId)
      }
    },
    
    // 初始化
    initialize() {
      // 从 localStorage 加载用户偏好
      const savedPreferences = localStorage.getItem('userPreferences')
      if (savedPreferences) {
        this.preferences = JSON.parse(savedPreferences)
      }
      
      // 从 localStorage 加载对比列表
      const savedCompareList = localStorage.getItem('compareList')
      if (savedCompareList) {
        this.compareList = JSON.parse(savedCompareList)
      }
      
      // 从 localStorage 加载收藏列表
      const savedFavoriteList = localStorage.getItem('favoriteList')
      if (savedFavoriteList) {
        this.favoriteList = JSON.parse(savedFavoriteList)
      }
    },
    
    // 根据用户偏好生成推荐
    generateRecommendations() {
      this.loading = true
      
      try {
        // 获取筛选后的手机列表
        const filteredPhones = this.filteredPhones
        
        // 计算每台手机的匹配分数
        const recommendations = filteredPhones.map(phone => {
          let score = 0
          
          // 预算符合度
          if (this.preferences.budget) {
            const budgetScore = phone.price <= this.preferences.budget ? 
              5 - Math.min(5, (this.preferences.budget - phone.price) / 1000) : 0
            score += budgetScore
          }
          
          // 品牌匹配
          if (this.preferences.brand.length) {
            if (this.preferences.brand.includes(phone.brand)) {
              score += 5
            }
          }
          
          // 功能匹配度
          if (this.preferences.camera) {
            score += (phone.camera * this.preferences.camera) * 0.4
          }
          
          if (this.preferences.performance) {
            score += (phone.performance * this.preferences.performance) * 0.4
          }
          
          if (this.preferences.battery) {
            score += (phone.battery * this.preferences.battery) * 0.4
          }

          if (this.preferences.storage) {
            score += phone.storage >= this.preferences.storage ? 5 : 
              (phone.storage / this.preferences.storage) * 5
          }

          if (this.preferences.screen) {
            const screenDiff = Math.abs(phone.screen - this.preferences.screen)
            score += Math.max(0, 5 - screenDiff)
          }

          if (this.preferences.usage.length > 0) {
            const matchingUsages = phone.usage.filter(u => 
              this.preferences.usage.includes(u)
            ).length
            score += (matchingUsages / this.preferences.usage.length) * 5
          }
          
          return {
            ...phone,
            matchScore: score
          }
        })
        
        // 按匹配分数排序
        this.recommendations = recommendations.sort((a, b) => b.matchScore - a.matchScore)
      } finally {
        this.loading = false
      }
    },

    // 获取手机详情
    getPhoneDetail(id) {
      return this.phones.find(phone => phone.id === id) || null
    }
  }
})