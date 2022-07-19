import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryCszl, queryFakf } from '../service';
import { colorList, defaultOptions } from '../utils';
import icon4 from '../../images/home-icon-4.png';
import ModalLB from './ModalLB';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

type TableDataItem = {
  id: number;
  HangYe: string;
  FangAnName: string;
  JieDuan: string;
  JinDu: string;
  DI: number;
  ChengSuDu: number;
  Date: string;
};

let change1 = 0;
let change2 = 0;
let change3 = 0;

const Csrwzl = () => {
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
      const interval = setInterval(query, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance1, chartInstance2, chartInstance3]);

  const query = () => {
    queryCszl('基线').then((res) => setDataList1(res));
    queryCszl('生态继承验证').then((res) => setDataList2(res));
    queryCszl('场景化需求').then((res) => setDataList3(res));
  };

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions,
        series: [
          {
            name: '任务数',
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
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dataList1, chartInstance1]);

  useEffect(() => {
    if (dataList2.length > 0 && chartInstance2) {
      chartInstance2.setOption({
        ...defaultOptions,
        series: [
          {
            name: '任务数',
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
            data: dataList2.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [dataList2, chartInstance2]);

  useEffect(() => {
    if (dataList2.length > 0 && chartInstance2) {
      const interval = setInterval(() => {
        chartInstance2.dispatchAction({
          type: 'downplay',
          dataIndex: change2 % dataList2.length,
        });
        change2 += 1;
        chartInstance2.dispatchAction({
          type: 'highlight',
          dataIndex: change2 % dataList2.length,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dataList2, chartInstance2]);

  useEffect(() => {
    if (dataList3.length > 0 && chartInstance3) {
      chartInstance3.setOption({
        ...defaultOptions,
        series: [
          {
            name: '任务数',
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
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dataList3, chartInstance3]);

  return (
    <>
      <section className="box box4">
        <h2>测试任务总览</h2>
        <div className="g-filter">
          <a
            onClick={() => setTab(0)}
            className={`item ${tab === 0 ? 'on' : undefined}`}
          >
            基线
          </a>
          <a
            onClick={() => setTab(1)}
            className={`item ${tab === 1 ? 'on' : undefined}`}
          >
            生态集成验证
          </a>
          <a
            onClick={() => setTab(2)}
            className={`item ${tab === 2 ? 'on' : undefined}`}
          >
            场景化需求
          </a>
        </div>

        <div className="g-filterBD">
          <div
            className="tab-con"
            style={{ display: tab === 0 ? 'block' : 'none' }}
          >
            <div className="uc-flex">
              <div className="g-legend flex uc-ml20">
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
              <div
                ref={chartRef1}
                style={{ width: '1.5rem', height: '1.5rem', margin: '0 .4rem' }}
              ></div>
            </div>
            <div className="operate">
              <a onClick={() => setShowModal(true)} className="btn">
                <img src={icon4} className="uc-icon16" alt="" />
                方案开发进展
              </a>
            </div>
          </div>
          <div
            className="tab-con"
            style={{ display: tab === 1 ? 'block' : 'none' }}
          >
            <div className="uc-flex">
              <div className="g-legend flex uc-ml20">
                {dataList2.map((item, index) => (
                  <div className="item" key={item.ValueType}>
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
                style={{ width: '1.5rem', height: '1.5rem', margin: '0 .4rem' }}
              ></div>
            </div>
          </div>
          <div
            className="tab-con"
            style={{ display: tab === 2 ? 'block' : 'none' }}
          >
            <div className="uc-flex">
              <div className="g-legend flex uc-ml20">
                {dataList3.map((item, index) => (
                  <div className="item" key={item.ValueType}>
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
                style={{ width: '1.5rem', height: '1.5rem', margin: '0 .4rem' }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      {showModal && <ModalLB onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Csrwzl;
