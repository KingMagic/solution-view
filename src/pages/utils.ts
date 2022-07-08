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
  '#a5a5a5',
  '#875b26',
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
    trigger: 'item',
  },
};

export { colorList, defaultOptions };
