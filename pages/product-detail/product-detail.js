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