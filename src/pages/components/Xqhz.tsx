import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Tabs } from 'antd';
import { queryHyxq } from '../service';
import styles from '../index.less';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const Xqhz = () => {
  const [options, setOptions] = useState<Highcharts.Options>();
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [optionsA, setOptionsA] = useState<Highcharts.Options>();
  const [dataListA, setDataListA] = useState<DataItem[]>([]);
  const [optionsB, setOptionsB] = useState<Highcharts.Options>();
  const [dataListB, setDataListB] = useState<DataItem[]>([]);

  useEffect(() => {
    queryHyxq('行业需求总览').then((res) => setDataList(res));
    queryHyxq('需求类型汇总').then((res) => setDataListA(res));
    queryHyxq('需求状态汇总').then((res) => setDataListB(res));
  }, []);

  useEffect(() => {
    if (dataList.length > 0) {
      setOptions({
        title: {
          text: undefined,
        },
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: dataList.map((item) => item.ValueType),
        },
        series: [
          {
            type: 'column',
            name: '汇总',
            data: dataList.map((data) => data.Value),
          },
        ],
      });
    }
  }, [dataList]);

  useEffect(() => {
    if (dataListA.length > 0) {
      setOptionsA({
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
            data: dataListA.map((item) => ({
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
  }, [dataListA]);

  useEffect(() => {
    if (dataListB.length > 0) {
      setOptionsB({
        title: {
          text: undefined,
        },
        chart: {
          backgroundColor: 'rgba(0,0,0,0)',
        },
        credits: {
          enabled: false,
        },
        legend: {
          enabled: false,
        },
        xAxis: {
          categories: dataListB.map((item) => item.ValueType),
        },
        series: [
          {
            type: 'column',
            name: '汇总',
            data: dataListB.map((data) => data.Value),
          },
        ],
      });
    }
  }, [dataListB]);

  return (
    <div className={`${styles.xqhz} ${styles.tabSelf}`}>
      <Tabs centered tabBarGutter={32} type="card">
        <Tabs.TabPane key="1" tab="行业需求汇总">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="需求类型汇总">
          <HighchartsReact highcharts={Highcharts} options={optionsA} />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="需求状态汇总">
          <HighchartsReact highcharts={Highcharts} options={optionsB} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Xqhz;
