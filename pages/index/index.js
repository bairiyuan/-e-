// pages/index/index.js
const app = getApp();

Page({
  data: {
    userInfo: {},
    articles: [],
    activities: []
  },

  onLoad() {
    this.loadData();
  },

  onShow() {
    this.loadData();
  },

  loadData() {
    const appData = app.getAppData();
    this.setData({
      userInfo: appData.userInfo || {},
      articles: (appData.articles || []).slice(0, 3),
      activities: (appData.activities || []).slice(0, 3)
    });
  },

  // 导航方法
  navigateToAssessment() {
    wx.navigateTo({
      url: '/pages/assessment/assessment'
    });
  },

  navigateToKnowledge() {
    // 直接跳转到第一个文章
    const appData = app.getAppData();
    const firstArticle = appData.articles && appData.articles.length > 0 ? appData.articles[0] : null;
    if (firstArticle) {
      wx.navigateTo({
        url: `/pages/article/article?id=${firstArticle.id}`
      });
    } else {
      wx.showToast({
        title: '暂无文章',
        icon: 'none'
      });
    }
  },

  navigateToIntervention() {
    wx.navigateTo({
      url: '/pages/intervention/intervention'
    });
  },

  navigateToProfile() {
    wx.switchTab({
      url: '/pages/profile/profile'
    });
  },

  viewArticle(e) {
    const article = e.currentTarget.dataset.article;
    wx.navigateTo({
      url: `/pages/article/article?id=${article.id}`
    });
  },

  onPullDownRefresh() {
    this.loadData();
    wx.stopPullDownRefresh();
  }
});