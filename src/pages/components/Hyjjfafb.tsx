import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { queryHyjjfafb, queryHyjjfafbx } from '../service';
import { colorList, defaultOptions, defaultOptions2 } from '../utils';

type DataItem = {
  ValueType: string;
  Value: number;
};

type DataItem2 = {
  FangAnName: string;
  Finish: number;
  Undone: number;
};

let change1 = 0;

function Hyjjfafb() {
  const chartRef1 = useRef<HTMLDivElement>(null);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();
  const chartRef2 = useRef<HTMLDivElement>(null);
  const [chartInstance2, setChartInstance2] = useState<echarts.ECharts>();
  const [dataList1, setDataList1] = useState<DataItem[]>([]);
  const [dataList2, setDataList2] = useState<DataItem2[]>([]);

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
    if (chartInstance1 && chartInstance2) {
      query();
      const interval = setInterval(query, 30 * 1000);
      return () => clearInterval(interval);
    }
  }, [chartInstance1, chartInstance2]);

  const query = () => {
    queryHyjjfafb().then((res) => setDataList1(res));
    queryHyjjfafbx().then((res) => setDataList2(res));
  };

  useEffect(() => {
    if (dataList1.length > 0 && chartInstance1) {
      chartInstance1.setOption({
        ...defaultOptions,
        series: [
          {
            name: '方案数',
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
        xAxis: [
          {
            type: 'category',
            data: [...new Set(dataList2.map((item) => item.FangAnName))],
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
        series: [
          {
            name: '待发布',
            type: 'bar',
            data: dataList2.map((child) => child.Undone),
            itemStyle: {
              normal: {
                color: '#2a7bf3',
              },
            },
            barWidth: 20,
            emphasis: {
              itemStyle: {
                color: '#fd8c04',
              },
            },
            label: {
              show: true,
              position: 'top',
            },
          },
          {
            name: '已发布',
            type: 'bar',
            data: dataList2.map((child) => child.Finish),
            itemStyle: {
              normal: {
                color: '#00e284',
              },
            },
            barWidth: 20,
            emphasis: {
              itemStyle: {
                color: '#fd8c04',
              },
            },
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
      });
    }
  }, [dataList2, chartInstance2]);

  return (
    <section className="box box5">
      <div className="box5-1">
        <h2>行业解决方案分布</h2>
        <div className="uc-flex">
          <div
            ref={chartRef1}
            style={{ width: '2.2rem', height: '2.2rem', margin: '0 .3rem' }}
          />
          <div className="g-legend flex">
            {dataList1.map((item, index) => (
              <div className="item" key={item.ValueType}>
                <i
                  className="dot"
                  style={{ backgroundColor: colorList[index] }}
                />
                {item.ValueType}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="box5-2">
        <div className="uc-flex">
          <div className="g-legend uc-flex">
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#2a7bf3' }} />
              待发布
            </div>
            <div className="item">
              <i className="dot" style={{ backgroundColor: '#00e284' }} />
              已发布
            </div>
          </div>
          <h2>行业解决方案发布</h2>
        </div>
        <div ref={chartRef2} style={{ width: '100%', height: '2rem' }} />
      </div>
    </section>
  );
}

export default Hyjjfafb;
