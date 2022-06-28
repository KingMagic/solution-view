import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryCszl, queryFakf } from '../service';
import styles from '../index.less';
import { Button, Modal, Table, Tabs } from 'antd';

type DataItem = {
  id: number;
  Value: number;
  ValueType: string;
  TableType: string;
};

type TableDataItem = {
  id: number;
  HangYe: string;
  FangAnName: string;
  JieDuan: string;
  JinDu: string;
  DI: number;
  ChengSuDu: number;
  Date: string;
};

const Csrwzl = () => {
  const [options, setOptions] = useState<Highcharts.Options>(); // 行业销售情况
  const [optionsA, setOptionsA] = useState<Highcharts.Options>(); // 方案销售情况
  const [optionsB, setOptionsB] = useState<Highcharts.Options>(); // 行业交付情况
  const [dataList, setDatalist] = useState<DataItem[]>([]);
  const [dataListA, setDatalistA] = useState<DataItem[]>([]);
  const [dataListB, setDatalistB] = useState<DataItem[]>([]);
  const [clock, setClock] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [tableDataList, setTableDataList] = useState<TableDataItem[]>([]);

  useEffect(() => {
    const interval = setInterval(() => setClock((pre) => pre + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    queryCszl('基线').then((res) => setDatalist(res));
    queryCszl('生态继承验证').then((res) => setDatalistA(res));
    queryCszl('场景化需求').then((res) => setDatalistB(res));
    queryFakf().then((res) => setTableDataList(res));
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

  const columns = [
    {
      title: '行业',
      dataIndex: 'HangYe',
    },
    {
      title: '方案名称',
      dataIndex: 'FangAnName',
    },
    {
      title: '方案阶段',
      dataIndex: 'JieDuan',
    },
    {
      title: '测试进度',
      dataIndex: 'JinDu',
    },
    {
      title: 'DI值',
      dataIndex: 'DI',
    },
    {
      title: '成熟度',
      dataIndex: 'ChengSuDu',
    },
    {
      title: '发布日期',
      dataIndex: 'Date',
    },
  ];

  return (
    <div>
      <div>title</div>
      <Tabs centered type="card">
        <Tabs.TabPane key="1" tab="基线">
          <HighchartsReact highcharts={Highcharts} options={options} />
          <Button onClick={() => setShowModal(true)}>方案开发进展</Button>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="生态集成验证">
          <HighchartsReact highcharts={Highcharts} options={optionsA} />
        </Tabs.TabPane>
        <Tabs.TabPane key="3" tab="场景化需求">
          <HighchartsReact highcharts={Highcharts} options={optionsB} />
        </Tabs.TabPane>
      </Tabs>
      {showModal && (
        <Modal
          footer={null}
          onCancel={() => setShowModal(false)}
          title="方案开发进展"
          visible
        >
          <Table
            columns={columns}
            dataSource={tableDataList}
            rowKey="id"
            pagination={false}
          />
        </Modal>
      )}
    </div>
  );
};

export default Csrwzl;
