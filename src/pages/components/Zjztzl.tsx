import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { queryZhenji } from '../service';

type DataItem = {
  id: number;
  No: string;
  DiDian: string;
  Status: boolean;
  YiWanCheng: string;
};

const Zjztzl = () => {
  const [dataList, setDataList] = useState<DataItem[]>();

  useEffect(() => {
    queryZhenji().then((res) => setDataList(res));
  }, []);

  const columns = [
    {
      title: '地点',
      dataIndex: 'DiDian',
    },
    {
      title: 'NO',
      dataIndex: 'No',
    },
    {
      title: '上线状态',
      dataIndex: 'Status',
    },
    {
      title: '对接伙伴',
      dataIndex: 'YiWanCheng',
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataList}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default Zjztzl;
