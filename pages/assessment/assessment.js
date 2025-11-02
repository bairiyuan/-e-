// pages/assessment/assessment.js
const app = getApp();

Page({
  data: {
    questions: [
      {
        id: 1,
        text: '您的年龄是？',
        options: [
          { id: 1, text: '小于40岁', score: 0 },
          { id: 2, text: '40-60岁', score: 1 },
          { id: 3, text: '60-70岁', score: 2 },
          { id: 4, text: '70岁以上', score: 3 }
        ]
      },
      {
        id: 2,
        text: '您的性别是？',
        options: [
          { id: 1, text: '男性', score: 0 },
          { id: 2, text: '女性', score: 1 }
        ]
      },
      {
        id: 3,
        text: '您是否有骨质疏松家族史？',
        options: [
          { id: 1, text: '没有', score: 0 },
          { id: 2, text: '父母一方有', score: 1 },
          { id: 3, text: '父母双方都有', score: 2 }
        ]
      },
      {
        id: 4,
        text: '您是否曾经骨折过？',
        options: [
          { id: 1, text: '从未骨折', score: 0 },
          { id: 2, text: '有过一次轻微骨折', score: 1 },
          { id: 3, text: '多次骨折', score: 2 }
        ]
      },
      {
        id: 5,
        text: '您是否经常吸烟或饮酒？',
        options: [
          { id: 1, text: '不吸烟不饮酒', score: 0 },
          { id: 2, text: '偶尔吸烟或饮酒', score: 1 },
          { id: 3, text: '经常吸烟或饮酒', score: 2 }
        ]
      }
    ],
    currentIndex: 0,
    answers: [],
    showResult: false,
    result: {}
  },

  onLoad() {
    this.showCurrentQuestion();
  },

  showCurrentQuestion() {
    const { currentIndex, questions } = this.data;
    this.setData({
      currentQuestion: questions[currentIndex],
      progress: ((currentIndex + 1) / questions.length) * 100
    });
  },

  selectOption(e) {
    const option = e.currentTarget.dataset.option;
    const { currentIndex, questions, answers } = this.data;
    
    answers[currentIndex] = {
      questionId: questions[currentIndex].id,
      question: questions[currentIndex].text,
      answer: option.text,
      score: option.score
    };
    
    if (currentIndex < questions.length - 1) {
      this.setData({
        currentIndex: currentIndex + 1,
        answers: answers
      });
      this.showCurrentQuestion();
    } else {
      this.calculateResult(answers);
    }
  },

  calculateResult(answers) {
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    
    let level, levelName, description, suggestions;
    if (totalScore <= 3) {
      level = 'low';
      levelName = '低风险';
      description = '您的骨质疏松风险较低，继续保持健康的生活方式。';
      suggestions = [
        '保持每日适量运动',
        '均衡饮食，保证钙摄入',
        '适当晒太阳',
        '定期进行骨密度检查'
      ];
    } else if (totalScore <= 6) {
      level = 'medium';
      levelName = '中风险';
      description = '您有中度骨质疏松风险，建议加强预防措施。';
      suggestions = [
        '增加钙和维生素D的摄入',
        '进行适度的负重运动',
        '避免吸烟和过量饮酒',
        '每1-2年进行一次骨密度检查',
        '咨询医生获取专业建议'
      ];
    } else {
      level = 'high';
      levelName = '高风险';
      description = '您有较高的骨质疏松风险，建议尽快咨询专业医生。';
      suggestions = [
        '立即咨询骨科或内分泌科医生',
        '进行专业的骨密度检查',
        '在医生指导下进行药物治疗',
        '加强防跌倒措施',
        '制定个性化的饮食和运动计划'
      ];
    }
    
    const result = {
      totalScore: totalScore,
      level: level,
      levelName: levelName,
      description: description,
      suggestions: suggestions,
      date: new Date().toLocaleDateString(),
      answers: answers
    };
    
    this.setData({
      showResult: true,
      result: result
    });

    // 保存评估记录到全局数据
    app.addAssessment(result);
  },

  saveResult() {
    wx.showToast({
      title: '评估结果已保存',
      icon: 'success'
    });
  },

  viewRecords() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  },

  startAgain() {
    this.setData({
      currentIndex: 0,
      answers: [],
      showResult: false,
      result: {}
    });
    this.showCurrentQuestion();
  }
});