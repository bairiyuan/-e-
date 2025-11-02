// pages/intervention/intervention.js
const app = getApp();

Page({
  data: {
    latestAssessment: null,
    dietPlan: [],
    exercisePlan: [],
    lifestylePlan: [],
    monitoringPlan: []
  },

  onLoad() {
    this.loadAssessmentData();
    this.generateInterventionPlan();
  },

  onShow() {
    this.loadAssessmentData();
    this.generateInterventionPlan();
  },

  loadAssessmentData() {
    const appData = app.getAppData();
    const assessments = appData.assessments || [];
    const latestAssessment = assessments.length > 0 ? assessments[0] : null;
    this.setData({ latestAssessment });
  },

  generateInterventionPlan() {
    const { latestAssessment } = this.data;
    
    if (!latestAssessment) return;

    // 根据风险评估等级生成个性化方案
    const level = latestAssessment.level;
    
    // 饮食建议
    const dietPlans = {
      low: [
        { id: 1, content: '每日摄入足够的钙质食物（奶制品、豆制品）' },
        { id: 2, content: '多吃富含维生素D的食物（鱼类、蛋黄）' },
        { id: 3, content: '适量摄入蛋白质，促进钙吸收' },
        { id: 4, content: '保持饮食均衡，多吃新鲜蔬果' }
      ],
      medium: [
        { id: 1, content: '增加高钙食物摄入，每日保证800mg钙' },
        { id: 2, content: '补充维生素D，促进钙质吸收' },
        { id: 3, content: '适量摄入胶原蛋白，增强骨骼韧性' },
        { id: 4, content: '控制盐分摄入，减少钙流失' },
        { id: 5, content: '避免过量咖啡和碳酸饮料' }
      ],
      high: [
        { id: 1, content: '在医生指导下进行钙和维生素D补充' },
        { id: 2, content: '增加优质蛋白质摄入，促进骨基质形成' },
        { id: 3, content: '严格控制盐分和咖啡因摄入' },
        { id: 4, content: '避免饮酒，减少骨质流失' },
        { id: 5, content: '咨询营养师制定个性化饮食方案' }
      ]
    };

    // 运动方案
    const exercisePlans = {
      low: [
        { id: 1, content: '每日散步30分钟，增强骨密度' },
        { id: 2, content: '每周进行2-3次力量训练' },
        { id: 3, content: '练习太极拳，改善平衡能力' },
        { id: 4, content: '适当进行跳跃运动' }
      ],
      medium: [
        { id: 1, content: '每日负重运动30-45分钟' },
        { id: 2, content: '进行平衡训练，预防跌倒' },
        { id: 3, content: '水中运动，减少关节负担' },
        { id: 4, content: '避免剧烈运动和冲击性运动' },
        { id: 5, content: '在专业指导下进行康复训练' }
      ],
      high: [
        { id: 1, content: '在医生指导下进行适度运动' },
        { id: 2, content: '重点进行平衡和柔韧性训练' },
        { id: 3, content: '避免负重和剧烈运动' },
        { id: 4, content: '进行物理治疗，改善肌肉力量' },
        { id: 5, content: '定期评估运动安全性' }
      ]
    };

    // 生活习惯
    const lifestylePlans = {
      low: [
        { id: 1, content: '每日晒太阳15-20分钟' },
        { id: 2, content: '保持充足睡眠，促进骨骼修复' },
        { id: 3, content: '戒烟限酒，保持健康生活方式' },
        { id: 4, content: '定期进行骨密度检查' }
      ],
      medium: [
        { id: 1, content: '保证每日充足日照' },
        { id: 2, content: '改善居家环境，预防跌倒' },
        { id: 3, content: '彻底戒烟，限制酒精摄入' },
        { id: 4, content: '保持正确姿势，避免弯腰负重' },
        { id: 5, content: '定期复查，监测骨骼健康' }
      ],
      high: [
        { id: 1, content: '全面改善居家安全环境' },
        { id: 2, content: '使用助行器，预防跌倒' },
        { id: 3, content: '彻底戒除烟酒' },
        { id: 4, content: '穿着防滑鞋，使用浴室防滑垫' },
        { id: 5, content: '建立紧急联系机制' }
      ]
    };

    // 监测建议
    const monitoringPlans = {
      low: [
        { id: 1, content: '每年进行一次骨密度检查' },
        { id: 2, content: '每月记录身高变化' },
        { id: 3, content: '定期评估饮食和运动情况' }
      ],
      medium: [
        { id: 1, content: '每6-12个月进行骨密度检查' },
        { id: 2, content: '每月测量身高，关注变化' },
        { id: 3, content: '记录日常疼痛症状' },
        { id: 4, content: '定期复查血液钙磷指标' }
      ],
      high: [
        { id: 1, content: '每3-6个月进行专业评估' },
        { id: 2, content: '密切监测身高和体态变化' },
        { id: 3, content: '记录所有不适症状' },
        { id: 4, content: '定期进行全面生化检查' },
        { id: 5, content: '建立健康档案，跟踪进展' }
      ]
    };

    this.setData({
      dietPlan: dietPlans[level] || [],
      exercisePlan: exercisePlans[level] || [],
      lifestylePlan: lifestylePlans[level] || [],
      monitoringPlan: monitoringPlans[level] || []
    });
  },

  goToAssessment() {
    wx.navigateTo({
      url: '/pages/assessment/assessment'
    });
  },

  goToProduct() {
    wx.navigateTo({
      url: '/pages/product-detail/product-detail'
    });
  },

  savePlan() {
    const { latestAssessment, dietPlan, exercisePlan, lifestylePlan, monitoringPlan } = this.data;
    
    if (!latestAssessment) {
      wx.showToast({
        title: '请先完成风险评估',
        icon: 'none'
      });
      return;
    }

    const plan = {
      assessmentId: latestAssessment.id,
      level: latestAssessment.level,
      levelName: latestAssessment.levelName,
      totalScore: latestAssessment.totalScore,
      createDate: new Date().toLocaleDateString(),
      dietPlan: dietPlan,
      exercisePlan: exercisePlan,
      lifestylePlan: lifestylePlan,
      monitoringPlan: monitoringPlan,
      description: `基于${latestAssessment.levelName}评估结果的个性化干预方案`
    };

    // 保存方案到全局数据
    app.savePlan(plan);

    wx.showToast({
      title: '方案已保存',
      icon: 'success'
    });
  },

  sharePlan() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    const { latestAssessment } = this.data;
    let title = '我的骨骼健康干预方案';
    
    if (latestAssessment) {
      title = `${latestAssessment.levelName}风险干预方案 - 骨健康e站通`;
    }
    
    return {
      title: title,
      path: '/pages/intervention/intervention'
    };
  }
});