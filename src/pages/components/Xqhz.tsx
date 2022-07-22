import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHyxq } from '../service';
import { colorList, defaultOptions, defaultOptions2 } from '../utils';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

let change1 = 0;
let change3 = 0;

const Xqhz = () => {
  const [tab, setTab] = useState(0);
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
    const interval = setInterval(() => setTab((tab + 1) % 3), 45 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  useEffect(() => {
    if (chartInstance1 && chartInstance2 && chartInstance3) {
      query();
      const interval = setInterval(query, 30 * 1000);
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
        ...defaultOptions,
        series: [
          {
            name: '需求数',
            type: 'pie',
            radius: ['40%', '80%'],
            label: {
              show: false,
              position: 'center',
              formatter: '{c}\n{b}',
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
    if (dataList1.length > 0 && chartInstance1) {
      const interval = setInterval(() => {
        chartInstance1.dispatchAction({
          type: 'downplay',
          dataIndex: change1 % dataList1.length,
        });
        change1 += 1;
        chartInstance1.dispatchAction({
          type: 'highlight',
          dataIndex: change1 % dataList1.length,
        });
      }, 30 * 1000);
      return () => clearInterval(interval);
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

  useEffect(() => {
    if (dataList3.length > 0 && chartInstance3) {
      chartInstance3.setOption({
        ...defaultOptions,
        series: [
          {
            name: '需求数',
            type: 'pie',
            radius: ['40%', '80%'],
            label: {
              show: false,
              position: 'center',
              formatter: '{c}\n{b}',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
                color: '#fff',
              },
            },
            data: dataList3.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [dataList3, chartInstance3]);

  useEffect(() => {
    if (dataList3.length > 0 && chartInstance3) {
      const interval = setInterval(() => {
        chartInstance3.dispatchAction({
          type: 'downplay',
          dataIndex: change3 % dataList3.length,
        });
        change3 += 1;
        chartInstance3.dispatchAction({
          type: 'highlight',
          dataIndex: change3 % dataList3.length,
        });
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [dataList3, chartInstance3]);

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
          onClick={() => setTab(2)}
          className={`item ${tab === 2 ? 'on' : undefined}`}
        >
          需求状态汇总
        </a>
        <a
          onClick={() => setTab(1)}
          className={`item ${tab === 1 ? 'on' : undefined}`}
        >
          需求类型汇总
        </a>
      </div>
      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 0 ? 'block' : 'none' }}
        >
          <div className="uc-flex">
            <div
              className="g-legend flex uc-mb20"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginLeft: '40px',
              }}
            >
              {dataList1.map((item, index) => (
                <div
                  className="item"
                  key={item.ValueType}
                  style={{ width: '50%' }}
                >
                  <i
                    className="dot"
                    style={{ backgroundColor: colorList[index] }}
                  ></i>
                  {item.ValueType}
                </div>
              ))}
            </div>
            <div
              ref={chartRef1}
              style={{ width: '1.2rem', height: '1.5rem', margin: '0 .4rem' }}
            />
          </div>
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 2 ? 'block' : 'none' }}
        >
          <div
            ref={chartRef2}
            style={{ width: '4rem', height: '1.5rem' }}
          ></div>
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          <div className="uc-flex">
            <div
              className="g-legend flex uc-mb20"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginLeft: '40px',
              }}
            >
              {dataList3.map((item, index) => (
                <div
                  className="item"
                  key={item.ValueType}
                  style={{ width: '50%' }}
                >
                  <i
                    className="dot"
                    style={{ backgroundColor: colorList[index] }}
                  ></i>
                  {item.ValueType}
                </div>
              ))}
            </div>
            <div
              ref={chartRef3}
              style={{ width: '1.2rem', height: '1.5rem', margin: '0 .4rem' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Xqhz;
