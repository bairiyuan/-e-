// pages/product-detail/product-detail.js
const app = getApp();

Page({
  data: {
    product: {}
  },

  onLoad() {
    this.loadProduct();
  },

  loadProduct() {
    const appData = app.getAppData();
    const product = appData.products ? appData.products[0] : {
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
    };
    this.setData({ product });
  },

  addToCart() {
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  placeOrder() {
    wx.navigateTo({
      url: '/pages/order/order'
    });
  }
});