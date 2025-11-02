// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    userInfo: {},
    assessmentCount: 0,
    planCount: 0,
    orderCount: 0
  },

  onLoad() {
    this.loadUserData();
  },

  onShow() {
    this.loadUserData();
  },

  loadUserData() {
    const appData = app.getAppData();
    this.setData({
      userInfo: appData.userInfo || {},
      assessmentCount: appData.assessments ? appData.assessments.length : 0,
      planCount: appData.savedPlans ? appData.savedPlans.length : 0,
      orderCount: appData.orders ? appData.orders.length : 0
    });
  },

  viewAssessmentRecords() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  },

  viewMyPlans() {
    wx.navigateTo({
      url: '/pages/my-plans/my-plans'
    });
  },

  viewOrders() {
    const appData = app.getAppData();
    if (appData.orders && appData.orders.length > 0) {
      const latestOrder = appData.orders[0];
      wx.showModal({
        title: '最新订单',
        content: `产品：${latestOrder.product}\n数量：${latestOrder.quantity}\n金额：¥${latestOrder.totalAmount}\n状态：${latestOrder.status === 'pending' ? '待处理' : '已完成'}`,
        showCancel: false,
        confirmText: '确定'
      });
    } else {
      wx.showModal({
        title: '我的订单',
        content: '您还没有任何订单',
        showCancel: false
      });
    }
  },

  viewAbout() {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },

  logout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已退出',
            icon: 'success'
          });
        }
      }
    });
  }
});