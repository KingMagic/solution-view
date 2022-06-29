import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { queryHyjjfafb } from '../service';
import styles from '../index.less';

type DataItem = {
  ValueType: string;
  Value: number;
};

const Hyjjfafb = () => {
  const [options, setOptions] = useState<Highcharts.Options>();
  const [dataList, setDataList] = useState<DataItem[]>([]);

  useEffect(() => {
    queryHyjjfafb().then((res) => setDataList(res));
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
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'middle',
          itemStyle: {
            color: '#ffffff',
            fontSize: '16px',
          },
          x: -100,
        },
        tooltip: {
          enabled: false,
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

  return (
    <div className={styles.hyjjfa}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Hyjjfafb;
