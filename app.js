// app.js
App({
    onLaunch() {
      // 展示本地存储能力
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
  
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
      // 初始化全局数据
      this.initGlobalData();
    },
  
    // 版本信息
    version: {
      code: '1.2.0',
      name: 'v1.2.0',
      description: '新增我的方案功能，支持方案保存和查看',
      updateTime: '2024-01-15'
    },
  
    initGlobalData() {
      let appData = wx.getStorageSync('appData');
      if (!appData) {
        appData = {
          // 用户信息
          userInfo: {
            name: '张明华',
            age: 68,
            gender: '男',
            phone: '138****1234',
            avatar: '张'
          },
          
          // 风险评估记录
          assessments: [],
          
          // 订单记录
          orders: [],
          
          // 保存的方案
          savedPlans: [],
          
          // 产品信息 - 精简版本
          products: [
            {
              id: 1,
              name: '骨固元乌药口服液',
              price: 98,
              description: '基于乌药抗骨质疏松专利技术，科学配方改善骨密度',
              features: [
                '乌药抗骨质疏松专利技术',
                '口服液剂型，易于吸收',
                '普惠定价，服务社区健康',
                '专业健康服务体系支持'
              ],
              suitable: '适宜人群：50岁及以上中老年人、骨质疏松风险人群'
            }
          ],
          
          // 健康科普文章
          articles: [
            {
              id: 1,
              title: '预防骨质疏松，从日常饮食开始',
              category: '健康科普',
              readCount: '1.2万',
              content: '钙质是骨骼健康的基础，建议每日摄入足够的奶制品、豆制品和深绿色蔬菜。维生素D有助于钙的吸收，适当晒太阳也很重要。',
              publishTime: '2024-01-10'
            },
            {
              id: 2,
              title: '适合中老年人的骨骼健康运动',
              category: '运动康复',
              readCount: '8千',
              content: '适度的负重运动如散步、太极等有助于增强骨密度，但要避免剧烈运动防止骨折风险。',
              publishTime: '2024-01-08'
            },
            {
              id: 3,
              title: '骨质疏松的早期信号',
              category: '疾病知识',
              readCount: '5千',
              content: '腰背疼痛、身高变矮、容易骨折等都是骨质疏松的早期信号，应及时进行检查。',
              publishTime: '2024-01-05'
            }
          ],
          
          // 服务动态
          activities: [
            {
              id: 1,
              title: '社区免费骨密度筛查活动通知',
              category: '活动预告',
              time: '昨天'
            },
            {
              id: 2,
              title: '"骨舞行动"健康讲座圆满结束',
              category: '活动回顾',
              time: '3天前'
            },
            {
              id: 3,
              title: '春季骨骼健康义诊活动预告',
              category: '活动预告',
              time: '1周后'
            }
          ]
        };
        wx.setStorageSync('appData', appData);
      }
    },
  
    // 获取全局数据
    getAppData() {
      return wx.getStorageSync('appData') || {};
    },
  
    // 更新全局数据
    updateAppData(newData) {
      let appData = this.getAppData();
      appData = { ...appData, ...newData };
      wx.setStorageSync('appData', appData);
      return appData;
    },
  
    // 添加评估记录
    addAssessment(assessment) {
      let appData = this.getAppData();
      if (!appData.assessments) appData.assessments = [];
      assessment.id = Date.now();
      assessment.timestamp = new Date().toISOString();
      appData.assessments.unshift(assessment);
      wx.setStorageSync('appData', appData);
      return assessment;
    },
  
    // 添加订单
    addOrder(order) {
      let appData = this.getAppData();
      if (!appData.orders) appData.orders = [];
      order.id = Date.now();
      order.timestamp = new Date().toISOString();
      order.status = 'pending';
      appData.orders.unshift(order);
      wx.setStorageSync('appData', appData);
      return order;
    },
  
    // 保存方案
    savePlan(plan) {
      let appData = this.getAppData();
      if (!appData.savedPlans) appData.savedPlans = [];
      
      // 检查是否已存在相同日期的方案
      const existingIndex = appData.savedPlans.findIndex(item => 
        item.createDate === plan.createDate
      );
      
      if (existingIndex !== -1) {
        // 更新现有方案
        appData.savedPlans[existingIndex] = plan;
      } else {
        // 添加新方案
        plan.id = Date.now();
        plan.timestamp = new Date().toISOString();
        appData.savedPlans.unshift(plan);
      }
      
      wx.setStorageSync('appData', appData);
      return plan;
    },
  
    // 获取保存的方案
    getSavedPlans() {
      const appData = this.getAppData();
      return appData.savedPlans || [];
    },
  
    // 删除方案
    deletePlan(planId) {
      let appData = this.getAppData();
      if (appData.savedPlans) {
        appData.savedPlans = appData.savedPlans.filter(item => item.id !== planId);
        wx.setStorageSync('appData', appData);
      }
      return appData.savedPlans;
    },
  
    globalData: {
      userInfo: null
    }
  })