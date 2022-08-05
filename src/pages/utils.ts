const weekMap = {
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
  7: '星期日',
};

const colorList = [
  '#682cea',
  '#2a7bf3',
  '#00e284',
  '#fd8c04',
  '#25a145',
  '#a71b16',
  '#3772c0',
  '#98c204',
  '#77d1d2',
  '#12e190',
];
const defaultOptions = {
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '0%',
    containLabel: true,
  },
  color: colorList,
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'transparent',
    textStyle: {
      color: '#ffffff',
    },
    trigger: 'item',
  },
};

const defaultOptions2 = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    top: '12%',
    containLabel: true,
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'transparent',
    textStyle: {
      color: '#ffffff',
    },
  },
  yAxis: [
    {
      // show:false,
      axisLabel: {
        show: true,
        textStyle: {
          color: '#ffffff',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ffffff',
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#d5d5d5',
        },
      },
    },
  ],
};

const refreshTime = 60 * 1000;
const tabChangeTime = 45 * 1000;
const itemChangeTime = 15 * 1000;

export {
  colorList,
  defaultOptions,
  defaultOptions2,
  refreshTime,
  tabChangeTime,
  itemChangeTime,
};
