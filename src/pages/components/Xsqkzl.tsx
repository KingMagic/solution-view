import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import {
  queryFangAnXiaoShou,
  queryHangYeJiaoFu,
  queryHangYeXiaoShou,
} from '../service';

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

const Xsqkzl = () => {
  const [tab, setTab] = useState(1);
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const chartRef3 = useRef<HTMLDivElement>(null);
  const [chartInstance3, setChartInstance3] = useState<echarts.ECharts>();
  const [hxxsDataList, setHyxsDataList] = useState<DataItem[]>([]);
  const [faxsDataList, setFaxsDataList] = useState<DataItem[]>([]);

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
      queryHangYeXiaoShou().then((res) => setHyxsDataList(res));
    }
    if (chartInstance2) {
      queryFangAnXiaoShou().then((res) => setFaxsDataList(res));
    }
    const interval = setInterval(query, 3 * 1000);
    return () => clearInterval(interval);
  }, [chartInstance1]);

  const query = () => {
    queryHangYeXiaoShou().then((res) => setHyxsDataList(res));
    queryFangAnXiaoShou().then((res) => setFaxsDataList(res));
  };

  useEffect(() => {
    if (hxxsDataList.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions1,
        series: [
          {
            name: '行业销售情况',
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
    if (faxsDataList.length > 0 && chartInstance2) {
      chartInstance2.setOption({
        ...defaultOptions1,
        series: [
          {
            name: '方案销售情况',
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
            data: faxsDataList.map((item) => ({
              name: item.ValueType,
              value: item.Value,
            })),
          },
        ],
      });
    }
  }, [faxsDataList, chartInstance2]);

  return (
    <section className="box box1">
      <h2>销售情况总览</h2>
      <div className="g-filter">
        <a
          onClick={() => setTab(1)}
          className={`item w30 ${tab === 1 ? 'on' : undefined}`}
        >
          行业销售情况
        </a>
        <a
          onClick={() => setTab(2)}
          className={`item w30 ${tab === 2 ? 'on' : undefined}`}
        >
          方案销售情况
        </a>
        <a
          onClick={() => setTab(3)}
          className={`item w30 ${tab === 3 ? 'on' : undefined}`}
        >
          行业交付情况
        </a>
      </div>

      <div className="g-filterBD">
        <div
          className="tab-con"
          style={{ display: tab === 1 ? 'block' : 'none' }}
        >
          <div className="uc-flex">
            <div
              className="g-legend flex uc-mb20"
              style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '40px' }}
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
            <a href="" className="btn">
              <img src="images/home-icon-1.png" className="uc-icon16" alt="" />
              已中标项目类型占比
            </a>
          </div>
        </div>
        <div
          className="tab-con"
          style={{ display: tab === 2 ? 'block' : 'none' }}
        >
          <div className="uc-flex">
            <div
              className="g-legend flex uc-mb20"
              style={{ display: 'flex', flexWrap: 'wrap', marginLeft: '18px' }}
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
          style={{ display: tab === 3 ? 'block' : 'none' }}
        >
          test
        </div>
      </div>
    </section>
  );
};

export default Xsqkzl;
