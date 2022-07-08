import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHyxq } from '../service';
import { colorList, defaultOptions } from '../utils';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
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

const Xqhz = () => {
  const [tab, setTab] = useState(1);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const chartRef3 = useRef<HTMLDivElement>(null);
  const [chartInstance3, setChartInstance3] = useState<echarts.ECharts>();
  const [dataList1, setDataList1] = useState<DataItem[]>([]);
  const [dataList2, setDataList2] = useState<DataItem[]>([]);
  const [dataList3, setDataList3] = useState<DataItem[]>([]);

  // init
  useEffect(() => {
    if (chartRef1.current) {
      setChartInstance1(echarts.init(chartRef1.current));
    }
    if (chartRef2.current) {
      setChartInstance2(echarts.init(chartRef2.current));
    }
    if (chartRef3.current) {
      setChartInstance3(echarts.init(chartRef3.current));
    }
  }, []);

  useEffect(() => {
    if (chartInstance1 && chartInstance2 && chartInstance3) {
      query();
      const interval = setInterval(query, 3 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance1, chartInstance2, chartInstance3]);

  const query = () => {
    queryHyxq('行业需求总览').then((res) => setDataList1(res));
    queryHyxq('需求类型汇总').then((res) => setDataList2(res));
    queryHyxq('需求状态汇总').then((res) => setDataList3(res));
  };

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions2,
        color: ['#06479e'],
        xAxis: [
          {
            type: 'category',
            data: [...new Set(dataList1.map((item) => item.ValueType))],
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
              interval: 0,
              rotate: -30,
            },
          },
        ],
        series: [
          {
            name: '行业需求汇总',
            type: 'bar',
            data: dataList1.map((item) => item.Value),
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            barWidth: 12,
          },
        ],
      });
    }
  }, [dataList1, chartInstance1]);

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
            name: '需求类型汇总',
            type: 'bar',
            data: dataList2.map((item) => item.Value),
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            barWidth: 12,
          },
        ],
      });
    }
  }, [dataList2, chartInstance2]);

  useEffect(() => {
    if (dataList3.length > 0 && chartInstance3) {
      chartInstance3.setOption({
        ...defaultOptions2,
        color: ['#06479e'],
        xAxis: [
          {
            type: 'category',
            data: [...new Set(dataList3.map((item) => item.ValueType))],
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
            name: '需求状态汇总',
            type: 'bar',
            data: dataList3.map((item) => item.Value),
            itemStyle: {
              normal: {
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            barWidth: 12,
          },
        ],
      });
    }
  }, [dataList3, chartInstance3]);

  return (
    <section className="box box9">
      <h2>需求汇总</h2>
      <div className="g-filter">
        <a
          onClick={() => setTab(1)}
          className={`item ${tab === 1 ? 'on' : undefined}`}
        >
          行业需求汇总
        </a>
        <a
          onClick={() => setTab(2)}
          className={`item ${tab === 2 ? 'on' : undefined}`}
        >
          需求类型汇总
        </a>
        <a
          onClick={() => setTab(3)}
          className={`item ${tab === 3 ? 'on' : undefined}`}
        >
          需求状态汇总
        </a>
      </div>
      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          <div className="g-legend uc-flex end">
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#06479e' }}></i>
              行业需求汇总
            </div>
          </div>
          <div
            ref={chartRef1}
            style={{ width: '4rem', height: '1.3rem' }}
          ></div>
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 2 ? 'block' : 'none' }}
        >
          <div className="g-legend uc-flex end">
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#06479e' }}></i>
              需求类型汇总
            </div>
          </div>
          <div
            ref={chartRef2}
            style={{ width: '4rem', height: '1.3rem' }}
          ></div>
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 3 ? 'block' : 'none' }}
        >
          <div className="g-legend uc-flex end">
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#06479e' }}></i>
              需求状态汇总
            </div>
          </div>
          <div
            ref={chartRef3}
            style={{ width: '4rem', height: '1.3rem' }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Xqhz;
