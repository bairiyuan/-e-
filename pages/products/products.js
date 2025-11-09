// pages/products/products.js
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
      name: '骨固元乌药口服液',
      price: 98,
      description: '基于乌药抗骨质疏松专利技术，科学配方改善骨密度',
      suitable: '适宜人群：50岁及以上中老年人、骨质疏松风险人群'
    };
    this.setData({ product });
  },

  viewProductDetail() {
    wx.navigateTo({
      url: '/pages/product-detail/product-detail'
    });
  },

  placeOrder() {
    wx.navigateTo({
      url: '/pages/order/order'
    });
  }
});