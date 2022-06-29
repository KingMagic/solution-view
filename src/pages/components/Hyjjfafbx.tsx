import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryHyjjfafbx } from '../service';
import styles from '../index.less';

type DataItem = {
  FangAnName: string;
  Finish: number;
  Undone: number;
};

const Hyjjfafb = () => {
  const [options, setOptions] = useState<Highcharts.Options>();
  const [dataList, setDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    queryHyjjfafbx().then((res) => setDataList(res));
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
          layout: 'horizontal',
          verticalAlign: 'top',
          itemStyle: {
            color: '#ffffff',
            fontSize: '16px',
          },
          x: 100,
        },
        tooltip: {
          enabled: false,
        },
        xAxis: {
          categories: [...new Set(dataList.map((item) => item.FangAnName))],
        },
        yAxis: {
          title: {
            text: undefined,
          },
        },
        series: [
          {
            type: 'column',
            name: '计划完成',
            data: dataList.map((data) => data.Undone),
          },
          {
            type: 'column',
            name: '已完成',
            data: dataList.map((data) => data.Finish),
          },
        ],
      });
    }
  }, [dataList]);

  return (
    <div className={styles.hyjjfafbx}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Hyjjfafb;
