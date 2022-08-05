import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import {
  queryFangAnXiaoShou,
  queryHangYeJiaoFu,
  queryHangYeXiaoShou,
} from '../service';
import icon1 from '../../images/home-icon-1.png';
import ModalLT from './ModalLT';
import PieChart from './PieChart';

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
    top: '8%',
    containLabel: true,
  },
  tooltip: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderColor: 'transparent',
    textStyle: {
      color: '#ffffff',
    },
  },
  yAxis: [
    {
      minInterval: 20,
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

function Xsqkzl() {
  const [tab, setTab] = useState(0);
  const chartRef3 = useRef<HTMLDivElement>(null);
  const [chartInstance3, setChartInstance3] = useState<echarts.ECharts>();
  const [dataList3, setDataList3] = useState<DataItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  // init
  useEffect(() => {
    if (chartRef3.current) {
      setChartInstance3(echarts.init(chartRef3.current));
    }
  }, []);

  const query = () => {
    queryHangYeJiaoFu().then((res) => setDataList3(res));
  };

  useEffect(() => {
    const interval = setInterval(() => setTab((tab + 1) % 3), 45 * 1000);
    return () => clearInterval(interval);
  }, [tab]);

  useEffect(() => {
    if (chartInstance3) {
      query();
      const interval = setInterval(query, 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance3]);

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
                color: 'inherit',
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
            <PieChart legendNumber={2} query={queryHangYeXiaoShou} />
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
            <PieChart legendNumber={2} query={queryFangAnXiaoShou} />
          </div>
          <div
            className="tab-con"
            style={{ display: tab === 2 ? 'block' : 'none' }}
          >
            <div className="uc-flex">
              <div className="g-legend uc-flex end">
                <div className="item">
                  <i className="dot" style={{ backgroundColor: '#2a7bf3' }} />
                  交付中
                </div>
                <div className="item">
                  <i className="dot" style={{ backgroundColor: '#00e284' }} />
                  待交付
                </div>
                <div className="item">
                  <i className="dot" style={{ backgroundColor: '#fd8c04' }} />
                  已交付
                </div>
              </div>
            </div>
            <div ref={chartRef3} style={{ width: '4rem', height: '1.5rem' }} />
          </div>
        </div>
      </section>
      {showModal && <ModalLT onClose={() => setShowModal(false)} />}
    </>
  );
}

export default Xsqkzl;
