import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryBzwtzl, queryFaxsqj } from '../service';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

const Faxsqj = () => {
  const [options, setOptions] = useState<Highcharts.Options>();
  const [dataList, setDataList] = useState<DataItem[]>([]);
  const [optionsA, setOptionsA] = useState<Highcharts.Options>();
  const [dataAList, setDataListA] = useState<DataItem[]>([]);
  const [optionsB, setOptionsB] = useState<Highcharts.Options>();
  const [dataListB, setDataListB] = useState<DataItem[]>([]);
  const [optionsC, setOptionsC] = useState<Highcharts.Options>();
  const [dataListC, setDataListC] = useState<DataItem[]>([]);

  useEffect(() => {
    queryFaxsqj('方案销售全景').then((res) => setDataList(res));
    queryFaxsqj('行业宝').then((res) => setDataListA(res));
    queryFaxsqj('智慧教室').then((res) => setDataListB(res));
    queryFaxsqj('办公宝').then((res) => setDataListC(res));
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
    if (dataAList.length > 0) {
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
            data: dataAList.map((item, index) => ({
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
  }, [dataAList]);

  useEffect(() => {
    if (dataListB.length > 0) {
      setOptionsB({
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
            data: dataListB.map((item, index) => ({
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
  }, [dataListB]);

  useEffect(() => {
    if (dataListC.length > 0) {
      setOptionsC({
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
            data: dataListC.map((item, index) => ({
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
  }, [dataListC]);

  return (
    <div>
      <Tabs tabPosition="right">
        <Tabs.TabPane key="1" tab="解决方案销售全景">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="行业宝方案销售全景">
          <HighchartsReact highcharts={Highcharts} options={optionsA} />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="智慧教室方案销售全景">
          <HighchartsReact highcharts={Highcharts} options={optionsB} />
        </Tabs.TabPane>
        <Tabs.TabPane key="4" tab="商业市场数字化办公方案销售全景">
          <HighchartsReact highcharts={Highcharts} options={optionsC} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Faxsqj;
