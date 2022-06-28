import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryBzwtzl } from '../service';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const Bzwtzl = () => {
  const [options, setOptions] = useState<Highcharts.Options>(); // 行业销售情况
  const [dataList, setDatalist] = useState<DataItem[]>([]);
  const [optionsA, setOptionsA] = useState<Highcharts.Options>(); // 方案销售情况
  const [dataListA, setDataListA] = useState<DataItem[]>([]);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setClock((pre) => pre + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    queryBzwtzl('本周处理问题').then((res) => setDatalist(res));
    queryBzwtzl('负向改进').then((res) => setDataListA(res));
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
            data: dataList.map((item, index) => ({
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
            data: dataListA.map((item, index) => ({
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

  return (
    <div>
      <div>title</div>
      <Tabs centered type="card">
        <Tabs.TabPane key="1" tab="本周处理问题">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="负向改进进展">
          <HighchartsReact highcharts={Highcharts} options={optionsA} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Bzwtzl;
