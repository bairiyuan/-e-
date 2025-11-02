// pages/records/records.js
const app = getApp();

Page({
  data: {
    assessments: [],
    latestScore: 0,
    riskLevelCount: {
      low: 0,
      medium: 0,
      high: 0
    }
  },

  onLoad() {
    this.loadRecords();
  },

  onShow() {
    this.loadRecords();
  },

  loadRecords() {
    const appData = app.getAppData();
    const assessments = appData.assessments || [];
    
    // 计算统计数据
    const riskLevelCount = {
      low: 0,
      medium: 0,
      high: 0
    };
    
    assessments.forEach(assessment => {
      riskLevelCount[assessment.level]++;
    });
    
    const latestScore = assessments.length > 0 ? assessments[0].totalScore : 0;
    
    this.setData({
      assessments,
      latestScore,
      riskLevelCount
    });
  },

  viewRecordDetail(e) {
    const record = e.currentTarget.dataset.record;
    
    let detailContent = `评估日期：${record.date}\n`;
    detailContent += `得分：${record.totalScore}\n`;
    detailContent += `风险等级：${record.levelName}\n\n`;
    detailContent += `评估结果：${record.description}\n\n`;
    detailContent += `健康建议：\n`;
    
    record.suggestions.forEach((suggestion, index) => {
      detailContent += `${index + 1}. ${suggestion}\n`;
    });
    
    wx.showModal({
      title: '评估详情',
      content: detailContent,
      showCancel: false,
      confirmText: '关闭'
    });
  },

  deleteRecord(e) {
    const recordId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '删除记录',
      content: '确定要删除这条评估记录吗？',
      success: (res) => {
        if (res.confirm) {
          const appData = app.getAppData();
          appData.assessments = appData.assessments.filter(item => item.id !== recordId);
          wx.setStorageSync('appData', appData);
          this.loadRecords();
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  goToAssessment() {
    wx.navigateTo({
      url: '/pages/assessment/assessment'
    });
  }
});