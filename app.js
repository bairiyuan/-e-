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
          
          // 新增：保存的方案
          savedPlans: [],
          
          // 产品信息
          products: [
            {
              id: 1,
              name: '骨固元乌药口服液',
              price: 198,
              originalPrice: 258,
              description: '基于乌药抗骨质疏松研究成果，科学配方，专业护骨',
              details: {
                ingredients: '乌药提取物、碳酸钙、维生素D3、胶原蛋白肽',
                usage: '每日2次，每次1支，饭后服用',
                specification: '规格：10ml×30支/盒',
                suitable: '适宜人群：中老年人、骨质疏松风险人群',
                storage: '贮藏方法：密封，置阴凉干燥处',
                validity: '有效期：24个月'
              },
              features: [
                '基于乌药抗骨质疏松专利技术',
                '科学配比，易于吸收',
                '无添加，安全可靠',
                '临床验证有效'
              ]
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
            }
          ],
          
          // 服务动态
          activities: [
            {
              id: 1,
              title: '社区免费骨密度筛查活动通知',
              category: '活动预告',
              time: '昨天'
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
  
    // 新增：保存方案
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
  
    // 新增：获取保存的方案
    getSavedPlans() {
      const appData = this.getAppData();
      return appData.savedPlans || [];
    },
  
    // 新增：删除方案
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