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

let change = 0;

function Sthzywzl() {
  const [tab, setTab] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const chartRef3 = useRef<HTMLDivElement>(null);
  const [chartInstance3, setChartInstance3] = useState<echarts.ECharts>();
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [dataList2, setDataList2] = useState<DataItem[]>([]);
  const [sw, setSw] = useState(true);

  useEffect(() => {
    if (dataList.length > 0 && chartInstance) {
      chartInstance.setOption({
        ...defaultOptions,
        series: [
          {
            name: '产品数',
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
            data: dataList.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
      chartInstance.dispatchAction({
        type: 'highlight',
        dataIndex: 0,
      });
      chartInstance.on('mouseover', (e) => {
        setSw(false);
        chartInstance.dispatchAction({
          type: 'downplay',
        });
        chartInstance.dispatchAction({
          type: 'highlight',
          dataIndex: e.dataIndex,
        });
      });
      chartInstance.on('mouseout', () => {
        setSw(true);
        chartInstance.dispatchAction({
          type: 'downplay',
        });
        chartInstance.dispatchAction({
          type: 'highlight',
          dataIndex: change % dataList.length,
        });
      });
    }
  }, [dataList.length, chartInstance]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataList.length > 0 && chartInstance && sw) {
        chartInstance.dispatchAction({
          type: 'downplay',
        });
        change += 1;
        chartInstance.dispatchAction({
          type: 'highlight',
          dataIndex: change % dataList.length,
        });
      }
    }, 3 * 1000);
    return () => clearInterval(interval);
  }, [dataList.length, chartInstance, sw]);

  // init
  useEffect(() => {
    if (chartRef.current) {
      setChartInstance(echarts.init(chartRef.current));
    }
    if (chartRef2.current) {
      setChartInstance2(echarts.init(chartRef2.current));
    }
    if (chartRef3.current) {
      setChartInstance3(echarts.init(chartRef3.current));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTab((tab + 1) % 2), 45 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  const query = () => {
    queryHeZuo('合作类型占比').then((res) => setDataList(res));
    queryHeZuo('合作伙伴汇总').then((res) => setDataList2(res));
  };

  useEffect(() => {
    if (chartInstance && chartInstance2 && chartInstance3) {
      query();
      const interval = setInterval(query, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance, chartInstance2, chartInstance3]);

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
            name: '产品数',
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
                  fontSize: '.4rem',
                },
                title: {
                  fontSize: '.2rem',
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
            name: '产品数',
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
                  fontSize: '.4rem',
                },
                title: {
                  fontSize: '.2rem',
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
          onClick={() => setTab(0)}
          className={`item w30 ${tab === 0 ? 'on' : undefined}`}
        >
          合作伙伴汇总
        </a>
        <a
          onClick={() => setTab(1)}
          className={`item w30 ${tab === 1 ? 'on' : undefined}`}
        >
          合作类型占比
        </a>
      </div>
      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 0 ? 'block' : 'none' }}
        >
          <div className="box8-1">
            <div className="item">
              <div
                ref={chartRef2}
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
            </div>
            <div className="item">
              <div
                ref={chartRef3}
                style={{ width: '1.5rem', height: '1.5rem' }}
              />
            </div>
          </div>
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          <div className="uc-flex">
            <div
              className="g-legend flex"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '0.1rem',
                marginLeft: '40px',
              }}
            >
              {dataList.map((item, index) => (
                <div
                  className="item"
                  style={{
                    width: index % 2 === 0 ? '40%' : '60%',
                    marginBottom: '0.1rem',
                  }}
                  key={item.ValueType}
                >
                  <i
                    className="dot"
                    style={{ backgroundColor: colorList[index] }}
                  />
                  {item.ValueType}
                </div>
              ))}
            </div>
            <div ref={chartRef} style={{ width: '1.5rem', height: '1.5rem' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sthzywzl;
