import { Image, Table } from 'antd';
import { useEffect, useState } from 'react';
import { queryZhenji } from '../service';
import styles from '../index.less';

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
      render: (status: boolean) =>
        status ? (
          <div className={styles.redLight} />
        ) : (
          <div className={styles.greenLight} />
        ),
    },
    {
      title: '对接伙伴',
      dataIndex: 'YiWanCheng',
    },
  ];

  return (
    <div className={styles.zjztzl}>
      <Table
        style={{ padding: '0px 24px' }}
        columns={columns}
        dataSource={dataList}
        rowClassName={(record, index) =>
          index % 2 === 1 ? styles.dark : styles.light
        }
        rowKey="id"
        pagination={false}
        onHeaderRow={() => ({
          className: styles.tabelHeader,
        })}
        onRow={() => ({
          onMouseOver: undefined,
        })}
      />
    </div>
  );
};

export default Zjztzl;
