// pages/about/about.js
Page({
    data: {
      companyInfo: {
        name: '骨健康科技有限公司',
        description: '专注于骨骼健康产品研发与服务',
        contact: {
          phone: '400-123-4567',
          email: 'service@bonehealth.com',
          address: '北京市朝阳区科技园区创新大厦A座'
        }
      }
    },
  
    onLoad() {
      // 页面加载
    },
  
    callService() {
      wx.makePhoneCall({
        phoneNumber: this.data.companyInfo.contact.phone
      });
    },
  
    copyEmail() {
      wx.setClipboardData({
        data: this.data.companyInfo.contact.email,
        success: () => {
          wx.showToast({
            title: '邮箱已复制',
            icon: 'success'
          });
        }
      });
    }
  });