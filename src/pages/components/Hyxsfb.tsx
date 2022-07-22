import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryFaxsqj, queryHangYeXiaoShou } from '../service';
import { colorList, defaultOptions } from '../utils';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

let change1 = 0;
let change2 = 0;
let change3 = 0;
let change4 = 0;
let change5 = 0;

const Hyxsfb = () => {
  const [tab, setTab] = useState(0);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const chartRef3 = useRef<HTMLDivElement>(null);
  const [chartInstance3, setChartInstance3] = useState<echarts.ECharts>();
  const chartRef4 = useRef<HTMLDivElement>(null);
  const [chartInstance4, setChartInstance4] = useState<echarts.ECharts>();
  const chartRef5 = useRef<HTMLDivElement>(null);
  const [chartInstance5, setChartInstance5] = useState<echarts.ECharts>();
  const [dataList1, setDataList1] = useState<DataItem[]>([]);
  const [dataList2, setDataList2] = useState<DataItem[]>([]);
  const [dataList3, setDataList3] = useState<DataItem[]>([]);
  const [dataList4, setDataList4] = useState<DataItem[]>([]);
  const [dataList5, setDataList5] = useState<DataItem[]>([]);

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
    if (chartRef4.current) {
      setChartInstance4(echarts.init(chartRef4.current));
    }
    if (chartRef5.current) {
      setChartInstance5(echarts.init(chartRef5.current));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTab((tab + 1) % 4), 45 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  useEffect(() => {
    if (
      chartInstance1 &&
      chartInstance2 &&
      chartInstance3 &&
      chartInstance4 &&
      chartInstance5
    ) {
      query();
      const interval = setInterval(query, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [
    chartInstance1,
    chartInstance2,
    chartInstance3,
    chartInstance4,
    chartInstance5,
  ]);

  const query = () => {
    queryHangYeXiaoShou().then((res) => setDataList1(res));
    queryFaxsqj('方案销售全景').then((res) => setDataList2(res));
    queryFaxsqj('行业宝').then((res) => setDataList3(res));
    queryFaxsqj('智慧教室').then((res) => setDataList4(res));
    queryFaxsqj('办公宝').then((res) => setDataList5(res));
  };

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
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
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [dataList2, chartInstance2]);

  useEffect(() => {
    if (dataList3.length > 0 && chartInstance3) {
      chartInstance3.setOption({
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

  useEffect(() => {
    if (dataList4.length > 0 && chartInstance4) {
      chartInstance4.setOption({
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
            data: dataList4.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [dataList4, chartInstance4]);

  useEffect(() => {
    if (dataList4.length > 0 && chartInstance4) {
      const interval = setInterval(() => {
        chartInstance4.dispatchAction({
          type: 'downplay',
          dataIndex: change4 % dataList4.length,
        });
        change4 += 1;
        chartInstance4.dispatchAction({
          type: 'highlight',
          dataIndex: change4 % dataList4.length,
        });
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [dataList4, chartInstance4]);

  useEffect(() => {
    if (dataList5.length > 0 && chartInstance5) {
      chartInstance5.setOption({
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
            data: dataList5.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [dataList5, chartInstance5]);

  useEffect(() => {
    if (dataList5.length > 0 && chartInstance5) {
      const interval = setInterval(() => {
        chartInstance5.dispatchAction({
          type: 'downplay',
          dataIndex: change5 % dataList5.length,
        });
        change5 += 1;
        chartInstance5.dispatchAction({
          type: 'highlight',
          dataIndex: change5 % dataList5.length,
        });
      }, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [dataList5, chartInstance5]);

  return (
    <section className="box box7">
      <div className="box7-1">
        <h2>行业销售分布</h2>
        <div className="uc-flex">
          <div
            ref={chartRef1}
            style={{ width: '2.4rem', height: '2.4rem' }}
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
      <div className="box7-2">
        <h2>解决方案销售分布</h2>
        <div className="uc-flex">
          <div className="g-filterBD flex">
            <div
              className="tab-con"
              style={{ display: tab === 0 ? 'block' : 'none' }}
            >
              <div className="uc-flex">
                <div
                  ref={chartRef2}
                  style={{ width: '2.4rem', height: '2.4rem' }}
                ></div>
                <div className="g-legend flex">
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
              </div>
            </div>
            <div
              className="tab-con"
              style={{ display: tab === 1 ? 'block' : 'none' }}
            >
              <div className="uc-flex">
                <div
                  ref={chartRef3}
                  style={{ width: '2.4rem', height: '2.4rem' }}
                ></div>
                <div className="g-legend flex">
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
              </div>
            </div>
            <div
              className="tab-con"
              style={{ display: tab === 2 ? 'block' : 'none' }}
            >
              <div className="uc-flex">
                <div
                  ref={chartRef4}
                  style={{ width: '2.4rem', height: '2.4rem' }}
                ></div>
                <div className="g-legend flex">
                  {dataList4.map((item, index) => (
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
            <div
              className="tab-con"
              style={{ display: tab === 3 ? 'block' : 'none' }}
            >
              <div className="uc-flex">
                <div
                  ref={chartRef5}
                  style={{ width: '2.4rem', height: '2.4rem' }}
                ></div>
                <div className="g-legend flex">
                  {dataList5.map((item, index) => (
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
          </div>

          <div className="g-filter style2">
            <a
              onClick={() => setTab(0)}
              className={`item ${tab === 0 ? 'on' : undefined}`}
            >
              解决方案销售全景
            </a>
            <a
              onClick={() => setTab(1)}
              className={`item ${tab === 1 ? 'on' : undefined}`}
            >
              行业宝方案销售全景
            </a>
            <a
              onClick={() => setTab(2)}
              className={`item ${tab === 2 ? 'on' : undefined}`}
            >
              智慧教室方案销售全景
            </a>
            <a
              onClick={() => setTab(3)}
              className={`item line-two ${tab === 3 ? 'on' : undefined}`}
            >
              商业市场数字化办公
              <br />
              方案销售全景
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hyxsfb;
