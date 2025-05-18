<template>
  <div class="about-view">
    <el-container>
      <el-header>
        <h1 class="header-title">关于我们</h1>
      </el-header>
      
      <el-main>
        <el-row>
          <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="12" class="content-col">
            <el-card class="about-card" shadow="hover">
              <div class="card-content">
                <div class="icon-container">
                  <el-icon :size="60" color="#42b983"><info-filled /></el-icon>
                </div>
                
                <h2 class="sub-title">手机推荐系统</h2>
                
                <div class="info-section">
                  <h3>系统说明</h3>
                  <p>本系统收录2023-2024年主流手机型号数据，帮助用户根据个人偏好和需求找到最适合的手机型号。</p>
                </div>
                
                <div class="info-section">
                  <h3>数据来源</h3>
                  <p>数据来源于各大厂商官网公开信息、专业评测机构及用户反馈。我们每周更新数据，确保信息准确性。</p>
                </div>
                
                <div class="info-section">
                  <h3>推荐算法</h3>
                  <p>我们的推荐算法基于用户偏好、手机参数匹配度和性价比综合评分，为用户提供个性化的购机建议。</p>
                </div>
                
                <div class="info-section">
                  <h3>联系我们</h3>
                  <p>如有问题或建议，请发送邮件至：<a href="mailto:Tproud617@qq.com">Tproud617@qq.com</a></p>
                </div>
                
                <div class="actions">
                  <el-button type="primary" @click="goHome">返回首页</el-button>
                  <el-button @click="goRecommend">开始推荐</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { InfoFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goRecommend = () => {
  router.push('/recommend')
}
</script>

<style scoped>
.about-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.el-header {
  display: flex;
  align-items: center;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-col {
  margin: 0 auto;
}

.about-card {
  margin: 20px 0;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s;
}

.about-card:hover {
  transform: translateY(-5px);
}

.card-content {
  padding: 20px;
  text-align: center;
}

.icon-container {
  margin: 20px 0;
}

.sub-title {
  font-size: 1.8rem;
  color: #303133;
  margin-bottom: 30px;
}

.info-section {
  margin-bottom: 24px;
  text-align: left;
  padding: 0 16px;
}

.info-section h3 {
  font-size: 1.25rem;
  color: #42b983;
  margin-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 8px;
}

.info-section p {
  color: #606266;
  line-height: 1.6;
  margin: 0;
}

.info-section a {
  color: #409eff;
  text-decoration: none;
}

.actions {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  gap: 16px;
}

@media (max-width: 768px) {
  .el-main {
    padding: 20px 10px;
  }
  
  .info-section {
    padding: 0 8px;
  }
  
  .actions {
    flex-wrap: wrap;
  }
}
</style>