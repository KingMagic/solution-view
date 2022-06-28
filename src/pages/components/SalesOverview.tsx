import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {
  queryFangAnXiaoShou,
  queryHangYeJiaoFu,
  queryHangYeXiaoShou,
} from '../service';
import styles from '../index.less';
import { Tabs } from 'antd';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const SalesOverview = () => {
  const [hyxsOptions, setHyxsOptions] = useState<Highcharts.Options>(); // 行业销售情况
  const [faxsOptions, setFaxsOptions] = useState<Highcharts.Options>(); // 方案销售情况
  const [hyjfOptions, setHyjfOptions] = useState<Highcharts.Options>(); // 行业交付情况
  const [hyxsDataList, setHyxsDatalist] = useState<DataItem[]>([]);
  const [faxsDataList, setFaxsDatalist] = useState<DataItem[]>([]);
  const [hyjfDataList, setHyjfDatalist] = useState<DataItem[]>([]);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setClock((pre) => pre + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    queryHangYeXiaoShou().then((res) => setHyxsDatalist(res));
    queryFangAnXiaoShou().then((res) => setFaxsDatalist(res));
    queryHangYeJiaoFu().then((res) => setHyjfDatalist(res));
  }, []);

  useEffect(() => {
    if (hyxsDataList.length > 0) {
      setHyxsOptions({
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
          itemDistance: 48,
        },
        series: [
          {
            type: 'pie',
            data: hyxsDataList.map((item, index) => ({
              name: item.ValueType,
              y: item.Value,
              sliced: clock % hyxsDataList.length === index,
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
  }, [hyxsDataList]);

  useEffect(() => {
    if (faxsDataList.length > 0) {
      setFaxsOptions({
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
          itemDistance: 48,
        },
        series: [
          {
            type: 'pie',
            data: faxsDataList.map((item, index) => ({
              name: item.ValueType,
              y: item.Value,
              sliced: clock % faxsDataList.length === index,
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
  }, [faxsDataList]);

  useEffect(() => {
    if (hyjfDataList.length > 0) {
      setHyjfOptions({
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
          itemDistance: 48,
        },
        xAxis: {
          categories: [...new Set(hyjfDataList.map((item) => item.TableType))],
        },
        series: [...new Set(hyjfDataList.map((item) => item.ValueType))].map(
          (item) => ({
            type: 'column',
            name: item,
            data: hyjfDataList
              .filter((data) => data.ValueType === item)
              .map((data) => data.Value),
          }),
        ),
      });
    }
  }, [hyjfDataList]);

  return (
    <div className={`${styles.salesOverview} ${styles.tabSelf}`}>
      <Tabs centered tabBarGutter={32} type="card">
        <Tabs.TabPane key="1" tab="行业销售情况">
          <HighchartsReact highcharts={Highcharts} options={hyxsOptions} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="方案销售情况">
          <HighchartsReact highcharts={Highcharts} options={faxsOptions} />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="行业交付情况">
          <HighchartsReact highcharts={Highcharts} options={hyjfOptions} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default SalesOverview;
