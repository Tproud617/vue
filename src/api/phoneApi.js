import phonesData from '@/data/phones.json'
import { getItem, setItem } from '@/utils/storage'

// 存储键名
const STORAGE_KEYS = {
  PHONES: 'phones',
  USER_PREFERENCES: 'user_preferences'
}

/**
 * 模拟API延迟
 * @param {number} ms - 延迟毫秒数
 * @returns {Promise} Promise对象
 */
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * 获取所有手机数据
 * @returns {Promise<Array>} 手机数据数组
 */
export const getAllPhones = async () => {
  // 优先从localStorage获取
  const storedPhones = getItem(STORAGE_KEYS.PHONES)
  
  // 如果localStorage中有数据，直接返回
  if (storedPhones && Array.isArray(storedPhones) && storedPhones.length > 0) {
    await delay(300) // 模拟API延迟
    return storedPhones
  }
  
  // 否则使用JSON文件中的数据，并存入localStorage
  await delay(500) // 模拟首次加载较长的延迟
  setItem(STORAGE_KEYS.PHONES, phonesData)
  return phonesData
}

/**
 * 获取指定ID的手机详情
 * @param {number} id - 手机ID
 * @returns {Promise<Object|null>} 手机详情对象或null
 */
export const getPhoneById = async (id) => {
  const phones = await getAllPhones()
  await delay(200)
  return phones.find(phone => phone.id === Number(id)) || null
}

/**
 * 根据筛选条件获取手机
 * @param {Object} filters - 筛选条件对象
 * @returns {Promise<Array>} 过滤后的手机数组
 */
export const getPhonesByFilters = async (filters = {}) => {
  const phones = await getAllPhones()
  await delay(400)
  
  // 如果没有筛选条件，返回所有手机
  if (!filters || Object.keys(filters).length === 0) {
    return phones
  }
  
  // 应用筛选条件
  return phones.filter(phone => {
    // 按价格筛选
    if (filters.maxPrice && phone.price > filters.maxPrice) {
      return false
    }
    
    // 按品牌筛选
    if (filters.brands && filters.brands.length > 0) {
      if (!filters.brands.includes(phone.brand)) {
        return false
      }
    }
    
    // 按存储容量筛选
    if (filters.minStorage && phone.storage < filters.minStorage) {
      return false
    }
    
    return true
  })
}

/**
 * 获取所有可用品牌
 * @returns {Promise<Array>} 品牌数组
 */
export const getAllBrands = async () => {
  const phones = await getAllPhones()
  await delay(200)
  return [...new Set(phones.map(phone => phone.brand))]
}

/**
 * 保存用户偏好
 * @param {Object} preferences - 用户偏好对象
 * @returns {Promise<boolean>} 是否保存成功
 */
export const saveUserPreferences = async (preferences) => {
  await delay(300)
  return setItem(STORAGE_KEYS.USER_PREFERENCES, preferences)
}

/**
 * 获取用户偏好
 * @returns {Promise<Object|null>} 用户偏好对象或null
 */
export const getUserPreferences = async () => {
  await delay(200)
  return getItem(STORAGE_KEYS.USER_PREFERENCES, null)
}

/**
 * 添加新手机（模拟）
 * @param {Object} newPhone - 新手机对象
 * @returns {Promise<Object>} 添加的手机对象（带ID）
 */
export const addPhone = async (newPhone) => {
  const phones = await getAllPhones()
  await delay(600)
  
  // 生成新ID
  const newId = Math.max(...phones.map(p => p.id)) + 1
  
  // 创建新手机对象
  const phoneWithId = {
    ...newPhone,
    id: newId
  }
  
  // 添加到数组
  phones.push(phoneWithId)
  
  // 更新localStorage
  setItem(STORAGE_KEYS.PHONES, phones)
  
  return phoneWithId
} 