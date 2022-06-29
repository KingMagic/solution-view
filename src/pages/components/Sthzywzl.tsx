import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryHeZuo } from '../service';
import styles from '../index.less';
import { Space, Tabs } from 'antd';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const Sthzywzl = () => {
  const [hzhbOptions, setHzhbOptions] = useState<Highcharts.Options>(); // 合作伙伴汇总
  const [hzlxOptions, setHzlxOptions] = useState<Highcharts.Options>(); // 方案销售情况
  const [hzhbDataList, setHzhbDatalist] = useState<DataItem[]>([]);
  const [hzlxDataList, setHzlxDatalist] = useState<DataItem[]>([]);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setClock((pre) => pre + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    queryHeZuo('合作伙伴汇总').then((res) => setHzhbDatalist(res));
    queryHeZuo('合作类型占比').then((res) => setHzlxDatalist(res));
  }, []);

  useEffect(() => {
    if (hzhbDataList.length > 0) {
      setHzhbOptions({
        title: {
          text: undefined,
        },
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
          width: 250,
        },
        colors: ['#00E284', '#06479C', '#682CEA', '#ED7D31', '#A5A5A5'],
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                name: 'x',
                y: 25,
              },
              {
                name: 'y',
                y: 75,
              },
            ],
            dataLabels: {
              enabled: false,
            },
            innerSize: '80%',
            startAngle: 270,
          },
        ],
      });
    }
  }, [hzhbDataList]);

  useEffect(() => {
    if (hzlxDataList.length > 0) {
      setHzlxOptions({
        title: {
          text: undefined,
        },
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
        colors: ['#00E284', '#06479C', '#682CEA', '#ED7D31', '#A5A5A5'],
        credits: {
          enabled: false,
        },
        legend: {
          align: 'left',
          layout: 'vertical',
          verticalAlign: 'middle',
          itemStyle: {
            color: '#ffffff',
            fontSize: '16px',
          },
          x: 100,
        },
        tooltip: {
          enabled: false,
        },
        series: [
          {
            type: 'pie',
            data: hzlxDataList.map((item) => ({
              name: item.ValueType,
              y: item.Value,
            })),
            dataLabels: {
              enabled: false,
            },
            innerSize: '40%',
            showInLegend: true,
          },
        ],
      });
    }
  }, [hzlxDataList]);

  return (
    <div className={`${styles.sthzywzl} ${styles.tabSelf}`}>
      <Tabs centered tabBarGutter={32} type="card">
        <Tabs.TabPane key="1" tab="合作伙伴汇总">
          <div style={{ display: 'flex', padding: '8px 16px' }}>
            <div className={styles.left}>
              <div className={styles.text}>
                <p>品种数</p>
                <p>123123</p>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.text}>
                <p>伙伴数</p>
                <p>123123</p>
              </div>
            </div>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="合作类型占比">
          <HighchartsReact highcharts={Highcharts} options={hzlxOptions} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Sthzywzl;
