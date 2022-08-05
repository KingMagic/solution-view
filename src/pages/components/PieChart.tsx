import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import {
  colorList,
  defaultOptions,
  refreshTime,
  itemChangeTime,
} from '../utils';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

type Props = {
  seriesName: string;
  query: () => Promise;
  legendNumber?: number;
  layout?: string;
  width?: string;
  height?: string;
  margin?: string;
};

function PieChart(props: Props) {
  const {
    layout,
    legendNumber,
    query,
    seriesName,
    height = '1.5rem',
    width = '1.2rem',
    margin = '0 .4rem',
  } = props;
  const chartRef = useRef<HTMLDivElement>(null);
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>();
  const [sw, setSw] = useState(true);
  const [counter, setCounter] = useState(0);

  // init
  useEffect(() => {
    if (chartRef.current) {
      setChartInstance(echarts.init(chartRef.current));
    }
  }, []);

  useEffect(() => {
    query().then((res) => setDataList(res));
    const interval = setInterval(
      () => query().then((res) => setDataList(res)),
      refreshTime,
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dataList.length > 0 && chartInstance) {
      chartInstance.setOption({
        ...defaultOptions,
        series: [
          {
            name: seriesName,
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
          dataIndex: counter % dataList.length,
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
        chartInstance.dispatchAction({
          type: 'highlight',
          dataIndex: counter % dataList.length,
        });
        setCounter(counter + 1);
      }
    }, itemChangeTime);
    return () => clearInterval(interval);
  }, [dataList.length, chartInstance, sw, counter]);

  return (
    <div
      className="uc-flex"
      style={{ flexDirection: layout === 'right' ? 'row-reverse' : 'row' }}
    >
      <div
        className="g-legend flex uc-mb20"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft: layout === 'right' ? undefined : '40px',
        }}
      >
        {dataList.map((item, index) => (
          <div
            className="item"
            key={item.ValueType}
            style={{ width: legendNumber ? `${100 / legendNumber}%` : '100%' }}
          >
            <i className="dot" style={{ backgroundColor: colorList[index] }} />
            {item.ValueType}
          </div>
        ))}
      </div>
      <div ref={chartRef} style={{ width, height, margin }} />
    </div>
  );
}

export default PieChart;
