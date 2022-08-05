import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHyjjfafb, queryHyjjfafbx } from '../service';
import { defaultOptions2 } from '../utils';
import PieChart from './PieChart';

type DataItem = {
  ValueType: string;
  Value: number;
};

type DataItem2 = {
  FangAnName: string;
  Finish: number;
  Undone: number;
};

function Hyjjfafb() {
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const [dataList2, setDataList2] = useState<DataItem2[]>([]);

  // init
  useEffect(() => {
    if (chartRef2.current) {
      setChartInstance2(echarts.init(chartRef2.current));
    }
  }, []);

  const query = () => {
    queryHyjjfafbx().then((res) => setDataList2(res));
  };

  useEffect(() => {
    if (chartInstance2) {
      query();
      const interval = setInterval(query, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance2]);

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
        yAxis: [
          {
            type: 'value',
            minInterval: 2,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
              },
            },
          },
        ],
        series: [
          {
            name: '待发布',
            type: 'bar',
            data: dataList2.map((child) => child.Undone),
            itemStyle: {
              normal: {
                color: '#2a7bf3',
              },
            },
            barWidth: 20,
            emphasis: {
              itemStyle: {
                color: 'inherit',
              },
            },
            label: {
              show: true,
              position: 'top',
            },
          },
          {
            name: '已发布',
            type: 'bar',
            data: dataList2.map((child) => child.Finish),
            itemStyle: {
              normal: {
                color: '#00e284',
              },
            },
            barWidth: 20,
            emphasis: {
              itemStyle: {
                color: 'inherit',
              },
            },
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
      });
    }
  }, [dataList2, chartInstance2]);

  return (
    <section className="box box5">
      <div className="box5-1">
        <h2>行业解决方案分布</h2>
        <PieChart
          layout="right"
          query={queryHyjjfafb}
          seriesName="方案数"
          width="2.2rem"
          height="2.2rem"
          margin="0 .3rem"
        />
      </div>
      <div className="box5-2">
        <div className="uc-flex">
          <div className="g-legend uc-flex">
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#2a7bf3' }} />
              待发布
            </div>
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#00e284' }} />
              已发布
            </div>
          </div>
          <h2>行业解决方案发布</h2>
        </div>
        <div ref={chartRef2} style={{ width: '100%', height: '2rem' }} />
      </div>
    </section>
  );
}

export default Hyjjfafb;
