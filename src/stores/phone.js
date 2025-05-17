import { defineStore } from 'pinia'
import * as phoneApi from '@/api/phoneApi'

// 手机推荐系统的状态管理
export const usePhoneStore = defineStore('phone', {
  // 状态
  state: () => ({
    // 用户偏好
    preferences: {
      budget: 0, // 预算
      brand: [], // 品牌偏好
      camera: 0, // 相机重要性 (1-5)
      performance: 0, // 性能重要性 (1-5)
      battery: 0, // 电池重要性 (1-5)
      storage: 0, // 存储需求 (GB)
      screen: 0, // 屏幕尺寸偏好
      usage: [] // 使用场景 ['游戏', '拍照', '社交', '办公' ...]
    },
    
    // 推荐结果
    recommendations: [],
    
    // 加载状态
    loading: false,
    
    // 手机数据相关状态
    phonesData: [],
    phonesLoading: false,
    phonesError: null,
    
    // 品牌列表
    brands: [],
    brandsLoading: false
  }),
  
  // 计算属性
  getters: {
    // 获取符合预算的手机
    phonesWithinBudget: (state) => {
      if (!state.preferences.budget) return state.phonesData
      return state.phonesData.filter(phone => phone.price <= state.preferences.budget)
    },
    
    // 获取符合品牌偏好的手机
    phonesByBrand: (state) => {
      if (!state.preferences.brand.length) return state.phonesData
      return state.phonesData.filter(phone => 
        state.preferences.brand.includes(phone.brand)
      )
    },
    
    // 获取所有可用品牌
    availableBrands: (state) => {
      return state.brands
    },

    // 获取符合筛选条件的手机
    filteredPhones: (state) => {
      let result = state.phonesData

      // 应用品牌筛选
      if (state.preferences.brand.length > 0) {
        result = result.filter(phone => state.preferences.brand.includes(phone.brand))
      }

      // 应用预算筛选
      if (state.preferences.budget > 0) {
        result = result.filter(phone => phone.price <= state.preferences.budget)
      }

      return result
    }
  },
  
  // 方法/操作
  actions: {
    // 初始化数据
    async initialize() {
      this.loadPhones()
      this.loadBrands()
      await this.loadUserPreferences()
    },
    
    // 加载手机数据
    async loadPhones() {
      try {
        this.phonesLoading = true
        this.phonesError = null
        this.phonesData = await phoneApi.getAllPhones()
      } catch (error) {
        console.error('加载手机数据失败:', error)
        this.phonesError = '无法加载手机数据，请稍后再试'
      } finally {
        this.phonesLoading = false
      }
    },
    
    // 加载品牌列表
    async loadBrands() {
      try {
        this.brandsLoading = true
        this.brands = await phoneApi.getAllBrands()
      } catch (error) {
        console.error('加载品牌列表失败:', error)
      } finally {
        this.brandsLoading = false
      }
    },
    
    // 加载用户偏好
    async loadUserPreferences() {
      const savedPreferences = await phoneApi.getUserPreferences()
      if (savedPreferences) {
        this.preferences = savedPreferences
      }
    },
    
    // 设置用户偏好
    async setPreference(key, value) {
      this.preferences[key] = value
      // 保存到localStorage
      await phoneApi.saveUserPreferences(this.preferences)
    },
    
    // 重置用户偏好
    async resetPreferences() {
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
      this.recommendations = []
      // 保存到localStorage
      await phoneApi.saveUserPreferences(this.preferences)
    },
    
    // 根据用户偏好生成推荐
    async generateRecommendations() {
      this.loading = true
      
      try {
        // 确保数据已加载
        if (this.phonesData.length === 0) {
          await this.loadPhones()
        }
        
        // 获取筛选后的手机列表
        const filteredPhones = this.filteredPhones
        
        // 计算每台手机的匹配分数
        const recommendations = filteredPhones.map(phone => {
          let score = 0
          
          // 预算符合度 (预算越接近满分越高)
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
          
          // 功能匹配度（权重加倍以突出重要性）
          if (this.preferences.camera) {
            score += (phone.camera * this.preferences.camera) * 0.4
          }
          
          if (this.preferences.performance) {
            score += (phone.performance * this.preferences.performance) * 0.4
          }
          
          if (this.preferences.battery) {
            score += (phone.battery * this.preferences.battery) * 0.4
          }

          // 存储匹配度
          if (this.preferences.storage) {
            score += phone.storage >= this.preferences.storage ? 5 : 
              (phone.storage / this.preferences.storage) * 5
          }

          // 屏幕尺寸匹配度
          if (this.preferences.screen) {
            const screenDiff = Math.abs(phone.screen - this.preferences.screen)
            score += Math.max(0, 5 - screenDiff)
          }

          // 使用场景匹配
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
        
        // 按匹配分数排序，保留所有结果
        this.recommendations = recommendations
          .sort((a, b) => b.matchScore - a.matchScore)
      } catch (error) {
        console.error('生成推荐失败:', error)
      } finally {
        this.loading = false
      }
    },
    
    // 添加手机到数据库
    async addPhone(phone) {
      try {
        const newPhone = await phoneApi.addPhone(phone)
        // 更新本地数据
        this.phonesData.push(newPhone)
        // 重新加载品牌列表（如果添加了新品牌）
        this.loadBrands()
        return newPhone
      } catch (error) {
        console.error('添加手机失败:', error)
        throw error
      }
    },
    
    // 获取单个手机详情
    async getPhoneDetail(id) {
      try {
        return await phoneApi.getPhoneById(id)
      } catch (error) {
        console.error(`获取ID${id}的手机详情失败:`, error)
        throw error
      }
    }
  }
})