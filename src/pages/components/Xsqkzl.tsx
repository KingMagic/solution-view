import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import {
  queryFangAnXiaoShou,
  queryHangYeJiaoFu,
  queryHangYeXiaoShou,
} from '../service';
import { colorList, defaultOptions } from '../utils';
import icon1 from '../../images/home-icon-1.png';
import ReactDOM from 'react-dom';
import ModalLT from './ModalLT';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const colorList2 = ['#06479e', '#00e284', '#fd8c04'];

const defaultOptions2 = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '5%',
    top: '5%',
    containLabel: true,
  },
  tooltip: {
    backgroundColor: 'rgba(255,255,255,0.3)',
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

let change1 = 0;
let change2 = 0;

const Xsqkzl = () => {
  const [tab, setTab] = useState(0);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const chartRef3 = useRef<HTMLDivElement>(null);
  const [chartInstance3, setChartInstance3] = useState<echarts.ECharts>();
  const [hxxsDataList, setHyxsDataList] = useState<DataItem[]>([]);
  const [faxsDataList, setFaxsDataList] = useState<DataItem[]>([]);
  const [dataList3, setDataList3] = useState<DataItem[]>([]);
  const [showModal, setShowModal] = useState(false);

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
      const interval = setInterval(query, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance1, chartInstance2, chartInstance3]);

  const query = () => {
    queryHangYeXiaoShou().then((res) => setHyxsDataList(res));
    queryFangAnXiaoShou().then((res) => setFaxsDataList(res));
    queryHangYeJiaoFu().then((res) => setDataList3(res));
  };

  useEffect(() => {
    if (hxxsDataList.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions,
        series: [
          {
            name: '项目数',
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
            data: hxxsDataList.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [hxxsDataList, chartInstance1]);

  useEffect(() => {
    if (hxxsDataList.length > 0 && chartInstance1) {
      const interval = setInterval(() => {
        chartInstance1.dispatchAction({
          type: 'downplay',
          dataIndex: change1 % hxxsDataList.length,
        });
        change1 += 1;
        chartInstance1.dispatchAction({
          type: 'highlight',
          dataIndex: change1 % hxxsDataList.length,
        });
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [hxxsDataList, chartInstance1]);

  useEffect(() => {
    if (faxsDataList.length > 0 && chartInstance2) {
      chartInstance2.setOption({
        ...defaultOptions,
        series: [
          {
            name: '项目数',
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
            data: faxsDataList.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [faxsDataList, chartInstance2]);

  useEffect(() => {
    if (faxsDataList.length > 0 && chartInstance2) {
      const interval = setInterval(() => {
        chartInstance2.dispatchAction({
          type: 'downplay',
          dataIndex: change2 % faxsDataList.length,
        });
        change2 += 1;
        chartInstance2.dispatchAction({
          type: 'highlight',
          dataIndex: change2 % faxsDataList.length,
        });
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [faxsDataList, chartInstance2]);

  useEffect(() => {
    if (dataList3.length > 0 && chartInstance3) {
      chartInstance3.setOption({
        ...defaultOptions2,
        xAxis: [
          {
            type: 'category',
            data: [...new Set(dataList3.map((item) => item.TableType))],
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
        series: [...new Set(dataList3.map((item) => item.ValueType))].map(
          (item, index) => ({
            name: item,
            type: 'bar',
            data: dataList3
              .filter((child) => child.ValueType === item)
              .map((child) => child.Value),
            itemStyle: {
              normal: {
                color: colorList2[index],
                barBorderRadius: [10, 10, 0, 0],
              },
            },
            emphasis: {
              itemStyle: {
                color: '#16e79e',
              },
            },
            label: {
              show: true,
              position: 'top',
            },
            barWidth: 12,
          }),
        ),
      });
    }
  }, [dataList3, chartInstance3]);

  return (
    <>
      <section className="box box1">
        <h2>销售情况总览</h2>
        <div className="g-filter">
          <a
            onClick={() => setTab(0)}
            className={`item w30 ${tab === 0 ? 'on' : undefined}`}
          >
            行业销售情况
          </a>
          <a
            onClick={() => setTab(1)}
            className={`item w30 ${tab === 1 ? 'on' : undefined}`}
          >
            方案销售情况
          </a>
          <a
            onClick={() => setTab(2)}
            className={`item w30 ${tab === 2 ? 'on' : undefined}`}
          >
            行业交付情况
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
                {hxxsDataList.map((item, index) => (
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
            <div className="operate">
              <a onClick={() => setShowModal(true)} className="btn">
                <img src={icon1} className="uc-icon16" alt="" />
                已中标项目类型占比
              </a>
            </div>
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
                  marginLeft: '18px',
                }}
              >
                {faxsDataList.map((item, index) => (
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
                ref={chartRef2}
                style={{ width: '1.2rem', height: '1.5rem', margin: '0 .4rem' }}
              />
            </div>
          </div>
          <div
            className="tab-con"
            style={{ display: tab === 2 ? 'block' : 'none' }}
          >
            <div className="uc-flex">
              <div className="g-legend uc-flex end">
                <div className="item">
                  <i className="dot" style={{ backgroundColor: '#2a7bf3' }}></i>
                  交付中
                </div>
                <div className="item">
                  <i className="dot" style={{ backgroundColor: '#00e284' }}></i>
                  待交付
                </div>
                <div className="item">
                  <i className="dot" style={{ backgroundColor: '#fd8c04' }}></i>
                  已交付
                </div>
              </div>
            </div>
            <div
              ref={chartRef3}
              style={{ width: '4rem', height: '1.5rem' }}
            ></div>
          </div>
        </div>
      </section>
      {showModal && <ModalLT onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Xsqkzl;
