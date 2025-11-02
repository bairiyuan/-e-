// pages/my-plans/my-plans.js
const app = getApp();

Page({
  data: {
    plans: []
  },

  onLoad() {
    this.loadPlans();
  },

  onShow() {
    this.loadPlans();
  },

  loadPlans() {
    const plans = app.getSavedPlans();
    this.setData({ plans });
  },

  viewPlanDetail(e) {
    const plan = e.currentTarget.dataset.plan;
    
    let detailContent = `方案日期：${plan.createDate}\n`;
    detailContent += `风险等级：${plan.levelName}\n`;
    detailContent += `评估得分：${plan.totalScore}\n\n`;
    
    detailContent += `饮食建议：\n`;
    plan.dietPlan.forEach((item, index) => {
      detailContent += `${index + 1}. ${item.content}\n`;
    });
    
    detailContent += `\n运动方案：\n`;
    plan.exercisePlan.forEach((item, index) => {
      detailContent += `${index + 1}. ${item.content}\n`;
    });
    
    detailContent += `\n生活习惯：\n`;
    plan.lifestylePlan.forEach((item, index) => {
      detailContent += `${index + 1}. ${item.content}\n`;
    });
    
    detailContent += `\n监测建议：\n`;
    plan.monitoringPlan.forEach((item, index) => {
      detailContent += `${index + 1}. ${item.content}\n`;
    });

    wx.showModal({
      title: '方案详情',
      content: detailContent,
      showCancel: false,
      confirmText: '关闭'
    });
  },

  deletePlan(e) {
    const planId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '删除方案',
      content: '确定要删除这个方案吗？',
      success: (res) => {
        if (res.confirm) {
          app.deletePlan(planId);
          this.loadPlans();
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  sharePlan(e) {
    const plan = e.currentTarget.dataset.plan;
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    return {
      title: '我的骨骼健康干预方案',
      path: '/pages/my-plans/my-plans'
    };
  },

  goToIntervention() {
    wx.navigateTo({
      url: '/pages/intervention/intervention'
    });
  }
});