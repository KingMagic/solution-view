import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHeZuo } from '../service';
import { colorList, defaultOptions } from '../utils';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const Sthzywzl = () => {
  const [tab, setTab] = useState(1);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const chartRef3 = useRef<HTMLDivElement>(null);
  const [chartInstance3, setChartInstance3] = useState<echarts.ECharts>();
  const [dataList1, setDataList1] = useState<DataItem[]>([]);
  const [dataList2, setDataList2] = useState<DataItem[]>([]);

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
    queryHeZuo('合作类型占比').then((res) => setDataList1(res));
    queryHeZuo('合作伙伴汇总').then((res) => setDataList2(res));
  };

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions,
        series: [
          {
            name: '合作类型占比',
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
    if (dataList2.length > 0 && chartInstance2 && chartInstance3) {
      chartInstance2.setOption({
        ...defaultOptions,
        color: ['#682cea', '#002e6b'],
        tooltip: {
          show: false,
        },
        series: [
          {
            name: '合作类型汇总',
            type: 'pie',
            radius: ['60%', '80%'],
            emphasis: {
              disabled: true,
            },
            label: {
              show: true,
              position: 'center',
              formatter: [
                `{value|${dataList2[0].Value}}`,
                `{title|${dataList2[0].ValueType}}`,
              ].join('\n'),
              color: '#ffffff',
              rich: {
                value: {
                  fontSize: 32,
                },
                title: {
                  fontSize: 18,
                },
              },
            },
            data: [
              {
                value: 33,
              },
              {
                value: 67,
              },
            ],
          },
        ],
      });
      chartInstance3.setOption({
        ...defaultOptions,
        color: ['#00aa63', '#006d40'],
        tooltip: {
          show: false,
        },
        series: [
          {
            name: '合作类型汇总',
            type: 'pie',
            radius: ['60%', '80%'],
            emphasis: {
              disabled: true,
            },
            label: {
              show: true,
              position: 'center',
              formatter: [
                `{value|${dataList2[1].Value}}`,
                `{title|${dataList2[1].ValueType}}`,
              ].join('\n'),
              color: '#ffffff',
              rich: {
                value: {
                  fontSize: 32,
                },
                title: {
                  fontSize: 18,
                },
              },
            },
            data: [
              {
                value: 33,
              },
              {
                value: 67,
              },
            ],
          },
        ],
      });
    }
  }, [dataList2, chartInstance2, chartInstance3]);

  return (
    <section className="box box8">
      <h2>生态合作业务总览</h2>
      <div className="g-filter">
        <a
          onClick={() => setTab(1)}
          className={`item w30 ${tab === 1 ? 'on' : undefined}`}
        >
          数据统计
        </a>
        <a
          onClick={() => setTab(2)}
          className={`item w30 ${tab === 2 ? 'on' : undefined}`}
        >
          汇总
        </a>
      </div>
      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          <div className="box8-1">
            <div className="item">
              <div
                ref={chartRef2}
                style={{ width: '1.5rem', height: '1.5rem' }}
              ></div>
            </div>
            <div className="item">
              <div
                ref={chartRef3}
                style={{ width: '1.5rem', height: '1.5rem' }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 2 ? 'block' : 'none' }}
        >
          <div className="uc-flex">
            <div
              className="g-legend flex"
              style={{ display: 'flex', flexWrap: 'wrap' }}
            >
              {dataList1.map((item, index) => (
                <div
                  className="item"
                  style={{ width: '50%' }}
                  key={item.ValueType}
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
              style={{ width: '1.5rem', height: '1.5rem' }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sthzywzl;
