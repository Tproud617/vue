/**
 * 本地存储工具类
 * 提供localStorage操作的统一接口
 */

// 存储前缀，避免命名冲突
const STORAGE_PREFIX = 'phone_rec_'

/**
 * 存储数据到localStorage
 * @param {string} key - 存储键名
 * @param {any} value - 要存储的数据
 */
export const setItem = (key, value) => {
  try {
    const prefixedKey = STORAGE_PREFIX + key
    // 对象和数组转为JSON字符串存储
    const storageValue = typeof value === 'object' 
      ? JSON.stringify(value) 
      : value
    
    localStorage.setItem(prefixedKey, storageValue)
    return true
  } catch (error) {
    console.error('存储数据失败:', error)
    return false
  }
}

/**
 * 从localStorage获取数据
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值，当获取失败时返回
 * @returns {any} 获取的数据或默认值
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const prefixedKey = STORAGE_PREFIX + key
    const value = localStorage.getItem(prefixedKey)
    
    if (value === null) return defaultValue
    
    // 尝试解析JSON
    try {
      return JSON.parse(value)
    } catch {
      // 不是JSON格式，直接返回原值
      return value
    }
  } catch (error) {
    console.error('获取数据失败:', error)
    return defaultValue
  }
}

/**
 * 从localStorage删除数据
 * @param {string} key - 要删除的键名
 */
export const removeItem = (key) => {
  try {
    const prefixedKey = STORAGE_PREFIX + key
    localStorage.removeItem(prefixedKey)
    return true
  } catch (error) {
    console.error('删除数据失败:', error)
    return false
  }
}

/**
 * 清除所有本应用相关的localStorage数据
 */
export const clearAll = () => {
  try {
    // 只清除带有我们前缀的项
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
    return true
  } catch (error) {
    console.error('清除数据失败:', error)
    return false
  }
}

/**
 * 检查是否支持localStorage
 * @returns {boolean} 是否支持
 */
export const isLocalStorageSupported = () => {
  try {
    const testKey = STORAGE_PREFIX + 'test'
    localStorage.setItem(testKey, 'test')
    localStorage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
} 