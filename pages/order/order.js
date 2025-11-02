// pages/order/order.js
const app = getApp();

Page({
  data: {
    product: {
      name: '骨固元乌药口服液',
      price: 198
    },
    formData: {
      name: '',
      phone: '',
      address: '',
      quantity: 1,
      remark: ''
    },
    totalPrice: 198,
    canSubmit: false
  },

  onLoad() {
    this.loadProduct();
  },

  loadProduct() {
    const appData = app.getAppData();
    const product = appData.products ? appData.products[0] : this.data.product;
    this.setData({ 
      product,
      totalPrice: product.price
    });
  },

  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
    this.checkSubmitStatus();
  },

  increaseQuantity() {
    const quantity = this.data.formData.quantity + 1;
    this.updateQuantity(quantity);
  },

  decreaseQuantity() {
    const quantity = Math.max(1, this.data.formData.quantity - 1);
    this.updateQuantity(quantity);
  },

  updateQuantity(quantity) {
    const totalPrice = this.data.product.price * quantity;
    this.setData({
      'formData.quantity': quantity,
      totalPrice: totalPrice
    });
  },

  checkSubmitStatus() {
    const { formData } = this.data;
    const canSubmit = formData.name.trim() && 
                     formData.phone.trim() && 
                     formData.address.trim();
    this.setData({ canSubmit });
  },

  submitOrder() {
    const { formData, product, totalPrice } = this.data;
    
    if (!formData.name.trim()) {
      wx.showToast({ title: '请输入收货人姓名', icon: 'none' });
      return;
    }
    if (!formData.phone.trim()) {
      wx.showToast({ title: '请输入联系电话', icon: 'none' });
      return;
    }
    if (!formData.address.trim()) {
      wx.showToast({ title: '请输入收货地址', icon: 'none' });
      return;
    }

    // 创建订单
    const order = {
      product: product.name,
      price: product.price,
      quantity: formData.quantity,
      totalAmount: totalPrice,
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      },
      remark: formData.remark,
      status: 'pending',
      orderTime: new Date().toLocaleString()
    };

    // 保存订单到全局数据
    app.addOrder(order);

    wx.showModal({
      title: '订购成功',
      content: `感谢您的订购！\n订单金额：¥${order.totalAmount}\n客服将尽快联系您确认订单详情。`,
      showCancel: false,
      confirmText: '确定',
      success: () => {
        wx.navigateBack();
      }
    });
  }
});