import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHyjjfafb, queryHyjjfafbx } from '../service';
import { colorList, defaultOptions } from '../utils';

type DataItem = {
  ValueType: string;
  Value: number;
};

type DataItem2 = {
  FangAnName: string;
  Finish: number;
  Undone: number;
};

const defaultOptions2 = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    top: '5%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
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

const Hyjjfafb = () => {
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const [dataList1, setDataList1] = useState<DataItem[]>([]);
  const [dataList2, setDataList2] = useState<DataItem2[]>([]);

  // init
  useEffect(() => {
    if (chartRef1.current) {
      setChartInstance1(echarts.init(chartRef1.current));
    }
    if (chartRef2.current) {
      setChartInstance2(echarts.init(chartRef2.current));
    }
  }, []);

  useEffect(() => {
    if (chartInstance1 && chartInstance2) {
      query();
      const interval = setInterval(query, 3 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance1, chartInstance2]);

  const query = () => {
    queryHyjjfafb().then((res) => setDataList1(res));
    queryHyjjfafbx().then((res) => setDataList2(res));
  };

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions,
        series: [
          {
            name: '行业解决方案',
            type: 'pie',
            radius: ['40%', '80%'],
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
                color: '#fff',
              },
            },
            data: dataList1.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [dataList1, chartInstance1]);

  useEffect(() => {
    if (dataList2.length > 0 && chartInstance2) {
      chartInstance2.setOption({
        ...defaultOptions2,
        xAxis: [
          {
            type: 'category',
            data: [...new Set(dataList2.map((item) => item.FangAnName))],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ffffff',
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#ffffff',
              },
            },
          },
        ],
        series: [
          {
            name: '计划完成',
            type: 'bar',
            data: dataList2.map((child) => child.Undone),
            itemStyle: {
              normal: {
                color: '#2a7bf3',
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            barWidth: 12,
          },
          {
            name: '已完成',
            type: 'bar',
            data: dataList2.map((child) => child.Finish),
            itemStyle: {
              normal: {
                color: '#00e284',
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            barWidth: 12,
          },
        ],
      });
    }
  }, [dataList2, chartInstance2]);

  return (
    <section className="box box5">
      <div className="box5-1">
        <h2>行业解决方案分布</h2>
        <div className="uc-flex">
          <div
            ref={chartRef1}
            style={{ width: '2.2rem', height: '2.2rem', margin: '0 .3rem' }}
          ></div>
          <div className="g-legend flex">
            {dataList1.map((item, index) => (
              <div className="item" key={item.ValueType}>
                <i
                  className="dot"
                  style={{ backgroundColor: colorList[index] }}
                ></i>
                {item.ValueType}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="box5-2">
        <div className="uc-flex">
          <div className="g-legend uc-flex">
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#2a7bf3' }}></i>
              计划完成
            </div>
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#00e284' }}></i>
              已完成
            </div>
          </div>
          <h2>行业解决方案发布</h2>
        </div>
        <div ref={chartRef2} style={{ width: '100%', height: '2rem' }}></div>
      </div>
    </section>
  );
};

export default Hyjjfafb;
