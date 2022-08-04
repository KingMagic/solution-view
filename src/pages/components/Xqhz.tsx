import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHyxq } from '../service';
import { colorList, defaultOptions, defaultOptions2 } from '../utils';
import PieChart from './PieChart';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

function Xqhz() {
  const [tab, setTab] = useState(0);
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const [dataList2, setDataList2] = useState<DataItem[]>([]);

  // init
  useEffect(() => {
    if (chartRef2.current) {
      setChartInstance2(echarts.init(chartRef2.current));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTab((tab + 1) % 3), 45 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  const query = () => {
    queryHyxq('需求类型汇总').then((res) => setDataList2(res));
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
        color: ['#06479e'],
        xAxis: [
          {
            type: 'category',
            data: [...new Set(dataList2.map((item) => item.ValueType))],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ffffff',
              },
              interval: 0,
              rotate: -30,
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
            name: '需求数',
            type: 'bar',
            data: dataList2.map((item) => item.Value),
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            label: {
              show: true,
              position: 'top',
            },
            barWidth: 12,
            emphasis: {
              itemStyle: {
                color: '#16e79e',
              },
            },
          },
        ],
      });
    }
  }, [dataList2, chartInstance2]);

  return (
    <section className="box box9">
      <h2>需求汇总</h2>
      <div className="g-filter">
        <a
          onClick={() => setTab(0)}
          className={`item ${tab === 0 ? 'on' : undefined}`}
        >
          行业需求汇总
        </a>
        <a
          onClick={() => setTab(1)}
          className={`item ${tab === 1 ? 'on' : undefined}`}
        >
          需求类型汇总
        </a>
        <a
          onClick={() => setTab(2)}
          className={`item ${tab === 2 ? 'on' : undefined}`}
        >
          需求状态汇总
        </a>
      </div>
      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 0 ? 'block' : 'none' }}
        >
          <PieChart
            legendNumber={2}
            query={() => queryHyxq('行业需求总览')}
            seriesName="需求数"
          />
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          <PieChart
            legendNumber={2}
            query={() => queryHyxq('需求状态汇总')}
            seriesName="需求数"
          />
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 2 ? 'block' : 'none' }}
        >
          <div ref={chartRef2} style={{ width: '4rem', height: '1.5rem' }} />
        </div>
      </div>
    </section>
  );
}

export default Xqhz;
