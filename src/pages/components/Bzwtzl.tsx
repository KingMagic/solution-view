import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryBzwtzl } from '../service';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const colorList = ['#682cea', '#2a7bf3', '#00e284', '#fd8c04', '#a5a5a5'];

const defaultOptions1 = {
  grid: {
    left: '0%',
    right: '0%',
    bottom: '0%',
    top: '0%',
    containLabel: true,
  },
  color: colorList,
  tooltip: {
    trigger: 'item',
  },
};

const Bzwtzl = () => {
  const [tab, setTab] = useState(1);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
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
  }, []);

  useEffect(() => {
    if (chartInstance1) {
      queryBzwtzl('本周处理问题').then((res) => setDataList1(res));
    }
    if (chartInstance2) {
      queryBzwtzl('负向改进').then((res) => setDataList2(res));
    }
    const interval = setInterval(query, 3 * 1000);
    return () => clearInterval(interval);
  }, [chartInstance1, chartInstance2]);

  const query = () => {
    queryBzwtzl('本周处理问题').then((res) => setDataList1(res));
    queryBzwtzl('负向改进').then((res) => setDataList2(res));
  };

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions1,
        series: [
          {
            name: '本周处理问题',
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
    if (dataList2.length > 0 && chartInstance2) {
      chartInstance2.setOption({
        ...defaultOptions1,
        series: [
          {
            name: '负向改进进展',
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

  return (
    <section className="box box2">
      <h2>本周问题总览</h2>
      <div className="g-filter">
        <a
          onClick={() => setTab(1)}
          className={`item w45 ${tab === 1 ? 'on' : undefined}`}
        >
          本周处理问题
        </a>
        <a
          onClick={() => setTab(2)}
          className={`item w45 ${tab === 2 ? 'on' : undefined}`}
        >
          负向改进进展
        </a>
      </div>

      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
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
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 2 ? 'block' : 'none' }}
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
      </div>
    </section>
  );
};

export default Bzwtzl;
