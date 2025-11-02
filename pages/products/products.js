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
      price: 198,
      originalPrice: 258,
      description: '基于乌药抗骨质疏松研究成果，科学配方，专业护骨'
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