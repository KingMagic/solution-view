import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import * as echarts from 'echarts';
import { queryHyxszb } from '../service';
import { colorList } from '../utils';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

let change = 0;

const ModalLT = (props: any) => {
  const { onClose } = props;
  const chartRef4 = useRef<HTMLDivElement>(null);
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [chartInstance1, setChartInstance1] = useState<echarts.ECharts>();

  useEffect(() => {
    if (chartRef4.current) {
      const modalInstance = echarts.init(chartRef4.current);
      setChartInstance1(modalInstance);
      queryHyxszb().then((res) => {
        setDataList(res);
        modalInstance.setOption({
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            top: '0%',
            containLabel: true,
          },
          color: ['#682cea', '#2a7bf3', '#00e284', '#fd8c04', '#a5a5a5'],
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '中标数',
              type: 'pie',
              radius: ['40%', '80%'],
              avoidLabelOverlap: false,
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
              labelLine: {
                show: false,
              },
              data: res.map((item: { ValueType: any; Value: any }) => ({
                name: item.ValueType,
                value: item.Value,
              })),
            },
          ],
        });
      });
    }
  }, [chartRef4.current]);

  useEffect(() => {
    if (dataList.length > 0 && chartInstance1) {
      const interval = setInterval(() => {
        chartInstance1.dispatchAction({
          type: 'downplay',
          dataIndex: change % dataList.length,
        });
        change += 1;
        chartInstance1.dispatchAction({
          type: 'highlight',
          dataIndex: change % dataList.length,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dataList, chartInstance1]);

  const dom = (
    <div className="uc-alert uc-alert-proportion uc-show">
      <div className="over-close"></div>
      <div className="box">
        <div className="title">
          <b>已中标项目类型占比</b>{' '}
          <a onClick={onClose} className="btn-close">
            <i className="uc-font uc-close"></i>
          </a>
        </div>

        <div className="main">
          <div
            ref={chartRef4}
            style={{ width: '2.6rem', height: '2.6rem', margin: '0 .3rem' }}
          ></div>
          <div className="g-legend flex">
            {dataList.map((item, index) => (
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
  );
  return ReactDOM.createPortal(dom, document.body);
};

export default ModalLT;
