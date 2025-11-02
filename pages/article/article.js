// pages/article/article.js
const app = getApp();

Page({
  data: {
    article: {},
    isCollected: false
  },

  onLoad(options) {
    const articleId = parseInt(options.id);
    this.loadArticle(articleId);
  },

  loadArticle(articleId) {
    const appData = app.getAppData();
    const article = appData.articles.find(item => item.id === articleId);
    
    if (article) {
      this.setData({ article });
    } else {
      // 如果没有找到文章，使用默认数据
      const defaultArticles = {
        1: {
          id: 1,
          title: '预防骨质疏松，从日常饮食开始',
          category: '健康科普',
          readCount: '1.2万',
          content: '钙质是骨骼健康的基础，建议每日摄入足够的奶制品、豆制品和深绿色蔬菜。维生素D有助于钙的吸收，适当晒太阳也很重要。\n\n建议食物：\n• 奶制品：牛奶、酸奶、奶酪\n• 豆制品：豆腐、豆浆\n• 深绿色蔬菜：菠菜、西兰花\n• 坚果：杏仁、核桃',
          publishTime: '2024-01-10',
          sections: [
            {
              title: '富含钙质的食物',
              content: '奶制品、豆制品、深绿色蔬菜都是优质的钙质来源。'
            },
            {
              title: '维生素D的重要性',
              content: '维生素D促进钙吸收，晒太阳是获取维生素D的最佳方式。'
            }
          ]
        },
        2: {
          id: 2,
          title: '适合中老年人的骨骼健康运动',
          category: '运动康复',
          readCount: '8千',
          content: '适度的负重运动如散步、太极等有助于增强骨密度，但要避免剧烈运动防止骨折风险。\n\n推荐运动：\n• 散步：每日30分钟\n• 太极拳：改善平衡能力\n• 瑜伽：增强柔韧性\n• 水中运动：减少关节负担',
          publishTime: '2024-01-08'
        },
        3: {
          id: 3,
          title: '骨质疏松的早期信号',
          category: '疾病知识',
          readCount: '5千',
          content: '腰背疼痛、身高变矮、容易骨折等都是骨质疏松的早期信号，应及时进行检查。\n\n早期症状：\n• 腰背疼痛\n• 身高变矮\n• 驼背\n• 容易骨折\n• 牙齿松动',
          publishTime: '2024-01-05'
        }
      };
      
      const article = defaultArticles[articleId] || defaultArticles[1];
      this.setData({ article });
    }
  },

  toggleCollection() {
    this.setData({
      isCollected: !this.data.isCollected
    });
    
    wx.showToast({
      title: this.data.isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
  },

  shareArticle() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },

  onShareAppMessage() {
    const { article } = this.data;
    return {
      title: article.title,
      path: `/pages/article/article?id=${article.id}`
    };
  }
});