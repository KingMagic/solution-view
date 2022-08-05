import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHyjjfafb, queryYdxqfb } from '../service';
import { defaultOptions } from '../utils';

type DataItem = {
  ValueType: string;
  Value: number;
};

const options = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    top: '6%',
    containLabel: true,
  },
  xAxis: {
    axisLabel: {
      hideOverlap: false,
      interval: 0,
      color: '#ffffff',
    },
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
      type: 'value',
      minInterval: 20,
      axisLabel: {
        textStyle: {
          color: '#ffffff',
        },
      },
      axisLine: {
        lineStyle: {
          color: '#d5d5d5',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#d5d5d5',
        },
      },
    },
  ],
};
function Ydxqfb() {
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const [dataList1, setDataList1] = useState<DataItem[]>([]);

  // init
  useEffect(() => {
    if (chartRef1.current) {
      setChartInstance1(echarts.init(chartRef1.current));
    }
  }, []);

  const query = () => {
    queryYdxqfb().then((res) => setDataList1(res));
  };

  useEffect(() => {
    if (chartInstance1) {
      query();
      const interval = setInterval(query, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance1]);

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...options,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: dataList1.map((item) => item.ValueType),
            axisLine: {
              lineStyle: {
                color: '#d5d5d5',
              },
            },
            axisLabel: {
              interval: 0,
              color: '#ffffff',
            },
            splitLine: {
              lineStyle: {
                color: '#d5d5d5',
              },
            },
          },
        ],
        series: [
          {
            name: '需求数',
            type: 'line',
            stack: '总量',
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#7763fa',
                },
                {
                  offset: 1,
                  color: 'rgba(58,77,233,0.3)',
                },
              ]),
            },
            data: dataList1.map((item) => item.Value),
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                color: '#6663fa',
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.1)',
              },
            },
            itemStyle: {
              normal: {
                color: '#7763fa',
              },
            },
            barWidth: 20,
            smooth: true,
            showSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 10,
          },
        ],
      });
    }
  }, [dataList1, chartInstance1]);

  return (
    <section className="box box10">
      <h2>月度需求分布</h2>
      <div className="line-chart" style={{ overflow: 'auto' }}>
        <div ref={chartRef1} style={{ width: '6rem', height: '1.5rem' }} />
      </div>
    </section>
  );
}

export default Ydxqfb;
